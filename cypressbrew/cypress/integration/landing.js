/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Landing page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("WEBSITE_URL"));
  });

  it("Successfully loads", () => {});
});
