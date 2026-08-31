describe("Burger Place - Front-end", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("deve renderizar a tela de login", () => {
    cy.contains("Burger Place Admin").should("be.visible");
    cy.contains("Acesso Administrativo").should("be.visible");

    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("button[type='submit']").should("contain", "Entrar");
  });

  it("deve permitir digitação nos campos de login", () => {
    cy.get("#username")
      .type("admin")
      .should("have.value", "admin");

    cy.get("#password")
      .type("123456")
      .should("have.value", "123456");
  });

  it("deve alternar a visibilidade da senha ao clicar no botão", () => {
    cy.get("#password")
      .type("123456")
      .should("have.attr", "type", "password");

    cy.get(".togglePassword").click();

    cy.get("#password")
      .should("have.attr", "type", "text");

    cy.get(".togglePassword")
      .should("have.attr", "aria-label", "Ocultar senha");

    cy.get(".togglePassword").click();

    cy.get("#password")
      .should("have.attr", "type", "password");
  });

  it("deve realizar login utilizando API mockada", () => {
    cy.clock();

    cy.intercept(
      "POST",
      "http://localhost:3333/auth/login",
      {
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: {
              id: 1,
              name: "Administrador Teste",
              username: "admin",
              role: "admin"
            },
            token: "token-cypress"
          }
        }
      }
    ).as("login");

    cy.get("#username").type("admin");
    cy.get("#password").type("123456");
    cy.get("button[type='submit']").click();

    cy.wait("@login")
      .its("request.body")
      .should("deep.equal", {
        username: "admin",
        password: "123456"
      });

    cy.window().should((win) => {
      expect(win.localStorage.getItem("auth")).to.eq("true");
      expect(win.localStorage.getItem("token")).to.eq("token-cypress");
    });
  });
});