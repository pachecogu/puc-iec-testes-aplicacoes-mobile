// __tests__/unit/01-posterUrl.test.ts
//
// 📘 MODELO RESOLVIDO — já vem pronto, é o molde (NÃO é entrega).
//    Leia antes de começar e use de exemplo pros próximos.
// Função pura: entrada → saída, sem estado, sem rede. O teste mais barato e estável.

import { posterUrl } from '@/utils/poster-url';

const robot = {
  verificarUrl(path: string | null, size: 'w185' | 'w342' | 'w500' = 'w342', esperado?: string | null) {
    const resultado = posterUrl(path, size);
    if (esperado === null) {
      expect(resultado).toBeNull();
      return;
    }
    expect(resultado).toBe(esperado);
  },
};

describe('posterUrl', () => {
  it('1. monta a URL completa da capa (size padrão w342)', () => {
    robot.verificarUrl('/abc.jpg', 'w342', 'https://image.tmdb.org/t/p/w342/abc.jpg');
  });

  it('2. usa o tamanho que eu pedir (w500)', () => {
    robot.verificarUrl('/abc.jpg', 'w500', 'https://image.tmdb.org/t/p/w500/abc.jpg');
  });

  it('3. filme sem capa retorna null', () => {
    robot.verificarUrl(null, 'w342', null);
  });
});
