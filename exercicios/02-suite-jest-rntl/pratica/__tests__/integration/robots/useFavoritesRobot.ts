import { act, renderHook } from '@testing-library/react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { useFavoritesStore } from '@/store/favoritesStore';

export function createUseFavoritesRobot() {
  const renderHookResult = () => renderHook(() => useFavorites());

  return {
    resetar() {
      useFavoritesStore.setState({ ids: [] });
    },

    verificarComecoSemFavoritos() {
      const { result } = renderHookResult();
      expect(result.current.count).toBe(0);
      expect(result.current.isFavorite(42)).toBe(false);
    },

    favoritarEDesfavoritar(id: number) {
      const { result } = renderHookResult();

      act(() => {
        result.current.toggle(id);
      });
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.toggle(id);
      });
      expect(result.current.count).toBe(0);
    },

    verificarIsFavorite(idFavoritado: number, idNaoFavoritado: number) {
      const { result } = renderHookResult();

      act(() => {
        result.current.toggle(idFavoritado);
      });

      expect(result.current.isFavorite(idFavoritado)).toBe(true);
      expect(result.current.isFavorite(idNaoFavoritado)).toBe(false);
    },
  };
}