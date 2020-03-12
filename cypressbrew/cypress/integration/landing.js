/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Landing page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("WEBSITE_URL"));
  });

  it("Successfully loads", () => {});

  it("Has working preview buttons", () => {
    const testPreview = n => {
      const previewImage = () =>
        cy.get(`#preview_image_${n} > .gatsby-image-wrapper > picture > img`);

      previewImage()
        .scrollIntoView()
        .click();
      previewImage()
        .should("have.attr", "src")
        .then(src => {
          const img = src.match(/(\/[^.\/]*\.[^.\/]*)$/)[0];

          cy.get("#selected_image > .react-parallax > img")
            .should("have.attr", "src")
            .and("contains", img);
        });
    };

    testPreview(1);
    testPreview(2);
    testPreview(3);
    testPreview(4);
  });
});
