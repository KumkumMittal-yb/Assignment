// Question 8

// Test the item product view:
// a. Load and verify the product view showing an individual item.



describe('Test Item Product View', () => {
    const itemToTest = {
        name: 'Sauce Labs Backpack',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        price: '$29.99',
    };

    beforeEach(() => {
        // Login with the correct credentials
        const uname: string = Cypress.env('username');
        const pass: string = Cypress.env('password');
        cy.uilogin(uname, pass);
    });

    it('should load and verify the product view for an individual item', () => {
        // Navigate to the product details page of a specific item
        cy.get('.inventory_item_name').contains(itemToTest.name).click();

        // Verify that the product view is displayed correctly
        cy.get('.inventory_details').should('be.visible');
        cy.get('.inventory_details_name').should('be.visible');
        cy.get('.inventory_details_desc').should('be.visible');
        cy.get('.inventory_details_price').should('be.visible');

        // Add assertions to verify specific details about the item
        cy.get('.inventory_details_name').should('contain', itemToTest.name);
        cy.get('.inventory_details_desc').should('contain', itemToTest.description);
        cy.get('.inventory_details_price').should('contain', itemToTest.price);
    });

    afterEach(() => {
        // Logout
        cy.uilogout();
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html');
    });
});
