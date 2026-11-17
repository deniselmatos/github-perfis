import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchScreen from "./src/modules/search/SearchScreen";
import ProfileScreen from "./src/modules/profile/ProfileScreen";
import { colors } from "./src/theme";

export default function App() {
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {selectedLogin ? (
        <ProfileScreen
          login={selectedLogin}
          onBack={() => setSelectedLogin(null)}
        />
      ) : (
        <SearchScreen onSelect={setSelectedLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 48 },
});
