import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import type { UserSummary } from "../api";
import { colors, radius, shadow } from "../theme";

type Props = {
  user: UserSummary;
  onPress: () => void;
};

export default function UserCard({ user, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.login} numberOfLines={1}>
          {user.login}
        </Text>
        <Text style={styles.hint}>Ver perfil</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    marginBottom: 10,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  cardPressed: { transform: [{ scale: 0.98 }], borderColor: colors.primary },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.border,
  },
  info: { flex: 1 },
  login: { fontSize: 16, fontWeight: "700", color: colors.text },
  hint: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  chevron: {
    fontSize: 28,
    lineHeight: 30,
    color: colors.placeholder,
    marginRight: 4,
  },
});
