// __tests__/unit/05-counterStore.test.ts
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//    (esta store inteira é 🧑‍💻 — o aluno faz sozinho, mesmo padrão da favoritesStore)
//
// Escreva os testes da counterStore.
//
// Mesmo padrão da favoritesStore: resete o estado entre testes.
//   useCounterStore.getState().increment()
//   useCounterStore.getState().count   // → lê o valor atual

import { createCounterStoreRobot } from './robots/counterStoreRobot';

const robot = createCounterStoreRobot();

beforeEach(() => {
  robot.resetar();
});

describe('counterStore', () => {
  it('1. incrementar soma 1 ao contador (increment)', () => {
    robot.incrementar();
    robot.verificarContagem(1);
  });

  it('2. decrementar subtrai 1 do contador (decrement)', () => {
    robot.decrementar();
    robot.verificarContagem(-1);
  });

  it('3. resetar volta o contador a 0 (reset)', () => {
    robot.incrementar();
    robot.incrementar();
    robot.resetarContador();
    robot.verificarContagem(0);
  });
});
