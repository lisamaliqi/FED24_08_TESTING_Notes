describe("Todos", () => {
    context("initial state", () => {
        beforeEach(() => {
            // Intercept GET requests to http://localhost:3001/todos
            // inline data is bad data 🥴
            /*
            cy.intercept("GET", "http://localhost:3001/todos", [
                { id: 1337, title: "I like todos and I cannot lie", completed: false },
            ]).as("getTodos");
            */

            // Fixtures 🦿
            cy.intercept("GET", "http://localhost:3001/todos", {
                fixture: "todos.json",
            }).as("getTodos");

            // Visit start page
            cy.visit("/");
        });

        it("should see two mocked todos", () => {
            // Wait for request to be intercepted before continuing with the test
            // (not really needed in this case, so just for demonstration purposes)
            cy.wait("@getTodos");

            cy.get("#todos").find("li").should("have.length.at.least", 2);

            cy.get("#todos")
                .find("li")
                .first()
                .should("have.class", "completed")
                .contains("I like todos and I cannot lie");

            cy.get("#todos")
                .find("li")
                .last()
                .should("not.have.class", "completed")
                .contains("I like E2E-tests very much, and I lie");
        });

        it("should not show error dialog", () => {
            cy.get("[role=\"alert\"]").should("not.be.visible");
        });
    });

    context("create todo", () => {
        beforeEach(() => {
            cy.visit("/");
        });

        it("create todo form should be empty", () => {
            cy.get("#new-todo-title").should("have.value", "");
        });

        it("can't create a todo without a title", () => {
            // cy.get("#todos").find("li").its("length").as("initialLength");
            // cy.get("#new-todo-title").type("{enter}");
            cy.get("[type=\"submit\"]").click();
            cy.get("[role=\"alert\"]").should("be.visible").contains("Title cannot be empty");
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

        it("can type in the create todo form and then reset the form", () => {
            cy.get("#new-todo-title").type("My ephemeral todo");
            cy.get("[type=\"reset\"]").click();
            cy.get("#new-todo-title").should("have.value", "");
        });
    });

    describe.only("Todo ID", () => {
        it("should get the first todo ID", () => {
            cy.visit("/");

            // cy.get("#todos")
            // 	.find("li")
            // 	.first()
            // 	.invoke("attr", "data-todo-id")
            // 	.then(todoId => {
            // 		console.log("Todo Id of first todo is:", todoId);
            // 	});

            cy.get("#todos")
                .find("li")
                .first()
                .invoke("attr", "data-todo-id")
                .as("todoId");

            cy.get("@todoId").then(todoId => {
                // Do something with it
                console.log("Todo Id of first todo is:", todoId);
            });
        });
    });
});