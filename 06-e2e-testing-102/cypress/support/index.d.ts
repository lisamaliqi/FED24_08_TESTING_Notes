declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to log in a user.
		 *
		 * @param email Email
		 * @param password Password
		 * @example cy.login("snelhest2000@horsemail.com", "hö nom-nom")
		 */
		login(email: string, password: string): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to log out a user.
		 *
		 * @example cy.logout()
		 */
		logout(): Chainable<JQuery<HTMLElement>>;
	}
}
