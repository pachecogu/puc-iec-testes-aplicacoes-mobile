import { fireEvent, render, screen } from '@testing-library/react-native';
import { renderApp } from '../_helpers';

export function createMovieListRobot() {
  return {
    renderizar() {
      render(renderApp());
    },

    async aguardarLista() {
      await screen.findByText('Matrix');
    },

    esperarBotoesFavorito() {
      return screen.findAllByRole('button', { name: 'Adicionar favorito' });
    },

    favoritarFilme(id: number) {
      fireEvent.press(screen.getByTestId(`movie-card-heart-${id}`));
    },

    async abrirDetalheDoFilme(titulo: string) {
      fireEvent.press(await screen.findByText(titulo));
    },

    verificarContadorFavoritos(quantidade: number) {
      expect(screen.getByTestId('favorites-count')).toHaveTextContent(String(quantidade));
    },

    async verificarDetalhe(titulo: string) {
      expect(await screen.findByText('Detalhes do filme')).toBeTruthy();
      expect(screen.getByText(titulo)).toBeTruthy();
    },
  };
}