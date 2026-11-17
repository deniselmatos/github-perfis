# Revisão Programação para Dispositivos Móveis - PDM

**App: Perfis do GitHub** - busca usuários do GitHub e mostra o perfil e os repositórios de cada um.

## Como rodar

```bash
npm install
npx expo start
```

O app usa dados falsos (`src/mock.ts`) e funciona sem internet. Para usar a API real do GitHub, troque `USE_MOCK` para `false` em `src/api.ts` (limite: 60 requisições por hora por rede).

Usuários do mock: `ana-souza`, `joao-mobile`, `devcedro`, `maria-sem-repos`, `conta-removida`.
A busca exige pelo menos 2 letras (ex.: `ma`, `de`).

## Estrutura

O app segue MVVM: cada tela tem uma View (`*Screen.tsx`) e um ViewModel (`use*ViewModel.ts`) com o estado e a lógica.

```
App.tsx                                    -> alterna entre a busca e o perfil
src/api.ts                                 -> Model: busca os dados (API real ou mock)
src/mock.ts                                -> dados falsos (não altere)
src/utils.ts                               -> formatação de números
src/theme.ts                               -> cores, raios e sombra usados nas telas
src/modules/search/SearchScreen.tsx        -> View da busca
src/modules/search/useSearchViewModel.ts   -> ViewModel da busca
src/modules/profile/ProfileScreen.tsx      -> View do perfil
src/modules/profile/useProfileViewModel.ts -> ViewModel do perfil
src/components/UserCard.tsx                -> card de usuário na busca
src/components/RepoItem.tsx                -> item de repositório no perfil
```

## Regras

- Não altere `src/mock.ts`.
- Não instale bibliotecas.
- Não renomeie arquivos, funções ou componentes.
- No final, o app deve abrir sem erros e sem avisos vermelhos/amarelos no terminal.

---

## Parte 1 - Corrigir erros

Encontre a causa de cada problema e corrija.

### Questão 01 - Campo de busca não aceita texto (`src/modules/search/SearchScreen.tsx`)

Ao digitar no campo "Digite um usuário", nada aparece. Faça o texto aparecer e ser usado na busca.

### Questão 02 - Perfil abre sozinho após a busca (`src/modules/search/SearchScreen.tsx`)

Ao buscar `ma`, o app abre sozinho o perfil do primeiro usuário e mostra o aviso _"Cannot update a component while rendering a different component"_. O perfil só deve abrir ao **tocar** em um card.

### Questão 03 - Números de seguidores errados (`src/utils.ts`)

`joao-mobile` (1500 seguidores) aparece como **15.0k** e `devcedro` (15400) como **154.0k**. Corrija `formatNumber`:
`842 → "842"`, `1500 → "1.5k"`, `15400 → "15.4k"`, `2300000 → "2.3M"`.

### Questão 04 - Perfil recarrega sem parar (`src/modules/profile/useProfileViewModel.ts`)

Ao abrir um perfil, `Carregando perfil de ...` se repete no terminal e a tela pisca. Carregue o perfil **uma vez** ao abrir a tela, e de novo só se `login` mudar.

### Questão 05 - Carregamento infinito no erro (`src/modules/profile/useProfileViewModel.ts`)

Ao abrir `conta-removida` (busque `conta`), a tela fica em "Carregando perfil..." para sempre. O carregamento deve terminar **no sucesso e no erro**, mostrando **"Usuário não encontrado."** e o botão de voltar.

### Questão 06 - Tela vermelha em perfil sem repositórios (`src/modules/profile/ProfileScreen.tsx`)

Ao abrir `maria-sem-repos`, aparece o erro _"Text strings must be rendered within a &lt;Text&gt; component"_ (em todos os perfis, enquanto a Questão 07 não estiver pronta).

- Com repositórios: mostre o texto com a quantidade (já está no código).
- Sem repositórios: mostre **"Nenhum repositório público."**

---

## Parte 2 - Implementar o que falta

Procure os comentários `// TODO Questão NN` no código.

### Questão 07 - Buscar repositórios (`src/api.ts`)

Implemente `fetchRepositories(login)`:

- **`USE_MOCK` = `true`:** espere 400 ms com `wait` e retorne `MOCK_REPOS[login]`, ou `[]` se o login não existir.
- **`USE_MOCK` = `false`:** faça `fetch` em `https://api.github.com/users/{login}/repos?per_page=30&sort=updated`. Se a resposta não for `ok`, lance um erro com `errorMessage(response.status)`.
- **Nos dois casos:** ordene por `stargazers_count`, da maior para a menor.

Esperado: em `devcedro`, o primeiro é `site` (1240 estrelas) e o último é `regras` (4).

### Questão 08 - Componente RepoItem (`src/components/RepoItem.tsx`)

Hoje retorna `null`. Mostre, num card igual ao do `UserCard` (fundo branco, borda cinza, cantos arredondados):

- **nome** em negrito;
- **descrição**, ou **"Sem descrição"** em itálico se for `null`;
- **linguagem**, ou nada se for `null`;
- **estrelas** no formato `⭐ 1240`.

### Questão 09 - Busca sem resultados (`src/modules/search/SearchScreen.tsx`)

Ao buscar `zz`, a tela fica em branco. Mostre **"Nenhum usuário encontrado."** quando a busca não retornar nada, mas não quando o app acabou de abrir.

Dica: `ListEmptyComponent` da `FlatList` + o estado `hasSearched`.

### Questão 10 - Botão "Abrir no GitHub" (`src/modules/profile/ProfileScreen.tsx`)

No `TODO Questão 10`, adicione um botão **"Abrir no GitHub"** que abre `user.html_url` no navegador.

Dica: `Linking.openURL` do `react-native`.
