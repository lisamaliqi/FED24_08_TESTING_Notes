const testUser = {
	email: "snelhest2000@gmail.com",
	password: "appapp",
}

describe('Firebase todos', () => {

	context('Cant access protected routes without authenticating first', () => {
		it('Should redirect to login page when trying to access todos anonymously', () => {
			cy.visit('/todos');
			// cy.wait(1000);
			// cy.location('pathname').should('not.equal', '/todos'); //this is basically the same as the one under
			cy.location('pathname').should('equal', '/login');

		});
	});

	context('Can login', () => {
		beforeEach(() => {
			cy.visit('/login');
		});

		afterEach(() => {
			cy.logout();
		});

		it('Should login with an existing user', () => {
			// cy.get('input[type=\'email\']').type(testUser.email, { delay: 50 });
			// cy.get('input[type=\'password\']').type(testUser.password);
			// cy.get('[type=\'submit\']').click();

			// cy.location('pathname').should('equal', '/');

			//this instead of the one above (using commands.ts and index.d.ts)
			cy.login(testUser.email, testUser.password);
		});

		it("should log in with an existing user and visit todos page", () => {
			cy.login(testUser.email, testUser.password);  // 🐴😋🌾
			cy.visit("/todos");
			cy.location("pathname").should("equal", "/todos");
		});
	});
});
