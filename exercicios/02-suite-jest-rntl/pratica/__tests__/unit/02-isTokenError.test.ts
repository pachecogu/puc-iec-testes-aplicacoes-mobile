// __tests__/unit/02-isTokenError.test.ts
//
// ✅ AVALIATIVO — o aluno entrega isto (conta nota). Faça TODOS os it() — todos contam.
//    Marca por it(): 🧑‍🏫 = a gente faz junto em aula · 🧑‍💻 = o aluno faz sozinho.
//
// Testar a lógica pura da camada data (isTokenError).
//
// isTokenError(error) classifica se um erro é de autenticação:
//   - true  se error.isTokenError === true
//   - true  se error.response.status === 401
//   - true  se error.message começa com 'TMDB_TOKEN_MISSING'
//   - false pra null/undefined/erro genérico
//
// Não precisa de rede nem mock de axios — é função pura sobre o objeto de erro.
// Os 5 são FÁCEIS e começam vermelhos → preencha o toBe() pra virar verde.

import { createTokenErrorRobot } from './robots/tokenErrorRobot';

const robot = createTokenErrorRobot();

describe('isTokenError', () => {
  it('1. reconhece sessão expirada — HTTP 401 (true)', () => {
    robot.verificarTokenError({ response: { status: 401 } });
  });

  it('2. reconhece a flag de erro de token (true)', () => {
    robot.verificarTokenError({ isTokenError: true });
  });

  it('3. reconhece token ausente — TMDB_TOKEN_MISSING (true)', () => {
    robot.verificarTokenError(new Error('TMDB_TOKEN_MISSING: configure o token'));
  });

  it('4. null não é erro de token (false)', () => {
    robot.verificarNaoTokenError(null);
  });

  it('5. erro genérico (HTTP 500) não é de token (false)', () => {
    robot.verificarNaoTokenError({ response: { status: 500 } });
  });
});
