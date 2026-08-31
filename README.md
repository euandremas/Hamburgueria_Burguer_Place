# 🍔 Burger Place

**Atividade 3 | Projeto acadêmico desenvolvido para a disciplina Projetos e Práticas de Extensão III**

Sistema Full Stack para gerenciamento de hamburguerias.

O Burger Place nasceu como uma aplicação front-end e evoluiu para uma arquitetura cliente-servidor baseada em **Node.js, Express, PostgreSQL e Prisma ORM**, com autenticação JWT, gerenciamento administrativo, persistência em banco de dados, dashboard alimentado por API REST, testes automatizados e pipeline de Integração Contínua.

Nesta etapa, o foco foi aplicar práticas de **arquitetura de software e qualidade**, incluindo testes unitários, testes de integração, mocks, fixtures, medição de cobertura, testes de comportamento do Front-end e automação com GitHub Actions.

## 🚀 Status do Projeto

✅ **Atividade 3 concluída**

Branch utilizada nesta etapa:

```text
atividade-3
```

Principais recursos implementados:

- ✅ Arquitetura Full Stack
- ✅ API REST
- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ Migrations
- ✅ Seed de dados
- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Rotas protegidas
- ✅ Tratamento global de erros
- ✅ Dashboard administrativo
- ✅ CRUD de produtos
- ✅ CRUD de clientes
- ✅ CRUD de pedidos
- ✅ Indicadores de desempenho
- ✅ Gráficos com Chart.js
- ✅ Consulta automática de CEP
- ✅ Interface responsiva
- ✅ Tema claro/escuro
- ✅ Skeleton Loading
- ✅ Testes unitários com Jest
- ✅ Testes de integração com Supertest
- ✅ Integração de testes com PostgreSQL
- ✅ Mocks e fixtures
- ✅ Cobertura automatizada de código
- ✅ Testes de comportamento com Cypress
- ✅ API mockada nos testes de Front-end
- ✅ Pipeline de Integração Contínua com GitHub Actions
- ✅ Build automatizado do Front-end
- ✅ Relatório de cobertura publicado como artefato

## 📚 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração do Ambiente](#️-configuração-do-ambiente)
- [Banco de Dados](#-banco-de-dados)
- [Executando o Projeto](#️-executando-o-projeto)
- [Testes Automatizados](#-testes-automatizados)
- [Cobertura de Código](#-cobertura-de-código)
- [Testes do Front-end](#-testes-do-front-end)
- [Integração Contínua](#-integração-contínua)
- [API REST](#-api-rest)
- [Exemplos de Requisição e Resposta](#-exemplos-de-requisição-e-resposta)
- [Dashboard](#-dashboard)
- [Capturas de Tela](#-capturas-de-tela)
- [Diferenciais do Projeto](#-diferenciais-do-projeto)
- [Evolução Futura](#-evolução-futura)
- [Projeto Acadêmico](#-projeto-acadêmico)
- [Autor](#-autor)

## 📖 Sobre o Projeto

O Burger Place foi desenvolvido para centralizar processos administrativos de uma hamburgueria em uma aplicação web.

O sistema permite gerenciar:

- 🍔 Produtos
- 👥 Clientes
- 🛒 Pedidos
- 📈 Indicadores de desempenho

Toda a aplicação utiliza arquitetura cliente-servidor, separando as responsabilidades entre Front-end, API, regras de negócio e persistência de dados.

Na Atividade 3, essa arquitetura passou a ser validada por testes automatizados e por um pipeline de Integração Contínua.

## 🧰 Tecnologias Utilizadas

### 🎨 Front-end

- HTML5
- CSS3
- JavaScript ES6+
- Chart.js
- Design responsivo
- Cypress

### ⚙️ Back-end

- Node.js
- Express.js
- Prisma ORM
- JSON Web Token (JWT)
- bcryptjs
- Jest
- Supertest

### 🗄 Banco de Dados

- PostgreSQL

### 🌐 API externa

- BrasilAPI para consulta de CEP

### 🛠 Ferramentas

- Git
- GitHub
- GitHub Actions
- Prisma Studio
- Visual Studio Code
- npm

## 🏗 Arquitetura

O sistema utiliza uma arquitetura em camadas:

```text
                Usuário
                   │
                   ▼
      Front-end (HTML + CSS + JS)
                   │
            Requisições REST
                   │
                   ▼
        Node.js + Express API
                   │
          Controllers / Services
                   │
              Prisma ORM
                   │
                   ▼
             PostgreSQL
```

No Back-end, as responsabilidades são distribuídas entre rotas, controllers, services, middlewares e Prisma ORM.

Essa organização facilita:

- separação de responsabilidades;
- manutenção do código;
- reutilização de regras de negócio;
- tratamento centralizado de erros;
- testes automatizados;
- evolução da aplicação.

## ✨ Funcionalidades

### 🔐 Autenticação

- Cadastro de usuário
- Login com JWT
- Senha armazenada com hash bcrypt
- Validação de credenciais
- Rotas protegidas por Bearer Token
- Consulta do usuário autenticado

### 🍔 Produtos

- Cadastro
- Consulta
- Edição
- Exclusão
- Pesquisa

### 👥 Clientes

- Cadastro
- Consulta
- Alteração
- Exclusão
- Consulta automática de CEP
- Preenchimento automático do endereço

### 🛒 Pedidos

- Criação
- Consulta
- Alteração
- Exclusão
- Alteração de status
- Associação de produtos
- Associação de clientes

### 📊 Dashboard

O painel administrativo apresenta dados obtidos por meio da API.

#### Indicadores

- Total de pedidos
- Pedidos em preparação
- Pedidos a caminho
- Pedidos entregues
- Total de produtos
- Total de clientes
- Receita total
- Ticket médio
- Produto mais vendido
- Cliente destaque

#### Gráficos

- Pedidos por status
- Produtos mais vendidos

### 🌗 Interface

- Tema claro
- Tema escuro
- Responsividade
- Skeleton Loading

## 📁 Estrutura do Projeto

```text
Hamburgueria_Burguer_Place/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── fixtures/
│   │   ├── integration/
│   │   └── unit/
│   │
│   ├── .env.example
│   ├── jest.config.js
│   └── package.json
│
├── cypress/
│   └── e2e/
│       └── hamburgueria.cy.js
│
├── css/
├── js/
├── img/
├── docs/
│   └── screenshots/
│
├── admin.html
├── index.html
├── cypress.config.js
├── package.json
└── README.md
```

## 💻 Pré-requisitos

Antes de executar o projeto, instale:

- Node.js
- npm
- PostgreSQL

## 📦 Instalação

### Front-end

Na raiz do projeto:

```bash
npm install
```

### Back-end

Acesse a pasta do Back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

## ⚙️ Configuração do Ambiente

Crie o arquivo:

```text
backend/.env
```

Utilize como referência:

```text
backend/.env.example
```

Exemplo de configuração:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/burger_place"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

> Não versione o arquivo `.env` com credenciais reais.

## 🗄 Banco de Dados

Os modelos da aplicação são definidos em:

```text
backend/prisma/schema.prisma
```

A aplicação utiliza os modelos:

- User
- Product
- Customer
- Order
- OrderItem
- Activity

### Executar as migrations

Dentro da pasta `backend`:

```bash
npx prisma migrate deploy
```

### Executar o seed

```bash
npm run seed
```

### Abrir o Prisma Studio

```bash
npx prisma studio
```

## ▶️ Executando o Projeto

O Front-end e o Back-end devem ser executados separadamente.

### Back-end

Na pasta `backend`:

```bash
npm run dev
```

API disponível em:

```text
http://localhost:3333
```

Endpoint de verificação da API:

```http
GET /health
```

### Front-end

Na raiz do projeto:

```bash
npm run serve
```

Aplicação disponível em:

```text
http://localhost:8080
```

## 🧪 Testes Automatizados

A Atividade 3 adiciona uma suíte automatizada de testes para validar a qualidade, estabilidade e integração do sistema.

### Back-end

Os testes do Back-end utilizam **Jest** e **Supertest**.

Foram implementados:

- testes unitários de regras de negócio;
- mocks de dependências externas;
- fixtures para preparação de dados;
- testes de integração com a API;
- testes de integração com PostgreSQL;
- testes de autenticação e JWT;
- testes dos fluxos de produtos, clientes, pedidos e dashboard.

Para executar os testes:

```bash
cd backend
npm test
```

Resultado validado:

```text
Test Suites: 7 passed, 7 total
Tests:       19 passed, 19 total
```

## 📈 Cobertura de Código

Para executar os testes com medição de cobertura:

```bash
cd backend
npm run test:coverage
```

Resultado obtido no pipeline de Integração Contínua:

| Métrica | Cobertura |
|---|---:|
| Statements | 87.63% |
| Branches | 61.85% |
| Functions | 87.95% |
| Lines | 88.68% |

O Jest utiliza limites mínimos automáticos de cobertura. O pipeline é interrompido caso os limites definidos no projeto não sejam atingidos.

O relatório HTML é gerado em:

```text
backend/coverage/
```

Para visualizá-lo localmente, abra:

```text
backend/coverage/index.html
```

A pasta `coverage` não é versionada no Git, pois o relatório pode ser regenerado automaticamente pelos testes.

## 🖥 Testes do Front-end

Os testes de comportamento do Front-end utilizam **Cypress**.

São validados:

- renderização da tela de login;
- digitação nos campos;
- interação de clique;
- exibição e ocultação da senha;
- autenticação com API mockada.

Para executar os testes, primeiro inicie o Front-end:

```bash
npm run serve
```

Em outro terminal, execute:

```bash
npm test
```

Resultado validado:

```text
Tests:   4
Passing: 4
Failing: 0
```

## 🔄 Integração Contínua

O projeto utiliza **GitHub Actions** por meio do arquivo:

```text
.github/workflows/ci.yml
```

O pipeline é executado automaticamente a cada `push` ou `pull request` na branch:

```text
atividade-3
```

O fluxo automatizado executa:

1. checkout do código;
2. configuração do Node.js;
3. inicialização de PostgreSQL em ambiente isolado;
4. instalação das dependências do Front-end;
5. instalação das dependências do Back-end;
6. geração do Prisma Client;
7. aplicação das migrations;
8. preparação dos dados de teste;
9. execução dos testes do Back-end;
10. verificação automática da cobertura;
11. publicação do relatório de cobertura;
12. build do Front-end;
13. publicação do build como artefato;
14. inicialização do Front-end;
15. execução dos testes Cypress.

Ao final do pipeline são disponibilizados os artefatos:

```text
relatorio-cobertura-backend
build-frontend
```

A execução validada da Atividade 3 foi concluída com sucesso no GitHub Actions.

> O deploy automático para ambiente de staging é opcional nesta atividade e não foi configurado nesta versão. O pipeline realiza testes, validação de cobertura e build automatizado.

## 🔗 API REST

### Sistema

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verifica se a API está online |

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastra um usuário |
| POST | `/auth/login` | Realiza autenticação |
| GET | `/auth/me` | Retorna o usuário autenticado |

### Produtos

| Método | Endpoint |
|---|---|
| GET | `/products` |
| POST | `/products` |
| PUT | `/products/:id` |
| DELETE | `/products/:id` |

### Clientes

| Método | Endpoint |
|---|---|
| GET | `/customers` |
| POST | `/customers` |
| PUT | `/customers/:id` |
| DELETE | `/customers/:id` |

### Pedidos

| Método | Endpoint |
|---|---|
| GET | `/orders` |
| POST | `/orders` |
| PUT | `/orders/:id` |
| DELETE | `/orders/:id` |

### Dashboard

| Método | Endpoint |
|---|---|
| GET | `/dashboard` |

As rotas protegidas exigem o cabeçalho:

```http
Authorization: Bearer <JWT_TOKEN>
```

## 🧪 Exemplos de Requisição e Resposta

### Cadastro de usuário

Requisição:

```http
POST /auth/register
Content-Type: application/json
```

Corpo:

```json
{
  "name": "Usuário de Teste",
  "username": "usuario.teste",
  "password": "123456"
}
```

Resposta esperada:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Usuário de Teste",
      "username": "usuario.teste",
      "role": "admin"
    },
    "token": "<JWT_TOKEN>"
  }
}
```

### Login

Requisição:

```http
POST /auth/login
Content-Type: application/json
```

Corpo:

```json
{
  "username": "usuario.teste",
  "password": "123456"
}
```

Resposta de sucesso:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Usuário de Teste",
      "username": "usuario.teste",
      "role": "admin"
    },
    "token": "<JWT_TOKEN>"
  }
}
```

### Rota protegida

Requisição:

```http
GET /dashboard
Authorization: Bearer <JWT_TOKEN>
```

Exemplo de resposta de sucesso:

```json
{
  "success": true,
  "data": {
    "totalProducts": 5,
    "totalCustomers": 3,
    "totalOrders": 6,
    "preparingOrders": 1,
    "onTheWayOrders": 1,
    "deliveredOrders": 4,
    "totalRevenue": 409.4,
    "averageTicket": 68.23333333333333,
    "bestSeller": {
      "name": "X-Bacon",
      "quantity": 6
    },
    "topCustomer": {
      "name": "Ana Silva",
      "orders": 2
    }
  }
}
```

> Os valores do dashboard variam conforme os dados existentes no banco.

### Token inválido ou expirado

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_INVALID",
    "message": "Token inválido ou expirado."
  }
}
```

### Token ausente

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_MISSING",
    "message": "Token de autenticação não informado."
  }
}
```

## 📊 Dashboard

O Dashboard apresenta indicadores administrativos calculados no Back-end a partir dos dados persistidos no PostgreSQL.

Entre os indicadores estão:

- Receita total
- Ticket médio
- Produto mais vendido
- Cliente destaque
- Produtos cadastrados
- Clientes cadastrados
- Pedidos em preparação
- Pedidos entregues
- Pedidos a caminho

Os gráficos exibem:

- distribuição dos pedidos por status;
- produtos mais vendidos.

## 📸 Capturas de Tela

### Login

![Tela de login](docs/screenshots/login.png)

## 📌 Diferenciais do Projeto

Além dos requisitos centrais da atividade, o projeto possui:

- Dashboard administrativo
- Chart.js
- Skeleton Loading
- Tema claro/escuro
- Interface responsiva
- Consulta automática de CEP
- Organização modular do código
- Separação entre Front-end e Back-end
- Testes automatizados no Back-end
- Testes de comportamento no Front-end
- Integração real com PostgreSQL durante os testes
- Cobertura automatizada
- Pipeline de Integração Contínua
- Build automatizado

## 🚀 Evolução Futura

Possíveis evoluções do projeto:

### 👨‍🍳 Portal do Operador

- Login próprio
- Gestão operacional de pedidos
- Controle de produção

### 🍔 Portal do Cliente

- Cadastro
- Histórico de pedidos
- Endereços salvos
- Acompanhamento do pedido

### 📱 Experiência Web

- Evolução do suporte offline
- Melhorias de instalação
- Aprimoramentos de experiência em dispositivos móveis

### ☁️ Deploy

- Hospedagem em nuvem
- Banco PostgreSQL remoto
- API publicada
- Deploy automático para ambiente de staging

## 👨‍🎓 Projeto Acadêmico

Este projeto foi desenvolvido como atividade da disciplina **Projetos e Práticas de Extensão III**, aplicando conceitos de:

- Desenvolvimento Web
- Engenharia de Software
- Arquitetura de Software
- APIs REST
- Banco de Dados
- Arquitetura cliente-servidor
- Autenticação e autorização
- Validação de dados
- Tratamento de erros
- Testes unitários
- Testes de integração
- Mocks e fixtures
- Cobertura de código
- Testes de comportamento
- Integração Contínua
- Automação com GitHub Actions
- Responsividade
- Boas práticas de desenvolvimento

## 👨‍💻 Autor

**André Moreira Araújo dos Santos**

Projeto desenvolvido para a disciplina **Projetos e Práticas de Extensão III**.
