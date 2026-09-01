# 🍔 Burger Place

**Atividade 4 | Entrega Final — Projetos e Práticas de Extensão III**

Sistema Full Stack para gerenciamento administrativo de hamburguerias.

O Burger Place evoluiu de uma aplicação web simples para uma solução cliente-servidor com **Node.js, Express, PostgreSQL, Prisma ORM, autenticação JWT, documentação Swagger/OpenAPI, testes automatizados e Integração Contínua com GitHub Actions**.

Nesta entrega final, o foco está na consolidação técnica do projeto, documentação do sistema, documentação interativa da API e apresentação dos resultados alcançados.

---

## 🚀 Status do Projeto

✅ **Atividade 4 concluída**

Branch da entrega final:

```text
atividade-4
```

Principais recursos:

- ✅ Arquitetura Full Stack
- ✅ API REST
- ✅ PostgreSQL
- ✅ Prisma ORM
- ✅ Migrations e seed
- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Rotas protegidas
- ✅ Tratamento global de erros
- ✅ Dashboard administrativo
- ✅ CRUD de produtos
- ✅ CRUD de clientes
- ✅ Gerenciamento de pedidos
- ✅ Gerenciamento de usuários
- ✅ Alteração de status e ETA dos pedidos
- ✅ Consulta automática de CEP
- ✅ Indicadores e gráficos
- ✅ Interface responsiva
- ✅ Tema claro/escuro
- ✅ Testes unitários
- ✅ Testes de integração
- ✅ Testes de comportamento com Cypress
- ✅ Cobertura automatizada
- ✅ Integração Contínua com GitHub Actions
- ✅ Documentação Swagger/OpenAPI
- ✅ Documentação técnica final

---

## 📚 Documentação

- [Documentação Técnica](docs/DOCUMENTACAO_TECNICA.md)
- [Cenários de Teste](docs/cenarios-de-teste.md)
- [Relatório de Cobertura](docs/RELATORIO_COBERTURA.md)

Com o Back-end em execução, a documentação interativa da API está disponível em:

```text
http://localhost:3333/api-docs
```

---

## 🎥 Apresentação Final

- [Vídeo da apresentação no YouTube](https://youtu.be/nA6vncLfH_w)
- [Slides da apresentação em PDF](docs/Apresentacao_Final_Burger_Place.pdf)


## 📖 Sobre o Projeto

O Burger Place foi desenvolvido para centralizar processos administrativos de uma hamburgueria.

O sistema permite gerenciar:

- produtos;
- clientes;
- usuários administrativos;
- pedidos;
- status e tempo estimado de pedidos;
- indicadores de desempenho.

A aplicação separa Front-end, API, regras de negócio e persistência de dados em camadas distintas.

---

## 🧰 Tecnologias Utilizadas

### Front-end

- HTML5
- CSS3
- JavaScript ES6+
- Chart.js
- Cypress

### Back-end

- Node.js
- Express.js
- Prisma ORM
- JSON Web Token
- bcryptjs
- Jest
- Supertest
- Swagger UI Express
- OpenAPI 3.0

### Banco de Dados

- PostgreSQL

### Qualidade e DevOps

- Git
- GitHub
- GitHub Actions
- Jest
- Supertest
- Cypress

---

## 🏗️ Arquitetura

O sistema utiliza arquitetura cliente-servidor organizada em camadas:

```text
Usuário
   |
   v
Front-end
HTML + CSS + JavaScript
   |
   v
API REST
Node.js + Express
   |
   v
Routes
   |
   v
Controllers
   |
   v
Services
   |
   v
Prisma ORM
   |
   v
PostgreSQL
```

Responsabilidades principais:

- **Front-end:** interface e interação com o usuário.
- **Routes:** definição dos endpoints.
- **Controllers:** recebimento das requisições e estruturação das respostas.
- **Services:** regras de negócio e validações.
- **Middlewares:** autenticação e tratamento de erros.
- **Prisma ORM:** acesso aos dados.
- **PostgreSQL:** persistência.

Os diagramas completos estão disponíveis em [Documentação Técnica](docs/DOCUMENTACAO_TECNICA.md).

---

## ✨ Funcionalidades

### Produtos

- cadastro;
- consulta;
- edição;
- exclusão;
- pesquisa;
- imagem de produto.

### Clientes

- cadastro;
- consulta;
- atualização;
- exclusão;
- consulta automática de CEP;
- preenchimento de endereço.

### Usuários

- cadastro;
- consulta;
- validação de nome de usuário;
- geração e verificação de senha.

### Pedidos

- criação;
- consulta;
- exclusão;
- associação de cliente;
- associação de produtos;
- controle de quantidade;
- alteração de status;
- alteração de ETA.

Status disponíveis:

- Em preparação;
- A caminho;
- Entregue.

### Dashboard

Indicadores disponíveis:

- total de pedidos;
- pedidos em preparação;
- pedidos a caminho;
- pedidos entregues;
- total de produtos;
- total de clientes;
- receita total;
- ticket médio;
- produto mais vendido;
- cliente destaque;
- produtos mais vendidos;
- atividades recentes.

---

## 📁 Estrutura do Projeto

```text
Hamburgueria_Burguer_Place/
|
├── .github/
|   └── workflows/
|
├── backend/
|   ├── prisma/
|   |   ├── migrations/
|   |   ├── schema.prisma
|   |   └── seed.js
|   |
|   ├── src/
|   |   ├── config/
|   |   ├── controllers/
|   |   ├── docs/
|   |   |   └── openapi.js
|   |   ├── middlewares/
|   |   ├── routes/
|   |   ├── services/
|   |   ├── utils/
|   |   ├── app.js
|   |   └── server.js
|   |
|   ├── tests/
|   |   ├── fixtures/
|   |   ├── integration/
|   |   └── unit/
|   |
|   ├── .env.example
|   ├── jest.config.js
|   └── package.json
|
├── cypress/
|   └── e2e/
|
├── css/
├── js/
├── img/
|
├── docs/
|   ├── screenshots/
|   ├── DOCUMENTACAO_TECNICA.md
|   ├── RELATORIO_COBERTURA.md
|   └── cenarios-de-teste.md
|
├── admin.html
├── index.html
├── cypress.config.js
├── package.json
└── README.md
```

---

## 💻 Pré-requisitos

Instale:

- Node.js
- npm
- PostgreSQL

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/euandremas/Hamburgueria_Burguer_Place.git
```

Acesse o projeto:

```bash
cd Hamburgueria_Burguer_Place
```

### Front-end

Na raiz:

```bash
npm install
```

### Back-end

```bash
cd backend
npm install
```

---

## ⚙️ Configuração do Ambiente

Crie:

```text
backend/.env
```

Use como referência:

```text
backend/.env.example
```

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/burger_place"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

> Não versione o arquivo `.env` com credenciais reais.

---

## 🗄️ Banco de Dados

Os modelos estão definidos em:

```text
backend/prisma/schema.prisma
```

Modelos principais:

- User
- Product
- Customer
- Order
- OrderItem
- Activity

### Aplicar migrations

Na pasta `backend`:

```bash
npx prisma migrate deploy
```

### Executar seed

```bash
npm run seed
```

### Abrir Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Executando o Projeto

Front-end e Back-end devem ser executados separadamente.

### Back-end

Na pasta `backend`:

```bash
npm run dev
```

API:

```text
http://localhost:3333
```

Health check:

```http
GET /health
```

Swagger:

```text
http://localhost:3333/api-docs
```

### Front-end

Na raiz:

```bash
npm run serve
```

Aplicação:

```text
http://localhost:8080
```

---

## 🔐 Autenticação

O sistema utiliza JWT.

Login:

```http
POST /auth/login
```

Rotas protegidas exigem:

```http
Authorization: Bearer <JWT_TOKEN>
```

As senhas são armazenadas utilizando hash com bcrypt.

---

## 🔗 API REST

### Sistema

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/health` | Não | Verifica disponibilidade da API |

### Autenticação

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| POST | `/auth/register` | Não | Cadastra usuário |
| POST | `/auth/login` | Não | Realiza login |
| GET | `/auth/me` | Sim | Retorna usuário autenticado |

### CEP

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/cep/:cep` | Não | Consulta CEP pela BrasilAPI |

### Produtos

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/products` | Não | Lista produtos |
| GET | `/products/:id` | Não | Consulta produto |
| POST | `/products` | Sim | Cadastra produto |
| PUT | `/products/:id` | Sim | Atualiza produto |
| DELETE | `/products/:id` | Sim | Exclui produto |

### Clientes

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/customers` | Sim | Lista clientes |
| GET | `/customers/:id` | Sim | Consulta cliente |
| POST | `/customers` | Sim | Cadastra cliente |
| PUT | `/customers/:id` | Sim | Atualiza cliente |
| DELETE | `/customers/:id` | Sim | Exclui cliente |

### Pedidos

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/orders` | Sim | Lista pedidos |
| GET | `/orders/:id` | Sim | Consulta pedido |
| POST | `/orders` | Sim | Cria pedido |
| PUT | `/orders/:id/status` | Sim | Atualiza status |
| PUT | `/orders/:id/eta` | Sim | Atualiza ETA |
| DELETE | `/orders/:id` | Sim | Exclui pedido |

### Dashboard

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/dashboard` | Sim | Retorna indicadores administrativos |

### Usuários

| Método | Endpoint | Autenticação | Descrição |
|---|---|---:|---|
| GET | `/users` | Sim | Lista usuários |
| POST | `/users` | Sim | Cadastra usuário |
| DELETE | `/users/:id` | Sim | Exclui usuário |

A especificação completa, com parâmetros, exemplos e códigos HTTP, está disponível no Swagger.

---

## 🧪 Testes Automatizados

### Back-end

Na pasta `backend`:

```bash
npm test
```

Última execução validada na Atividade 4:

```text
Test Suites: 7 passed, 7 total
Tests:       19 passed, 19 total
```

### Cobertura

```bash
npm run test:coverage
```

Resultado atual:

| Métrica | Cobertura |
|---|---:|
| Statements | 87.76% |
| Branches | 62.88% |
| Functions | 87.95% |
| Lines | 88.81% |

Detalhes:

[Relatório de Cobertura](docs/RELATORIO_COBERTURA.md)

### Front-end

Os testes de comportamento utilizam Cypress.

Na validação registrada na etapa anterior:

```text
Tests:   4
Passing: 4
Failing: 0
```

---

## 🔄 Integração Contínua

O projeto utiliza GitHub Actions.

O pipeline contempla:

1. instalação das dependências;
2. inicialização do PostgreSQL;
3. migrations;
4. preparação dos dados de teste;
5. testes do Back-end;
6. cobertura;
7. build do Front-end;
8. testes Cypress;
9. publicação de artefatos.

A execução validada da etapa anterior foi realizada na branch `atividade-3`.

---

## 📸 Capturas de Tela

As principais telas estão documentadas em:

[Documentação Técnica](docs/DOCUMENTACAO_TECNICA.md)

Entre as evidências estão:

- Login
- Dashboard
- Produtos
- Clientes
- Usuários
- Pedidos
- Swagger/OpenAPI

---

## 🤝 Contribuição e Boas Práticas

Para contribuir com o projeto:

1. crie uma branch específica para a alteração;
2. faça mudanças pequenas e objetivas;
3. execute os testes relacionados;
4. valide o funcionamento antes do commit;
5. utilize mensagens de commit claras;
6. não versione arquivos `.env`, credenciais ou tokens;
7. mantenha a documentação atualizada quando houver alteração de comportamento ou API.

Boas práticas adotadas:

- separação de responsabilidades;
- validação de entradas;
- tratamento centralizado de erros;
- proteção de senhas;
- autenticação JWT;
- testes automatizados;
- documentação de API;
- versionamento com Git;
- Integração Contínua.

---

## 🚀 Evolução Futura

Possíveis próximos passos:

- migração gradual do código para TypeScript;
- evolução do Front-end;
- ampliação da cobertura de branches;
- portal específico para operadores;
- portal do cliente;
- melhorias de experiência em dispositivos móveis;
- evolução do processo de deploy e observabilidade.

---

## 🎓 Projeto Acadêmico

Projeto desenvolvido para a disciplina **Projetos e Práticas de Extensão III**.

Ao longo das atividades foram aplicados conceitos de:

- Desenvolvimento Web
- APIs REST
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- arquitetura cliente-servidor
- autenticação e autorização
- validação de dados
- tratamento de erros
- testes unitários
- testes de integração
- testes de comportamento
- cobertura de código
- Integração Contínua
- documentação técnica
- OpenAPI e Swagger

---

## 👨‍💻 Autor

**André Moreira Araújo dos Santos**

Projeto desenvolvido para a disciplina **Projetos e Práticas de Extensão III**.
