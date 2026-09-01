# Cenários de Teste - Burger Place

## Atividade 4 - Projetos e Práticas de Extensão III

Este documento reúne os principais cenários de validação funcional do sistema **Burger Place** para a entrega final da Atividade 4.

---

## Cenário 1 - Acesso ao sistema

**Objetivo:** verificar se a aplicação Front-end carrega corretamente.

**Passos:**

1. Iniciar o Back-end.
2. Iniciar o Front-end.
3. Acessar `http://localhost:8080`.

**Resultado esperado:**

- A tela de login é exibida sem erros de carregamento.

---

## Cenário 2 - Autenticação

**Objetivo:** validar o acesso de um usuário cadastrado.

**Passos:**

1. Acessar a tela de login.
2. Informar usuário e senha válidos.
3. Clicar em **Entrar**.

**Resultado esperado:**

- O usuário é autenticado.
- O sistema direciona para o painel administrativo.
- O token JWT é utilizado nas requisições protegidas.

---

## Cenário 3 - Dashboard

**Objetivo:** verificar a apresentação dos indicadores administrativos.

**Passos:**

1. Realizar login.
2. Acessar o **Painel**.

**Resultado esperado:**

- São exibidos os indicadores de pedidos, produtos, clientes, receita, ticket médio e demais dados calculados pela API.
- Os dados apresentados correspondem às informações persistidas no PostgreSQL.

---

## Cenário 4 - Cadastro de Produto

**Objetivo:** validar o cadastro de um novo produto.

**Passos:**

1. Acessar **Produtos**.
2. Informar tipo, nome, preço e descrição.
3. Adicionar imagem, quando aplicável.
4. Confirmar o cadastro.

**Resultado esperado:**

- O produto é persistido no banco.
- O produto passa a ser exibido na lista de produtos cadastrados.

---

## Cenário 5 - Cadastro de Cliente e consulta de CEP

**Objetivo:** validar o cadastro de cliente e a integração de consulta de CEP.

**Passos:**

1. Acessar **Clientes**.
2. Informar nome, telefone e e-mail.
3. Informar um CEP válido.
4. Clicar em **Buscar**.
5. Conferir o preenchimento do endereço.
6. Informar o número.
7. Confirmar o cadastro.

**Resultado esperado:**

- O endereço é preenchido com os dados retornados pela consulta de CEP.
- O cliente é persistido e exibido na lista de clientes cadastrados.

---

## Cenário 6 - Cadastro de Usuário

**Objetivo:** validar o cadastro de um usuário administrativo.

**Passos:**

1. Acessar **Usuários**.
2. Informar o nome.
3. Informar ou validar o nome de usuário.
4. Informar uma senha válida.
5. Confirmar o cadastro.

**Resultado esperado:**

- O usuário é criado.
- O novo registro aparece na lista de usuários.
- A senha não é armazenada em texto puro.

---

## Cenário 7 - Criação de Pedido

**Objetivo:** validar a criação de um pedido com cliente e produtos existentes.

**Passos:**

1. Acessar **Pedidos**.
2. Selecionar um cliente.
3. Selecionar um produto.
4. Adicionar o produto ao pedido.
5. Definir a quantidade e o ETA, quando aplicável.
6. Confirmar a criação.

**Resultado esperado:**

- O pedido é criado e persistido.
- O pedido aparece na lista de pedidos.
- Os itens e valores são associados corretamente ao pedido.

---

## Cenário 8 - Alteração de Status do Pedido

**Objetivo:** validar a evolução do status de um pedido.

**Passos:**

1. Acessar **Pedidos**.
2. Selecionar um pedido em preparação.
3. Alterar o status para **A caminho**.
4. Posteriormente, alterar o status para **Entregue**.

**Resultado esperado:**

- O status é atualizado corretamente.
- Ao marcar o pedido como **Entregue**, o ETA é alterado para zero.

---

## Cenário 9 - Documentação Swagger/OpenAPI

**Objetivo:** verificar a disponibilidade da documentação interativa da API.

**Passos:**

1. Iniciar o Back-end.
2. Acessar `http://localhost:3333/api-docs`.
3. Conferir os grupos de endpoints.
4. Executar `GET /health`.
5. Quando necessário, utilizar **Authorize** com um JWT válido para testar rotas protegidas.

**Resultado esperado:**

- A interface Swagger é carregada.
- Os endpoints apresentam descrição, parâmetros, exemplos e códigos HTTP.
- `GET /health` retorna HTTP 200.
- Rotas protegidas podem ser executadas após autenticação.

---

## Cenário 10 - Tratamento de autenticação inválida

**Objetivo:** verificar o comportamento da API diante de credenciais ou token inválidos.

**Passos:**

1. Tentar realizar login com credenciais inválidas.
2. Tentar acessar uma rota protegida sem token ou com token inválido.

**Resultado esperado:**

- Credenciais inválidas retornam erro de autenticação.
- Rotas protegidas sem token retornam erro informando ausência de autenticação.
- Token inválido ou expirado é rejeitado pela API.

---

## Resultado Geral

Os cenários acima cobrem os principais fluxos funcionais do Burger Place e complementam os testes automatizados existentes no projeto, incluindo autenticação, produtos, clientes, usuários, pedidos, dashboard, integração de CEP e documentação Swagger/OpenAPI.
