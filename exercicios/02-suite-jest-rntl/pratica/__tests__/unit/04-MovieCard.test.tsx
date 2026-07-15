// __tests__/unit/04-MovieCard.test.tsx
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// TESTE DE TELA (React Native Testing Library) — o coração do QA mobile.
// Testa o que o USUÁRIO vê e faz, não a implementação.
//
// MovieCard usa useNavigation() — mocke o hook (não há NavigationContainer no teste):
//
//   const mockNavigate = jest.fn();
//   jest.mock('@react-navigation/native', () => ({
//     useNavigation: () => ({ navigate: mockNavigate }),
//   }));
//
// Queries RNTL: screen.getByText(...) · fireEvent.press(...) · expect(...).toBeTruthy()

import { createMovieCardRobot } from './robots/movieCardRobot';
import { render } from '@testing-library/react-native';
import MovieCard from '@/components/MovieCard';

const movie = {
  id: 42, title: 'Matrix', overview: '',
  poster_path: '/m.jpg', release_date: '1999', vote_average: 8.7,
};

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

beforeEach(() => mockNavigate.mockClear());

describe('MovieCard', () => {
  it('1. o card mostra o título do filme', () => {
    const robot = createMovieCardRobot(movie, mockNavigate);

    render(<MovieCard movie={movie} />);
    robot.verificarTitulo();
  });

  it('2. o card mostra a nota (⭐ 8.7)', () => {
    const robot = createMovieCardRobot(movie, mockNavigate);

    render(<MovieCard movie={movie} />);
    robot.verificarNota();
  });

  it('3. tocar no card abre a tela de detalhe (navigate)', () => {
    const robot = createMovieCardRobot(movie, mockNavigate);

    render(<MovieCard movie={movie} />);
    robot.tocarCard();
    robot.verificarNavegacao();
  });
});
