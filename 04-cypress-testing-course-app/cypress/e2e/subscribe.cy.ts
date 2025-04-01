import { faker } from "@faker-js/faker";


describe("Newsletter Subscribe Form", () => {
    const email = faker.internet.email();
 	const invalidEmail = "pelle";
 	const existingSubscriberEmail = "john@example.com";
 
    beforeEach(() => {
        // Visit page
        cy.visit("http://localhost:3000");

        // Wait for the app to be fully hydrated and visible 💦
        cy.get("#__next").should("be.visible");
    });

    context("Happy paths 🤩", () => {
        it("allows users to subscribe to the email list", () => {
            // ✍🏻
            cy.getByDataTest("email-input")
                .should("be.visible")
                .type(email);

            // 👆🏻
            cy.getByDataTest("submit-button").click();

            // 🥳❔
            cy.getByDataTest("success-message")
                .should("exist")
                .contains(email);
        });
    });


    context("Sad paths 🥺", () => {
        it.only("displays an error message when the email is invalid", () => {
            cy.getByDataTest("email-input").type(invalidEmail);
            cy.getByDataTest("submit-button").click();
            cy.getByDataTest("success-message").should("not.exist");
        });


        it.only("should not allow users to subscribe twice", () => {
            cy.getByDataTest("email-input").type(existingSubscriberEmail);
            cy.getByDataTest("submit-button").click();
            cy.get('[data-test="server-error-message"]')
                .should("be.visible")
                .contains(existingSubscriberEmail);
        });

        
        it("should not allow subscribing without an email address", () => {
            cy.getByDataTest("submit-button").click();
            cy.get('[data-test="error-message"]')
                .should("be.visible")
                .contains("Email is required");
        });
    });
});