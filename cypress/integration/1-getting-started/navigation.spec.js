describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains("day-list__item--selected", "Tuesday")
    .click()
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
  it("should book an interview", () => {
    cy.visit("/")
      .click("button")
  })
});
