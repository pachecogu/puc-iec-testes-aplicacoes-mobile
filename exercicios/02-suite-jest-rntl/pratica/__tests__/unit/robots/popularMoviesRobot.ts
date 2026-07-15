import { fetchPopularMovies } from '@/queries/movies/get-popular-movies';
import { api } from '@/services/api';

const mockedGet = api.get as jest.Mock;

export function createPopularMoviesRobot() {
  return {
    limparMocks() {
      mockedGet.mockReset();
    },

    mockarResposta(data: unknown) {
      mockedGet.mockResolvedValue({ data });
    },

    buscarPagina(page = 1) {
      return fetchPopularMovies(page);
    },

    verificarChamadaDaPagina(page: number) {
      expect(mockedGet).toHaveBeenCalledWith('/movie/popular', { params: { page } });
    },

    verificarResultado(recebido: unknown, esperado: unknown) {
      expect(recebido).toEqual(esperado);
    },
  };
}