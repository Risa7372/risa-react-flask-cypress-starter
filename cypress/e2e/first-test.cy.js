describe("shipyard flask react example app", () => {
  beforeEach(() => {
    const pathWithShipyardToken = path => {
      return path + "?shipyard_token=" + Cypress.env("BYPASS_TOKEN");
    };
    cy.visit(pathWithShipyardToken("/"));
  });

  it("Displays the logo with correct alt text", () => {
    cy.get("#page-logo").should("have.attr", "alt", "Shipyard logo");
  });

  it("Counter should be larger than 1000", () => {
    cy.get("#api-call-counter").then($countInfo => {
      const count = parseInt($countInfo.text().match(/(\d+) time/)?.[1], 10);
      expect(count).to.be.greaterThan(1000);
    });
  });

 // it("Reset Button", () => {
  //   // test button reset so server has pinged only one time 
  //   cy.get("button")
  //     .contains("Reset Counter")
  //     .click();
  
  //   cy.wait(1000);
  
  //   cy.get("p")
  //     .contains("Flask server running on port")
  //     .should("contain", "1 time");
  // });
});
