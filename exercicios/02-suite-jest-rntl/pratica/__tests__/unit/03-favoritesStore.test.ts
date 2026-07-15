// __tests__/unit/03-favoritesStore.test.ts
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Escreva os testes da favoritesStore.
//
// Store Zustand é singleton: precisa resetar o estado entre testes
// (senão um teste contamina o outro). Use o beforeEach abaixo.
//
// Acesse estado e actions com useFavoritesStore.getState():
//   useFavoritesStore.getState().add(1)
//   useFavoritesStore.getState().ids            // → [1]
//   useFavoritesStore.getState().isFavorite(1)  // → true

import { createFavoritesStoreRobot } from './robots/favoritesStoreRobot';

const robot = createFavoritesStoreRobot();

beforeEach(() => {
  robot.resetar();
});

describe('favoritesStore', () => {
  it('1. favoritar adiciona o filme à lista (add)', () => {
    robot.favoritar(1);
    robot.verificarIdsEsperados([1]);
  });

  it('2. desfavoritar tira o filme da lista (remove)', () => {
    robot.favoritar(1);
    robot.remover(1);
    robot.verificarIdsEsperados([]);
  });

  it('3. sei se um filme está favoritado (isFavorite)', () => {
    robot.favoritar(1);
    robot.verificarFavorito(1, true);
    robot.verificarFavorito(99, false);
  });

  it('4. limpar esvazia todos os favoritos (clear)', () => {
    robot.favoritarVarios([1, 2]);
    robot.limpar();
    robot.verificarIdsEsperados([]);
  });

  it('5. favoritar o mesmo filme 2× não duplica (add)', () => {
    robot.favoritar(1);
    robot.favoritar(1);
    robot.verificarIdsEsperados([1]);
  });

  it('6. o ♥ alterna favoritar/desfavoritar (toggle)', () => {
    robot.alternar(1);
    robot.verificarIdsEsperados([1]);

    robot.alternar(1);
    robot.verificarIdsEsperados([]);
  });
});
