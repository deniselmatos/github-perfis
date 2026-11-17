// Dados falsos para usar o app SEM internet (USAR_MOCK = true em api.ts).
// Os usuários abaixo são fictícios.
import type { UsuarioResumo, Usuario, Repositorio } from "./api";

const avatar = (n: number) =>
  `https://avatars.githubusercontent.com/u/${n}?v=4`;

export const MOCK_USUARIOS: UsuarioResumo[] = [
  { id: 1, login: "ana-souza", avatar_url: avatar(1) },
  { id: 2, login: "joao-mobile", avatar_url: avatar(2) },
  { id: 3, login: "devcedro", avatar_url: avatar(3) },
  { id: 4, login: "maria-sem-repos", avatar_url: avatar(4) },
  { id: 5, login: "conta-removida", avatar_url: avatar(5) },
];

// "conta-removida" aparece na busca, mas não tem perfil (simula erro 404).
export const MOCK_PERFIS: Record<string, Usuario> = {
  "ana-souza": {
    login: "ana-souza",
    name: "Ana Souza",
    avatar_url: avatar(1),
    bio: "Desenvolvedora front-end. React e TypeScript.",
    location: "Iguatu, CE",
    followers: 842,
    following: 120,
    public_repos: 4,
    html_url: "https://github.com/ana-souza",
  },
  "joao-mobile": {
    login: "joao-mobile",
    name: null,
    avatar_url: avatar(2),
    bio: null,
    location: null,
    followers: 1500,
    following: 32,
    public_repos: 3,
    html_url: "https://github.com/joao-mobile",
  },
  devcedro: {
    login: "devcedro",
    name: "Dev Cedro",
    avatar_url: avatar(3),
    bio: "Comunidade de desenvolvimento do interior do Ceará.",
    location: "Cedro, CE",
    followers: 15400,
    following: 8,
    public_repos: 5,
    html_url: "https://github.com/devcedro",
  },
  "maria-sem-repos": {
    login: "maria-sem-repos",
    name: "Maria Lima",
    avatar_url: avatar(4),
    bio: "Acabei de criar minha conta!",
    location: "Fortaleza, CE",
    followers: 3,
    following: 10,
    public_repos: 0,
    html_url: "https://github.com/maria-sem-repos",
  },
};

export const MOCK_REPOS: Record<string, Repositorio[]> = {
  "ana-souza": [
    {
      id: 101,
      name: "portfolio",
      description: "Meu portfólio pessoal",
      language: "TypeScript",
      stargazers_count: 12,
      html_url: "",
    },
    {
      id: 102,
      name: "todo-react",
      description: null,
      language: "JavaScript",
      stargazers_count: 3,
      html_url: "",
    },
    {
      id: 103,
      name: "landing-page",
      description: "Landing page de um hortifrúti",
      language: "HTML",
      stargazers_count: 48,
      html_url: "",
    },
    {
      id: 104,
      name: "dotfiles",
      description: "Minhas configurações",
      language: null,
      stargazers_count: 0,
      html_url: "",
    },
  ],
  "joao-mobile": [
    {
      id: 201,
      name: "app-clima",
      description: "App de previsão do tempo em Expo",
      language: "TypeScript",
      stargazers_count: 7,
      html_url: "",
    },
    {
      id: 202,
      name: "calculadora-rn",
      description: "Calculadora em React Native",
      language: "TypeScript",
      stargazers_count: 25,
      html_url: "",
    },
    {
      id: 203,
      name: "estudos",
      description: null,
      language: null,
      stargazers_count: 1,
      html_url: "",
    },
  ],
  devcedro: [
    {
      id: 301,
      name: "agenda-eventos",
      description: "Agenda de eventos de tecnologia",
      language: "TypeScript",
      stargazers_count: 230,
      html_url: "",
    },
    {
      id: 302,
      name: "site",
      description: "Site da comunidade",
      language: "Astro",
      stargazers_count: 1240,
      html_url: "",
    },
    {
      id: 303,
      name: "bot-discord",
      description: "Bot do servidor da comunidade",
      language: "Python",
      stargazers_count: 89,
      html_url: "",
    },
    {
      id: 304,
      name: "workshop-expo",
      description: "Material do workshop de Expo",
      language: "TypeScript",
      stargazers_count: 512,
      html_url: "",
    },
    {
      id: 305,
      name: "regras",
      description: null,
      language: null,
      stargazers_count: 4,
      html_url: "",
    },
  ],
  "maria-sem-repos": [],
};
