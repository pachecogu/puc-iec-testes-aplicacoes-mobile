# README comparativo - antes x depois

Este comparativo mostra o efeito do robot pattern na suíte do exercício:

- **Antes:** `exercicios/02-suite-jest-rntl_old`
- **Depois:** `exercicios/02-suite-jest-rntl`

## Resumo rápido

O ganho principal não foi diminuir muito o tamanho bruto da suíte, e sim **tirar repetição dos testes** e concentrar a lógica comum em robots reutilizáveis.

- Linhas somadas nos arquivos de teste do **antes**: **408**
- Linhas somadas nos arquivos de teste do **depois**: **404**
- Diferença bruta nos testes: **-4 linhas**
- Linhas movidas para robots no **depois**: **216**

Na prática, isso significa que a suíte ficou mais fácil de ler e de expandir, porque o comportamento repetido passou a morar em um lugar só.

## O que foi simplificado

### 1. `render`, queries e asserts repetidos saíram dos testes

No projeto antigo, cada teste repetia a sequência completa de setup e interação. No projeto novo, os testes chamam um robot e deixam a intenção do caso mais evidente.

Exemplos:

- `useFavorites` agora usa `createUseFavoritesRobot()` para resetar estado e validar cenários comuns.
- `MovieCard` agora usa `createMovieCardRobot()` para verificar título, nota e navegação.
- A navegação da lista usa `createMovieListRobot()` para renderizar, abrir detalhe e checar contador.

### 2. O setup de integração ficou centralizado

Os testes de integração passaram a compartilhar ações como:

- renderizar o app
- aguardar a lista carregar
- favoritar e desfavoritar filmes
- abrir a tela de detalhe
- verificar contador e conteúdo renderizado

Isso evita duplicar `render`, `screen.findByText`, `fireEvent.press` e `expect(...)` em vários arquivos.

## O que ficou mais fácil de adicionar

### Novo teste de tela reaproveitando robot existente

Se surgir um novo caso para a tela de filmes, você não precisa reescrever o fluxo inteiro. Basta reaproveitar o robot já pronto.

Exemplos práticos:

- novo teste de navegação da lista para detalhe: reaproveita `createMovieListRobot()`
- novo teste do card: reaproveita `createMovieCardRobot()`
- novo cenário de favoritos via hook: reaproveita `createUseFavoritesRobot()`

### Extensão com menos cópia

No padrão antigo, um novo teste parecido exigiria copiar mais estrutura de:

- renderização
- mock de dependência
- query assíncrona
- ação no componente
- assert final

No padrão com robot, o novo teste geralmente cresce só com a intenção do caso, por exemplo:

```ts
const robot = createMovieListRobot();
robot.renderizar();
await robot.aguardarLista();
robot.favoritarFilme(1);
robot.verificarContadorFavoritos(1);
```

## Leitura objetiva

Se a comparação for feita por volume puro, a suíte de testes ficou quase do mesmo tamanho. Mas, do ponto de vista de manutenção, o robot pattern trouxe três vantagens claras:

1. menos repetição dentro dos arquivos de teste
2. intenção dos testes mais legível
3. novos cenários ficam mais baratos de escrever

## Arquivos que materializam a mudança

- [Projeto depois](./README.md)
- [Projeto antes](./../02-suite-jest-rntl_old/README.md)
- [Robot de lista](./pratica/__tests__/integration/robots/movieListRobot.ts)
- [Robot de favoritos](./pratica/__tests__/integration/robots/useFavoritesRobot.ts)
- [Robot do card](./pratica/__tests__/unit/robots/movieCardRobot.ts)
