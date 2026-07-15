import { useFavoritesStore } from '@/store/favoritesStore';

const s = () => useFavoritesStore.getState();

export function createFavoritesStoreRobot() {
  return {
    resetar() {
      useFavoritesStore.setState({ ids: [] });
    },

    favoritar(id: number) {
      s().add(id);
    },

    remover(id: number) {
      s().remove(id);
    },

    alternar(id: number) {
      s().toggle(id);
    },

    limpar() {
      s().clear();
    },

    favoritarVarios(ids: number[]) {
      ids.forEach((id) => s().add(id));
    },

    verificarIdsEsperados(ids: number[]) {
      expect(s().ids).toEqual(ids);
    },

    verificarFavorito(id: number, esperado: boolean) {
      expect(s().isFavorite(id)).toBe(esperado);
    },
  };
}