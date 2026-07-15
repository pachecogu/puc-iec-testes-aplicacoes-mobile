// __tests__/unit/06-popularMovies.test.ts
//
// ⭐ BÔNUS — opcional (pontos extras). 🧑‍💻 o aluno faz sozinho.
//
// Testar fetchPopularMovies isolando a dependência de rede.
//
// jest.mock('@/services/api') troca o módulo real por um mock automático.
// Aí você controla o que api.get retorna e verifica como foi chamado.
//
//   const mockedGet = api.get as jest.Mock;
//   mockedGet.mockResolvedValue({ data: { page: 1, results: [], total_pages: 1, total_results: 0 } });

import { createPopularMoviesRobot } from './robots/popularMoviesRobot';

jest.mock('@/services/api');

const robot = createPopularMoviesRobot();

beforeEach(() => {
  robot.limparMocks();
});

describe('fetchPopularMovies', () => {
  it('1. busca os filmes populares da página pedida (/movie/popular)', async () => {
    robot.mockarResposta({ page: 1, results: [], total_pages: 1, total_results: 0 });

    await robot.buscarPagina(2);

    robot.verificarChamadaDaPagina(2);
  });

  it('2. devolve os filmes recebidos da API (data)', async () => {
    const payload = { page: 1, results: [{ id: 1, title: 'Matrix' }], total_pages: 1, total_results: 1 };
    robot.mockarResposta(payload);

    const result = await robot.buscarPagina(1);

    robot.verificarResultado(result, payload);
  });
});
