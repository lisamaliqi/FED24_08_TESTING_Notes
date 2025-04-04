const snelhest = {
	email: "snelhest2000@gmail.com",
	password: "appapp",
}

describe("Firebase Todos", () => {
	context("Can't access protected routes without authenticating first", () => {
		it("Should redirect to login-page when trying to access todos anonymously", () => {
			cy.visit("/todos");
			// cy.wait(1000);
			// cy.location('pathname').should('not.equal', '/todos'); //this is basically the same as the one under
			cy.location("pathname").should("equal", "/login");
		});
	});

	context('Can login', () => {
		beforeEach(() => {
			cy.visit('/login');
		});

		afterEach(() => {
			cy.logout();
		});

		it("Should log in with an existing user", () => {
			// cy.get('input[type=\'email\']').type(testUser.email, { delay: 50 });
			// cy.get('input[type=\'password\']').type(testUser.password);
			// cy.get('[type=\'submit\']').click();

			// cy.location('pathname').should('equal', '/');

			//this instead of the one above (using commands.ts and index.d.ts)
			cy.login(snelhest.email, snelhest.password);  // 🐴😋🌾
		});

		it("Should log in with an existing user and visit todos page", () => {
			cy.login(snelhest.email, snelhest.password);  // 🐴😋🌾
			cy.visit("/todos");
			cy.location("pathname").should("equal", "/todos");
		});
	});

	context.only("Todo actions", () => {
		beforeEach(() => {
			cy.visit("/login");
			cy.login(snelhest.email, snelhest.password);
		});

		afterEach(() => {
			cy.logout();
		});

		it("All todos should have a title", () => {
			cy.visit("/todos");

			cy.get(".todo-list-item .todo-title")
				.each($el => {
					cy.wrap($el).should("not.be.empty");
				});
		});
	});
});
