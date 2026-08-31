# Relatório de Cobertura de Testes

## Atividade 3 - Projetos e Práticas de Extensão III

Este relatório apresenta os resultados dos testes automatizados implementados no projeto **Burger Place** durante a Atividade 3.

## Testes do Back-end

Os testes do Back-end foram desenvolvidos utilizando **Jest** e **Supertest**.

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

Resultado da execução:

```text
Test Suites: 7 passed, 7 total
Tests:       19 passed, 19 total
```

## Cobertura de Código

A cobertura foi medida automaticamente pelo Jest.

Resultado validado no GitHub Actions:

| Métrica | Cobertura |
|---|---:|
| Statements | 87.63% |
| Branches | 61.85% |
| Functions | 87.95% |
| Lines | 88.68% |

Os valores de Statements, Functions e Lines ultrapassaram a cobertura mínima recomendada de 80% definida para a atividade.

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

O Front-end foi validado utilizando **Cypress**.

Os testes verificam:

- renderização da tela de login;
- digitação nos campos;
- interação por clique;
- exibição e ocultação da senha;
- autenticação com API mockada.

Resultado:

```text
Tests:   4
Passing: 4
Failing: 0
```

## Integração Contínua

O projeto utiliza **GitHub Actions** para executar automaticamente:

1. instalação das dependências;
2. inicialização de PostgreSQL;
3. aplicação das migrations;
4. preparação dos dados de teste;
5. execução dos testes do Back-end;
6. medição e verificação da cobertura;
7. geração do relatório de cobertura;
8. build do Front-end;
9. execução dos testes Cypress.

A execução do pipeline da branch `atividade-3` foi concluída com sucesso.

O GitHub Actions também disponibiliza os seguintes artefatos:

```text
relatorio-cobertura-backend
build-frontend
```

## Resultado Final

A suíte automatizada confirmou o funcionamento dos principais fluxos do sistema e permitiu validar a arquitetura da aplicação de forma automatizada, incluindo API, regras de negócio, autenticação, persistência em banco de dados e comportamento da interface.