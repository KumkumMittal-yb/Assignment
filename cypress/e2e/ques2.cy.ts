// Question 2
// 
// Test the checkout process:
// a. Go through the checkout pages and write a test case for the checkout flow.

describe('Checkout Flow', () => {
    beforeEach(() => {
        //Login with the correct credentials
        const uname = Cypress.env('username');
        const pass = Cypress.env('password');
        cy.uilogin(uname, pass)
    });

    it('should complete the checkout process successfully', () => {

        // Add products to the cart
        cy.get('.inventory_item').eq(0).find('.btn_primary').click();
        cy.get('.inventory_item').eq(1).find('.btn_primary').click();

        // Go to the shopping cart
        cy.get('.shopping_cart_badge').click();

        // Verify the cart contains the added products
        cy.get('.cart_list')  
            .should('have.length', 1)  
            .find('.cart_item')  
            .should('have.length', 2);  


        // Proceed to checkout
        cy.contains('Checkout').click();

        // Fill in checkout information
        cy.get('#first-name').type('Test');
        cy.get('#last-name').type('User');
        cy.get('#postal-code').type('12345');
        cy.contains('Continue').click();

        // Verify the order summary
        cy.contains('Checkout: Overview').should('be.visible');
        cy.get('.cart_list')  
            .should('have.length', 1)  
            .find('.cart_item')  
            .should('have.length', 2);
        cy.contains('Finish').click();

        // Verify the order confirmation
        cy.contains('Thank you for your order').should('be.visible');
    });

    it('should display an error message for an incomplete checkout', () => {
        // Add a product to the cart
        cy.get('.inventory_item').eq(0).find('.btn_primary').click();

        // Go to the shopping cart
        cy.get('.shopping_cart_badge').click();

        // Proceed to checkout without entering information
        cy.contains('Checkout').click();
        cy.contains('Continue').click();

        // Verify the error message
        cy.contains('Error: First Name is required').should('be.visible');
        // After verification, click cancel button
        cy.get('button#cancel').click();
    });

    afterEach(() => {
        cy.uilogout();
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html');
    });
});
