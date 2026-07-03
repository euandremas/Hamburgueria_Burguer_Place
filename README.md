# 🍔 Burger Place Admin

Sistema web para gestão de uma hamburgueria, desenvolvido como parte da disciplina **Projetos e Práticas de Extensão II**, com foco na migração de uma solução inicialmente criada em ambiente **NoCode** para uma aplicação web moderna desenvolvida com **código**.

---

## 🧰 Tecnologias Utilizadas

- 🧱 **HTML5** – Estrutura das páginas
- 🎨 **CSS3** – Layout responsivo e modo escuro
- ⚙️ **JavaScript (Vanilla JS)** – Lógica de negócio e manipulação do DOM
- 💾 **LocalStorage** – Persistência de dados no navegador
- 🌐 **BrasilAPI** – Preenchimento automático de endereço via CEP
- 📱 **PWA (Progressive Web App)** – Instalação como aplicativo
- 🧪 **Cypress** – Testes automatizados end-to-end
- 🚀 **GitHub Pages** – Deploy em ambiente de produção

---

## 🌍 Deploy

O sistema está disponível em ambiente de produção no link abaixo:

👉 **[https://euandremas.github.io/hamburgueria-webapp/](https://euandremas.github.io/hamburgueria-webapp/)**

> 💡 A aplicação pode ser instalada como aplicativo no desktop ou em dispositivos móveis por meio de navegadores compatíveis com PWA.

---

## 📋 Funcionalidades

- 🔐 Autenticação administrativa
- 📊 Dashboard com indicadores
- 🍔 Cadastro e gerenciamento de produtos
- 👥 Cadastro de clientes com preenchimento automático de endereço via CEP
- 🧾 Criação e gerenciamento de pedidos
- 🔄 Alteração de status dos pedidos
- 💾 Persistência de dados utilizando LocalStorage
- 🌗 Modo escuro
- 📱 Interface totalmente responsiva
- 📲 Suporte à instalação como aplicativo (PWA)

---

## 📁 Estrutura do Projeto

A estrutura do projeto foi organizada de forma modular, visando facilitar a manutenção, a leitura do código e a execução dos testes. O diretório `node_modules` não é versionado, conforme boas práticas de versionamento com Git, estando devidamente configurado no arquivo `.gitignore`.

```text
hamburgueria-webapp/
├── css/
│   ├── admin.css        # Estilos específicos da área administrativa
│   ├── base.css         # Estilos globais e compartilhados do sistema
│   └── login.css        # Estilos da tela de autenticação
│
├── js/
│   ├── admin.js         # Lógica da área administrativa
│   ├── auth.js          # Controle de autenticação e acesso
│   ├── pwa.js           # Configurações do Progressive Web App
│   ├── store.js         # Persistência de dados utilizando LocalStorage
│   └── ui.js            # Manipulação da interface e componentes visuais
│
├── img/
│   ├── icons/           # Ícones utilizados na interface
│   └── bg-burger.png    # Imagem de fundo do sistema
│
├── docs/
│   └── cenarios-de-teste.md  # Documentação dos cenários de teste
│
├── cypress/
│   ├── e2e/             # Testes automatizados end-to-end
│   ├── fixtures/        # Dados mock utilizados nos testes
│   └── support/         # Configurações e comandos de suporte do Cypress
│
├── admin.html           # Tela administrativa do sistema
├── index.html           # Página principal da aplicação
├── manifest.webmanifest # Manifesto do Progressive Web App (PWA)
├── sw.js                # Service Worker para funcionamento offline
├── cypress.config.js    # Arquivo de configuração do Cypress
├── package.json         # Dependências e scripts do projeto
├── package-lock.json    # Controle de versões das dependências
├── .gitignore           # Arquivo de exclusão do versionamento (node_modules)
└── README.md            # Documentação geral do projeto
```

---

## 🧪 Testes de Software

O projeto conta com **testes automatizados end-to-end** desenvolvidos com **Cypress**, cobrindo os principais fluxos do sistema:

- ✅ Acesso ao sistema
- ✅ Cadastro de produtos
- ✅ Cadastro de usuários
- ✅ Criação de pedidos
- ✅ Alteração de status dos pedidos

📄 Os cenários de teste estão documentados no arquivo:

`docs/cenarios-de-teste.md`

---

## ▶️ Como Executar o Projeto Localmente

1️⃣ Instale as dependências do projeto:

```bash
npm install
```

2️⃣ Execute o projeto em ambiente local:

```bash
npm run serve
```

📍 O sistema ficará disponível em:

```
http://localhost:8080
```

---

## 🧪 Executar os Testes Automatizados

🔹 Abrir a interface do Cypress:

```bash
npm run cy:open
```

🔹 Executar os testes em modo headless:

```bash
npm run cy:run
```

---

## ⚙️ Considerações Técnicas

O sistema não utiliza banco de dados externo, fazendo uso do **LocalStorage** para persistência de dados no navegador. Essa decisão foi tomada considerando o escopo acadêmico do projeto e a facilidade de execução e demonstração da aplicação.

📌 Em um cenário de produção real, essa abordagem poderia ser substituída por um backend dedicado e banco de dados persistente.

---

## 📌 Status do Projeto

✅ Sistema funcional, testado e documentado
✅ Pronto para a entrega final da disciplina **Projetos e Práticas de Extensão II**

---

## 👨‍💻 Autor

**André**
Projeto acadêmico desenvolvido para a disciplina **Projetos e Práticas de Extensão II**.

---

## Evolução PPE III - Atividade 2

Este repositório agora inclui a pasta `backend/`, criada para atender à Atividade 2 da PPE III.

A evolução mantém o front-end desenvolvido na PPE II e adiciona uma camada back-end com:

- Node.js + Express
- API RESTful
- PostgreSQL + Prisma ORM
- Autenticação JWT
- Hash de senha com bcrypt
- Middlewares de autenticação e tratamento de erros
- Endpoint proxy para consulta de CEP na BrasilAPI (`GET /cep/:cep`)

Para executar a API, consulte o arquivo:

```text
backend/README.md
```
