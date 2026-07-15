import { isTokenError } from '@/services/api';

export function createTokenErrorRobot() {
  return {
    verificarTokenError(error: unknown) {
      expect(isTokenError(error)).toBe(true);
    },

    verificarNaoTokenError(error: unknown) {
      expect(isTokenError(error)).toBe(false);
    },
  };
}