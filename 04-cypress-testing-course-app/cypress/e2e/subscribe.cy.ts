describe("Newsletter Subscribe Form", () => {
    beforeEach(() => {
        // Visit page
        cy.visit("http://localhost:3000");

        // Wait for the app to be fully hydrated and visible 💦
        cy.get("#__next").should("be.visible");
    });

    it("allows users to subscribe to the email list", () => {
        cy.wait(1500); // Adjust the time as needed
        // ✍🏻
        cy.getByDataTest("email-input")
            .scrollIntoView()
            .should("be.visible")
            .type("pelle@svanslos.nu");

        // 👆🏻
        cy.getByDataTest("submit-button").click();

        // 🥳❔
        cy.getByDataTest("success-message")
            .should("exist")
            .contains("pelle@svanslos.nu");
    });
});