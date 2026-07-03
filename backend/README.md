# Burger Place API - PPE III Atividade 2

Back-end desenvolvido como evolução do projeto da PPE II. O front-end original da hamburgueria foi mantido e recebeu uma nova camada de servidor para atender aos requisitos da Unidade II da PPE III: arquitetura do servidor, API RESTful, banco de dados, autenticação JWT e tratamento de erros.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT
- bcryptjs
- CORS
- dotenv

## Estrutura

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Entidades do banco

- users
- customers
- products
- orders
- order_items
- activities

O modelo foi criado a partir das entidades já existentes no projeto da PPE II, que antes eram persistidas em LocalStorage.

## Como executar

1. Instalar dependências:

```bash
npm install
```

2. Criar o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

3. Ajustar a variável `DATABASE_URL` para o seu PostgreSQL local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/burger_place?schema=public"
JWT_SECRET="troque-esta-chave-em-producao"
PORT=3333
```

4. Criar o banco no PostgreSQL:

```sql
CREATE DATABASE burger_place;
```

5. Rodar migration e seed:

```bash
npm run prisma:migrate -- --name init
npm run seed
```

6. Iniciar a API:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3333
```

## Usuário de teste

```text
username: maria.oliveira
senha: 123456
```

## Endpoints principais

### Health check

```http
GET /health
```

### Autenticação

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

Exemplo de login:

```json
{
  "username": "maria.oliveira",
  "password": "123456"
}
```

Resposta:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Maria Oliveira",
      "username": "maria.oliveira",
      "role": "admin"
    },
    "token": "jwt_token"
  }
}
```

### Produtos

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

Exemplo de criação:

```json
{
  "type": "Hambúrguer",
  "name": "X-Tudo",
  "description": "Hambúrguer completo da casa",
  "price": 39.9,
  "imageUrl": null
}
```

### Clientes

```http
GET    /customers
GET    /customers/:id
POST   /customers
PUT    /customers/:id
DELETE /customers/:id
```

Exemplo de criação:

```json
{
  "name": "João Cliente",
  "phone": "(11) 99999-0000",
  "email": "joao@email.com",
  "zipCode": "01001000",
  "street": "Praça da Sé",
  "neighborhood": "Sé",
  "city": "São Paulo",
  "state": "SP",
  "number": "100"
}
```

### Pedidos

```http
GET    /orders
GET    /orders/:id
POST   /orders
PUT    /orders/:id/status
PUT    /orders/:id/eta
DELETE /orders/:id
```

Exemplo de criação:

```json
{
  "customerId": 1,
  "items": [
    { "productId": 1, "quantity": 2 }
  ],
  "etaMin": 20
}
```

### Dashboard

```http
GET /dashboard
```

Retorna indicadores usados no painel administrativo:

```json
{
  "success": true,
  "data": {
    "totalOrders": 3,
    "inProgressOrders": 2,
    "deliveredOrders": 1,
    "totalProducts": 3,
    "activities": []
  }
}
```

### Proxy BrasilAPI

```http
GET /cep/:cep
```

Exemplo:

```http
GET /cep/01001000
```

Resposta padronizada:

```json
{
  "success": true,
  "data": {
    "cep": "01001000",
    "street": "Praça da Sé",
    "neighborhood": "Sé",
    "city": "São Paulo",
    "state": "SP",
    "source": "BrasilAPI"
  }
}
```

O front-end da PPE II foi ajustado para consultar o CEP via proxy local:

```text
http://localhost:3333/cep/{cep}
```

## Rotas protegidas

As rotas administrativas usam JWT no header:

```http
Authorization: Bearer seu_token_jwt
```

## Tratamento de erros

Todas as respostas de erro seguem o padrão:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Mensagem clara para o usuário"
  }
}
```

Exemplos de códigos HTTP utilizados:

- 200: sucesso
- 201: criado
- 400: erro de validação
- 401: erro de autenticação
- 404: recurso não encontrado
- 409: conflito de regra de negócio
- 500: erro interno
- 502: falha ao consultar serviço externo

## Continuidade do projeto PPE II

O projeto original utilizava LocalStorage para produtos, clientes, usuários, pedidos e atividades. Nesta evolução, essas estruturas foram transformadas em tabelas relacionais via Prisma/PostgreSQL, mantendo coerência com o domínio criado na PPE II.
