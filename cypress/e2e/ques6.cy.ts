




describe('Verify Cart Updates When Adding and Removing Items', () => {
    beforeEach(() => {
        // Login with the correct credentials
        const uname: string = Cypress.env('username');
        const pass: string = Cypress.env('password');
        cy.uilogin(uname, pass);
    });

    it('should verify cart updates when adding and removing items', () => {
        // Verify initial cart badge count does not exist
        cy.get('.shopping_cart_badge').should('not.exist');

        // Add an item to the cart
        cy.get('.inventory_item').eq(0).find('.btn_primary').click();

        // Verify cart badge count is updated to 1
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Remove the item from the cart
        cy.get('.inventory_item').eq(0).find('.btn_secondary').click();

        // Verify cart badge count does not exist
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    afterEach(() => {
        // Logout
        cy.uilogout();
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html');
    });
});
