import { useCounterStore } from '@/store/counterStore';

const s = () => useCounterStore.getState();

export function createCounterStoreRobot() {
  return {
    resetar() {
      useCounterStore.setState({ count: 0 });
    },

    incrementar() {
      s().increment();
    },

    decrementar() {
      s().decrement();
    },

    resetarContador() {
      s().reset();
    },

    verificarContagem(esperado: number) {
      expect(s().count).toBe(esperado);
    },
  };
}