# Trabalho Final — Relatório — Tema 2 — Suíte de Testes Unitários e Integração com Robot Pattern

## 0. Identificação

- **Tema:** 2 — Suíte de testes unitários e integração com robot pattern
- **Integrantes do Grupo:**
  - Gustavo Martins Pacheco
  - Cristiany Helena de Paula
  - Cristyanne de Souza Leal
  - Giovanna Queiroz Melchiori Dantas
  
  **Repositório Git:**
  - https://github.com/pachecogu/puc-iec-testes-aplicacoes-mobile/tree/TrabalhoFinal/exercicios/02-suite-jest-rntl

---

## 1. Problema

O projeto parte de uma suíte de testes React Native que precisava ficar mais fácil de manter, ler e expandir. Quando os testes repetem muito `render`, `screen.findBy...`, `fireEvent` e asserts parecidos, cada novo cenário aumenta o custo de manutenção e o risco de inconsistência. Isso é especialmente ruim em testes de tela e integração, porque pequenos fluxos acabam espalhados por vários arquivos com a mesma estrutura. O problema que atacamos foi transformar uma suíte funcional, mas repetitiva, em uma suíte mais organizada e reaproveitável.

Esse tipo de problema importa porque, em um app real, a suíte cresce junto com o produto. Se cada teste novo exige copiar setup, queries e interações, o time perde velocidade e passa a confiar menos nos testes. Além disso, quando a intenção do teste fica escondida por excesso de código repetido, a leitura do cenário fica mais difícil para quem revisa ou dá manutenção.

---

## 2. Justificativa

Sem uma camada de reaproveitamento, a suíte fica cara para evoluir. Cada alteração de comportamento comum obriga a atualizar vários testes manualmente, o que aumenta o risco de divergência entre cenários parecidos. Em testes de integração isso é ainda mais sensível, porque o setup costuma ser mais pesado e qualquer duplicação se espalha rapidamente.

O robot pattern foi escolhido porque reduz essa repetição sem esconder o comportamento testado. Ele permite concentrar ações comuns em helpers específicos de domínio, mantendo os arquivos de teste curtos e expressivos. Isso melhora a produtividade do time e facilita adicionar novos casos de tela, fluxo ou hook sem reescrever a mesma estrutura várias vezes.

---

## 3. Como resolver o problema

A solução foi organizar a suíte com o robot pattern, separando a intenção do teste da mecânica repetida de execução. Em vez de cada arquivo conter toda a sequência de renderização, interação e validação, parte dessa lógica foi movida para robots específicos por contexto, como lista de filmes, favoritos, card do filme e hook de favoritos.

Na prática, isso gerou helpers como `createMovieListRobot`, `createMovieCardRobot` e `createUseFavoritesRobot`, que encapsulam ações recorrentes e deixam o teste focado no comportamento esperado. Os testes passam a chamar métodos de alto nível, como renderizar a tela, favoritar um item, abrir o detalhe e validar o contador. O mesmo padrão também foi aplicado nos testes unitários, reduzindo a repetição entre as asserções de componentes e stores.

Além disso, a suíte foi validada com Jest e React Native Testing Library, cobrindo tanto testes unitários quanto integração. O foco permaneceu em testar comportamento observável, sem alterar a lógica de produção.

---

## 4. Hipóteses / técnicas descartadas

Uma hipótese inicial seria manter os testes no formato tradicional, com setup e asserts escritos diretamente em cada arquivo. Essa opção foi descartada porque funcionaria no curto prazo, mas deixaria a suíte mais repetitiva e mais difícil de escalar.

Outra alternativa seria criar utilitários genéricos demais para tudo, sem separar por domínio. Isso também não foi usado porque abstrações muito amplas tendem a esconder a intenção do teste e a ficar frágeis quando o fluxo muda.

| Hipótese/técnica descartada | Por que não usamos |
|---|---|
| Manter setup completo em cada teste | Repetia `render`, queries e interações, aumentando manutenção |
| Criar helpers genéricos demais | Reduzia a clareza do teste e misturava contextos diferentes |
| Copiar o fluxo manualmente em novos cenários | Duplicava código e dificultava ajustes futuros |

---

## 5. Resultados

O principal resultado foi a organização da suíte em torno de robots reutilizáveis. Na comparação entre o conjunto antigo e o novo, as linhas somadas nos arquivos de teste ficaram praticamente estáveis, mas a repetição foi deslocada para helpers específicos: foram **408 linhas** nos testes do cenário antigo contra **404 linhas** nos testes do cenário com robot pattern, com **216 linhas** concentradas em robots. Isso mostra que o ganho não está em “encolher” a suíte, e sim em torná-la mais sustentável.

Em termos de execução, a suíte final ficou com **9 test suites passando** e **30 testes verdes**. A cobertura reportada para as áreas críticas também ficou alta, com **100% em `src/store` e `src/utils`**. O cenário de integração principal valida a lista, o favoritar e o desfavoritar no fluxo completo, e os testes de tela ficaram mais fáceis de ler porque a intenção aparece no robot, não no boilerplate.

Outro resultado prático foi a capacidade de adicionar novos cenários com pouca cópia. Por exemplo, um novo teste de navegação ou de interação com a lista pode reaproveitar o robot já existente, chamando apenas métodos como renderizar, aguardar a lista, tocar em um item e validar resultado.

---

## 6. Conclusão

O projeto mostrou que o robot pattern é útil quando a suíte começa a repetir muito fluxo de setup e interação. A principal melhoria foi de manutenção: os testes ficaram mais legíveis, mais curtos e mais fáceis de estender sem duplicar estrutura. Em vez de gastar tempo com tarefas repetitivas de configuração, a suíte passou a mostrar melhor a intenção de cada cenário.

Se houvesse mais tempo, o próximo passo seria ampliar o padrão para outros fluxos de integração e padronizar ainda mais os nomes dos robots e métodos. O aprendizado principal foi que, em testes, organização é parte da qualidade: uma suíte boa não é só a que passa, mas a que continua fácil de evoluir.

---

## 7. Anexos

### Perguntas obrigatórias

1. **Conseguiu resolver o problema?** Sim. A suíte foi organizada com robot pattern e os testes ficaram mais reutilizáveis, legíveis e fáceis de manter.
2. **Gerou algum artefato técnico do problema?** Sim. O projeto gerou robots de teste em `pratica/__tests__/integration/robots/` e `pratica/__tests__/unit/robots/`, além do comparativo em `README-comparativo.md`.
3. **Quais artigos/blogs você usou de referência?**
   1. Meszaros, Gerard. *xUnit Test Patterns* — http://xunitpatterns.com/
   2. Jest. *Getting Started* — https://jestjs.io/docs/getting-started
   3. React Native Testing Library. *Introduction* — https://callstack.github.io/react-native-testing-library/

### Links e evidência adicional

- **Repo GitHub:** https://github.com/pachecogu/puc-iec-testes-aplicacoes-mobile/tree/TrabalhoFinal/exercicios/02-suite-jest-rntl
- **Comparativo antes/depois:** [README-comparativo.md](./README-comparativo.md)
- **Robot de lista:** [movieListRobot.ts](./pratica/__tests__/integration/robots/movieListRobot.ts)
- **Robot de favoritos:** [useFavoritesRobot.ts](./pratica/__tests__/integration/robots/useFavoritesRobot.ts)
- **Robot de card:** [movieCardRobot.ts](./pratica/__tests__/unit/robots/movieCardRobot.ts)
