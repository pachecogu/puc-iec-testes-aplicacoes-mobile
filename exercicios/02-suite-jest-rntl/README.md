# 02-suite-jest-rntl

Suíte de testes em Jest e React Native Testing Library para o app de prática desta pasta. O projeto já vem estruturado para separar testes unitários, testes de integração e robots reutilizáveis que encapsulam interações repetidas.

## Visão geral

A base desta suíte segue o **robot pattern**. Na prática, isso significa que a lógica de renderização, queries e ações de usuário fica concentrada em robots, enquanto os arquivos de teste passam a expressar apenas a intenção de cada cenário.

Essa organização ajuda a manter os testes mais legíveis e reduz a repetição entre arquivos parecidos.

## Estrutura

```text
pratica/
├── __tests__/
│   ├── unit/
│   │   ├── 01-posterUrl.test.ts
│   │   ├── 02-isTokenError.test.ts
│   │   ├── 03-favoritesStore.test.ts
│   │   ├── 04-MovieCard.test.tsx
│   │   ├── 05-counterStore.test.ts
│   │   ├── 06-popularMovies.test.ts
│   │   └── robots/
│   └── integration/
│       ├── 01-useFavorites.test.ts
│       ├── 02-navigation.test.tsx
│       ├── 03-movieFlow.integration.test.tsx
│       └── robots/
├── src/
└── README.md
```

## Robots disponíveis

- [`createFavoritesStoreRobot`](./pratica/__tests__/unit/robots/favoritesStoreRobot.ts)
- [`createCounterStoreRobot`](./pratica/__tests__/unit/robots/counterStoreRobot.ts)
- [`createTokenErrorRobot`](./pratica/__tests__/unit/robots/tokenErrorRobot.ts)
- [`createMovieCardRobot`](./pratica/__tests__/unit/robots/movieCardRobot.ts)
- [`createPopularMoviesRobot`](./pratica/__tests__/unit/robots/popularMoviesRobot.ts)
- [`createUseFavoritesRobot`](./pratica/__tests__/integration/robots/useFavoritesRobot.ts)
- [`createMovieListRobot`](./pratica/__tests__/integration/robots/movieListRobot.ts)

## Como rodar

```bash
cd pratica
npm install
npm test
```

## Organização da suíte

### Unitários

Os testes unitários cobrem funções puras, stores Zustand, o componente `MovieCard` e o mock de dependência para `popularMovies`.

### Integração

Os testes de integração cobrem o hook `useFavorites`, a navegação entre telas e o fluxo completo da lista com favoritos e detalhe.

## Exemplo de uso do robot pattern

```ts
const robot = createMovieListRobot();
robot.renderizar();
await robot.aguardarLista();
robot.favoritarFilme(1);
robot.verificarContadorFavoritos(1);
```

## Arquivos principais

- [README do app](./pratica/README.md)
- [Estratégia comparativa](./README-comparativo.md)
- [Guia passo a passo](./guia-passo-a-passo.md)
- [Enunciado](./enunciado.md)

