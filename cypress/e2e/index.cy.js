describe("Index", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("should register a new user", () => {
    cy.get("h1").should("contain", "Home");
    userAction("register");
    cy.get("p").should("contain.text", "Successfully registered user");
  });

  it("should login a registered user", () => {
    userAction("login");
    cy.url().should("include", "/profile");
    cy.get("h1").should("contain", "You are logged in");
  });
});

const userAction = (action) => {
  cy.get(`#${action}-username`).type("username");
  cy.get(`#${action}-password`).type("password");
  cy.get(`button[name=${action}]`).click();
};
