import { screen, fireEvent } from '@testing-library/react-native';

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export function createMovieCardRobot(movie: Movie, navigate: jest.Mock) {
  return {
    verificarTitulo() {
      expect(screen.getByText(movie.title)).toBeTruthy();
    },

    verificarNota() {
      expect(screen.getByText(`⭐ ${movie.vote_average.toFixed(1)}`)).toBeTruthy();
    },

    tocarCard() {
      fireEvent.press(screen.getByText(movie.title));
    },

    verificarNavegacao() {
      expect(navigate).toHaveBeenCalledWith('Detail', { id: movie.id, title: movie.title });
    },
  };
}