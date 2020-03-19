/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

const getscroll = x => cy.get(x).scrollIntoView();

describe("Checkout", () => {
  it("Can get to checkout from landing page", () => {
    cy.visit(Cypress.env("WEBSITE_URL"));
    cy.get("#buybutton_1 > .MuiButtonBase-root").click();
    cy.url().should("include", "/checkout");
    cy.contains("Оформление заказа").should("be.visible");
  });

  it("Can't buy with unfilled form", () => {
    cy.visit(Cypress.env("WEBSITE_URL") + "checkout");
    cy.get("h1").contains("Оформление заказа");

    getscroll('input[name="name"]').type(chance.name());
    getscroll('input[value="Другой город"]').click();
    getscroll('input[name="shipping_address"]').type("Улица Пушкина 420");
    getscroll('input[name="comment"]').type("TEST PURCHASE");

    getscroll('button[type="submit"]').click();

    cy.get('input[name="phone"]', { timeout: 10000 }).should("be.visible")
    cy.contains('Неверный телефон')
  });

  it("Should be able to buy Flow Brew", () => {
    const key = chance.string({
      length: 8,
      casing: "upper",
      alpha: true,
      numeric: true
    });

    cy.visit(Cypress.env("WEBSITE_URL") + "checkout");
    cy.get("h1").contains("Оформление заказа");

    getscroll('input[name="name"]').type(chance.name() + ' ' + key);
    getscroll('input[name="phone"]').type("9219203135");
    getscroll('input[value="Другой город"]').click();
    getscroll('input[name="shipping_address"]').type("Улица Пушкина 420");
    getscroll('input[name="comment"]').type("TEST PURCHASE " + key);

    getscroll('button[type="submit"]').click();
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      encodeURI("/спасибо")
    );

    cy.wait(20000);

    cy.task(
      "emails",
      {
        login: Cypress.env("YANDEX_BOT_EMAIL"),
        password: Cypress.env("YANDEX_BOT_TOKEN"),
        pattern: key
      },
      { timeout: 30000 }
    ).then(emails => {
      expect(emails).to.not.be.empty;
      emails.every(email =>
        expect(email)
          .to.have.property("body")
          .and.to.have.string(key)
      );
    });
  });
});
