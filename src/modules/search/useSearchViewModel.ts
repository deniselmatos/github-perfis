import { useState } from "react";
import { searchUsers, type UserSummary } from "../../api";

export function useSearchViewModel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function search() {
    const text = query.trim();
    if (text.length < 2) {
      setError("Digite pelo menos 2 caracteres.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const users = await searchUsers(text);
      setResults(users);
      setHasSearched(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { query, setQuery, results, loading, error, hasSearched, search };
}
