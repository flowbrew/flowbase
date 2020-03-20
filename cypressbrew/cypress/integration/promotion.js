/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Promocode", () => {
  it("Can be entered via url params", () => {
    cy.visit(Cypress.env("WEBSITE_URL") + "checkout/?code=GIFT10");
    cy.contains("Оформление заказа", { timeout: 10000 });
    cy.get('input[name="promocode"]').should("have.value", "GIFT10");
    cy.contains("Скидка").should("exist");
  });

  it("Can be entered via checkout page", () => {
    cy.visit(Cypress.env("WEBSITE_URL") + "checkout");

    const input = () => cy.get('input[name="promocode"]');

    input().clear();
    input().type("LOL");
    cy.contains("Скидка").should("not.exist");

    input().clear();
    input().type("FLB10");
    cy.contains("Скидка").should("exist");

    input().type("{backspace}");
    cy.contains("Скидка").should("not.exist");
  });

  it("Persistent between pages", () => {
    const url = Cypress.env("WEBSITE_URL")
    
    cy.visit(url + encodeURI("контакты/?code=GIFT10"));
    cy.contains("Контакты", { timeout: 10000 });

    cy.visit(url + "checkout");
    cy.contains("Оформление заказа", { timeout: 10000 });
    cy.get('input[name="promocode"]').should("have.value", "GIFT10");
    cy.contains("Скидка").should("exist");

    cy.visit(url);
    cy.contains("Flow Brew", { timeout: 10000 });
    cy.contains("Скидка").should("exist");
  });

  it("Can be used only once", () => {
    const url = Cypress.env("WEBSITE_URL")
    const getscroll = x => cy.get(x).scrollIntoView();

    cy.visit(url + "checkout");

    const input = () => cy.get('input[name="promocode"]');
    const promocode = "FLB10";

    input().clear();
    input().type(promocode);
    cy.contains("Скидка").should("exist");

    getscroll('input[name="name"]').type(chance.name());
    getscroll('input[name="phone"]').type("9219203135");
    getscroll('input[value="Другой город"]').click();
    getscroll('input[name="shipping_address"]').type("Улица Пушкина 420");
    getscroll('input[name="comment"]').type("TEST PURCHASE");
    getscroll('button[type="submit"]').click();
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      encodeURI("/спасибо")
    );

    cy.visit(url + "checkout");
    cy.contains("Flow Brew", { timeout: 10000 });
    cy.contains("Скидка").should("not.exist");
    input().should("have.value", "");

    input().clear();
    input().type(promocode);
    cy.contains("Скидка").should("not.exist");
  });
});

describe("Welcome bonus", () => {
  it("Should be NO bonus on the first landing page view", () => {
    cy.visit(Cypress.env("WEBSITE_URL"));
    cy.contains("Flow Brew", { timeout: 10000 });
    cy.contains("Скидка").should("not.exist");
  });

  it("Should be NO bonus on not relevant page views", () => {
    const url = Cypress.env("WEBSITE_URL")

    cy.visit(url + encodeURI("контакты"));
    cy.contains("Контакты", { timeout: 10000 });
    cy.visit(url + encodeURI("контакты"));
    cy.contains("Контакты", { timeout: 10000 });
    cy.visit(url);
    cy.contains("Flow Brew", { timeout: 10000 });
    cy.contains("Скидка").should("not.exist");
  });

  it("Should be given on the second landing page view", () => {
    const url = Cypress.env("WEBSITE_URL")

    cy.visit(url);
    cy.contains("Flow Brew", { timeout: 10000 });
    cy.visit(url);
    cy.contains("Flow Brew", { timeout: 10000 });
    cy.contains("Скидка").should("exist");
  });

  it("Should be given on the first checkout view", () => {
    cy.visit(Cypress.env("WEBSITE_URL") + "checkout");
    cy.contains("Оформление заказа", { timeout: 10000 });
    cy.get('input[name="promocode"]').should("have.value", "WELCOME10");
    cy.contains("Скидка").should("exist");
  });
});
