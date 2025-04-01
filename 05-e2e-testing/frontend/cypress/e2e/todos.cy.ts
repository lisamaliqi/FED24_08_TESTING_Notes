describe("Todos", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should see at least one todo", () => {
        cy.get("#todos").find("li").should("have.length.at.least", 1);
    });

    context("create todo", () => {
        it("create todo form should be empty", () => {
            cy.get("#new-todo-title").should("have.value", "");
        });

        it("can't create a todo without a title", () => {
            // cy.get("#todos").find("li").its("length").as("initialLength");
            // cy.get("#new-todo-title").type("{enter}");
            cy.get("[type=\"submit\"]").click();
            cy.get("#error").should("be.visible").contains("Title cannot be empty");
        });

        it(
			"can create a new todo (and see it in the list and clears input)",
			{ defaultCommandTimeout: 10000 },  // wait **up to** 10 seconds when looking for an element
			() => {
				const todoTitle = "Too many todos, didn't read " + Date.now();

				// type todo title and then submit form by pressing the enter-key
				cy.get("#new-todo-title").type(todoTitle).type("{enter}");

				// expect that a todo with the title exists in the list
				cy.get("#todos").find("li").last().contains(todoTitle);

				// expect input to be empty
				cy.get("#new-todo-title").should("have.value", "");
			}
		);

        it.only("can type in the create todo form and then reset the form", () => {
            cy.get("#new-todo-title").type("My ephemeral todo");
            cy.get("[type=\"reset\"]").click();
            cy.get("#new-todo-title").should("have.value", "");
        });
    });
});