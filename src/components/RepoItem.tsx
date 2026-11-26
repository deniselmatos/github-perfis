import { View, Text, StyleSheet } from "react-native";
import { Repository } from "../api";

type RepoItemProps = {
  repo: Repository;
};

export default function RepoItem({ repo }: RepoItemProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{repo.name}</Text>

      <Text style={styles.description}>
        {repo.description ?? "Sem descrição"}
      </Text>

      {repo.language !== null && (
        <Text style={styles.language}>
          {repo.language}
        </Text>
      )}

      <Text style={styles.stars}>
        ⭐ {repo.stargazers_count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  language: {
    fontSize: 13,
    color: "#527F94",
    marginBottom: 6,
  },
  stars: {
    fontSize: 13,
    color: "#555",
  },
});
