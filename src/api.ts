import {
  MOCK_USUARIOS as MOCK_USERS,
  MOCK_PERFIS as MOCK_PROFILES,
  MOCK_REPOS,
} from "./mock";

// true  = uses the fake data from mock.ts (works offline)
// false = uses the real GitHub API (limit of 60 requests/hour per IP)
export const USE_MOCK = true;

const BASE_URL = "https://api.github.com";

export type UserSummary = {
  id: number;
  login: string;
  avatar_url: string;
};

export type User = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

export type Repository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
};

export type UsuarioResumo = UserSummary;
export type Usuario = User;
export type Repositorio = Repository;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errorMessage(status: number): string {
  if (status === 404) return "Usuário não encontrado.";
  if (status === 403)
    return "Limite de requisições da API do GitHub atingido. Tente mais tarde.";
  return `Erro ao acessar o GitHub (código ${status}).`;
}

export async function searchUsers(query: string): Promise<UserSummary[]> {
  if (USE_MOCK) {
    await wait(400);
    return MOCK_USERS.filter((u) => u.login.includes(query.toLowerCase()));
  }

  const response = await fetch(
    `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=20`,
  );
  if (!response.ok) throw new Error(errorMessage(response.status));
  const data = await response.json();
  return data.items;
}

export async function fetchProfile(login: string): Promise<User> {
  if (USE_MOCK) {
    await wait(400);
    const profile = MOCK_PROFILES[login];
    if (!profile) throw new Error(errorMessage(404));
    return profile;
  }

  const response = await fetch(`${BASE_URL}/users/${login}`);
  if (!response.ok) throw new Error(errorMessage(response.status));
  return response.json();
}

// TODO Questão 07: implement this function.

export async function fetchRepositories(login: string): Promise<Repository[]> {
  let repos: Repository[];

  if (USE_MOCK) {
    await wait(400);
    repos = MOCK_REPOS[login] ?? [];
  } else {
    const response = await fetch(
      `https://api.github.com/users/${login}/repos?per_page=30&sort=updated`
    );

    if (!response.ok) {
      throw new Error(errorMessage(response.status));
    }

    repos = await response.json();
  }

  return repos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
}

