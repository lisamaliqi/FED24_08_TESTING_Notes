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
			cy.visit('/logout');

			//make sure we've actually been logged out as it takes a small amount of time
			cy.location('pathname').should('equal', '/login');
		});

		it('Should login with an existing user', () => {
			cy.get('input[type=\'email\']').type(testUser.email, { delay: 50 });
			cy.get('input[type=\'password\']').type(testUser.password);
			cy.get('[type=\'submit\']').click();

			cy.location('pathname').should('equal', '/');

		});
	});
});
