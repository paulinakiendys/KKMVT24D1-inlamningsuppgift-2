describe("Profile", () => {
  it("should change the password of a logged in user", () => {
    cy.visit("/profile.html");
    cy.get("h1").should("contain", "You are logged in");
    cy.get("#new-password").type("password");
    cy.get("button[name=changePassword]").click();
    cy.get("p").should("contain.text", "Successfully changed password");
  });
});
