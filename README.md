# 🍔 Burger Place

**Atividade 2 | Projeto acadêmico desenvolvido para a disciplina Projetos e Práticas de Extensão III**

Sistema Full Stack para gerenciamento de hamburguerias.

O Burger Place nasceu como uma aplicação front-end durante a PPE II e evoluiu para uma arquitetura cliente-servidor baseada em **Node.js, Express, PostgreSQL e Prisma ORM**, com autenticação JWT, gerenciamento administrativo, persistência em banco de dados e dashboard alimentado pela API REST.

O objetivo desta etapa foi aplicar, de forma prática, conceitos de desenvolvimento web, arquitetura em camadas, banco de dados, autenticação, integração entre Front-end e Back-end, validação de dados e tratamento padronizado de erros.

## 🚀 Status do Projeto

✅ **Atividade 2 concluída**

Branch utilizada nesta etapa:

```text
atividade-2
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

## 🧰 Tecnologias Utilizadas

### 🎨 Front-end

- HTML5
- CSS3
- JavaScript ES6+
- Chart.js
- Design responsivo

### ⚙️ Back-end

- Node.js
- Express.js
- Prisma ORM
- JSON Web Token (JWT)
- bcryptjs

### 🗄 Banco de Dados

- PostgreSQL

### 🌐 API externa

- BrasilAPI para consulta de CEP

### 🛠 Ferramentas

- Git
- GitHub
- Prisma Studio
- Thunder Client
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
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── css/
├── js/
├── img/
├── docs/
│   └── screenshots/
│
├── admin.html
├── index.html
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

## 👨‍🎓 Projeto Acadêmico

Este projeto foi desenvolvido como atividade da disciplina **Projetos e Práticas de Extensão III**, aplicando conceitos de:

- Desenvolvimento Web
- Engenharia de Software
- APIs REST
- Banco de Dados
- Arquitetura cliente-servidor
- Autenticação e autorização
- Validação de dados
- Tratamento de erros
- Responsividade
- Boas práticas de desenvolvimento

## 👨‍💻 Autor

**André Moreira Araújo dos Santos**

Projeto desenvolvido para a disciplina **Projetos e Práticas de Extensão III**.
