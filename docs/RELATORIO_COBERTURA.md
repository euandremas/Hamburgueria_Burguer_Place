# Relatório de Cobertura de Testes

## Atividade 4 - Projetos e Práticas de Extensão III

Este relatório consolida os resultados dos testes automatizados do projeto **Burger Place** para a entrega final da Atividade 4.

A suíte de testes foi construída nas etapas anteriores do projeto e executada novamente após a inclusão da documentação Swagger/OpenAPI, com o objetivo de verificar se a evolução realizada na Atividade 4 não introduziu regressões no Back-end.

## Testes do Back-end

Os testes do Back-end utilizam **Jest** e **Supertest**.

Foram implementados:

- testes unitários;
- testes de integração;
- mocks de dependências externas;
- fixtures para preparação de dados;
- testes de autenticação;
- testes de integração com PostgreSQL;
- testes dos fluxos de produtos;
- testes dos fluxos de clientes;
- testes dos fluxos de pedidos;
- testes do dashboard.

Última execução validada na Atividade 4:

```text
Test Suites: 7 passed, 7 total
Tests:       19 passed, 19 total
```

## Cobertura de Código

A cobertura foi medida automaticamente pelo Jest após a inclusão da documentação Swagger/OpenAPI.

Resultado da última execução validada na Atividade 4:

| Métrica | Cobertura |
|---|---:|
| Statements | 87.76% |
| Branches | 62.88% |
| Functions | 87.95% |
| Lines | 88.81% |

Os valores de Statements, Functions e Lines permanecem acima de 80%.

A métrica de Branches ficou em 62.88% e é apresentada separadamente para manter o relatório fiel ao resultado real da execução.

O projeto também possui limites automáticos de cobertura configurados no Jest.

## Como executar a cobertura

Na pasta `backend`:

```bash
npm run test:coverage
```

O relatório HTML é gerado em:

```text
backend/coverage/index.html
```

## Testes do Front-end

O Front-end utiliza **Cypress** para testes de comportamento.

Os testes existentes verificam:

- renderização da tela de login;
- digitação nos campos;
- interação por clique;
- exibição e ocultação da senha;
- autenticação com API mockada.

Na validação registrada na etapa anterior do projeto, o resultado foi:

```text
Tests:   4
Passing: 4
Failing: 0
```

## Integração Contínua

O projeto utiliza **GitHub Actions** para automatizar verificações de qualidade.

O pipeline contempla:

1. instalação das dependências;
2. inicialização do PostgreSQL;
3. aplicação das migrations;
4. preparação dos dados de teste;
5. execução dos testes do Back-end;
6. medição e verificação da cobertura;
7. geração do relatório de cobertura;
8. build do Front-end;
9. execução dos testes Cypress.

A execução do pipeline da branch `atividade-3` foi concluída com sucesso durante a etapa anterior do projeto.

Os artefatos disponibilizados pelo pipeline incluem:

```text
relatorio-cobertura-backend
build-frontend
```

## Resultado Final

A última execução dos testes do Back-end na Atividade 4 confirmou que as alterações relacionadas à documentação Swagger/OpenAPI não introduziram regressões nos fluxos automatizados existentes.

O conjunto de testes do projeto cobre autenticação, regras de negócio, API, persistência em PostgreSQL, produtos, clientes, pedidos, dashboard e comportamento do Front-end.
