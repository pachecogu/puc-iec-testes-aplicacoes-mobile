// __tests__/integration/03-movieFlow.integration.test.tsx
//
// ✅ AVALIATIVO — ENTREGA da Parte B (conta nota). Faça TODOS os it() — todos contam.
//    É ESTE o arquivo da Parte B; os outros 2 da pasta são prática (não contam).
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Testa o FLUXO entre componentes (src/integration/): a lista busca dados (API
// mockada) e favoritar um card reflete no contador do header. Sem simulador.
//
// O setup (renderApp + mock + fixture) está em ./_helpers — leia pra entender;
// aqui você escreve só os 3 it() de comportamento.
//
// Pontos de teste expostos pela tela:
//   testID="favorites-count"        → contador do header (texto "♥ N")
//   testID="movie-card-heart-1"     → botão de favoritar do filme id 1
//
// Dicas de query:
//   await screen.findByText('Matrix')                 // espera a lista carregar (async)
//   fireEvent.press(screen.getByTestId('movie-card-heart-1'))
//   expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')

import { useFavoritesStore } from '@/store/favoritesStore';
import { createMovieListRobot } from './robots/movieListRobot';
import { mockListaDeFilmes } from './_helpers';

// jest.mock fica AQUI (é hoisted por arquivo) — é assim que a API vira mockada.
jest.mock('@/services/api');

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] }); // store é singleton — zere entre testes
  mockListaDeFilmes();
});

describe('Fluxo de integração — lista + favoritos (ENTREGA Parte B)', () => {
  it('1.a a lista aparece — achando pelo TEXTO (findByText)', async () => {
    const robot = createMovieListRobot();

    robot.renderizar();
    await robot.aguardarLista();
  });

  it('1.b a lista aparece — achando pelo ROLE (getByRole, prioridade)', async () => {
    const robot = createMovieListRobot();

    robot.renderizar();
    const botoes = await robot.esperarBotoesFavorito();
    expect(botoes).toHaveLength(2);
  });

  it('2. favoritar um filme soma no contador do topo (♥ 1)', async () => {
    const robot = createMovieListRobot();

    robot.renderizar();
    await robot.aguardarLista();
    robot.favoritarFilme(1);
    robot.verificarContadorFavoritos(1);
  });

  it('3. desfavoritar volta o contador a 0', async () => {
    const robot = createMovieListRobot();

    robot.renderizar();
    await robot.aguardarLista();
    robot.favoritarFilme(1);
    robot.favoritarFilme(1);
    robot.verificarContadorFavoritos(0);
  });
});
