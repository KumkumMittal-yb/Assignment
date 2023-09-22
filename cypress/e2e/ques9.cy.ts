

//Question 9

// 9. Confirm the quantity change on checkout:
// a. Confirm the user can buy two bike lights.


describe('Confirm Quantity Change on Checkout', () => {
    beforeEach(() => {
        // Login with the correct credentials
        const uname: string = Cypress.env('username');
        const pass: string = Cypress.env('password');
        cy.uilogin(uname, pass);
    });

    it('should confirm the user can buy two bike lights', () => {
        //Add the desired item to the cart
        cy.get('button#add-to-cart-sauce-labs-bike-light').click();

        // The shopping cart badge should contain 1
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Add one more item
        // Fails here as it cannot add two items of the same type
        cy.get('button#add-to-cart-sauce-labs-bike-light').click();

        // The shopping cart badge should contain 2
        cy.get('.shopping_cart_badge').should('contain', '2');

        // Verify the quantity of bike lights in the cart
        cy.get('.cart_item').each(($item) => {
            const itemName: string = $item.find('.inventory_item_name').text().trim();
            const itemQuantity: number = parseInt($item.find('.cart_quantity').text().trim(), 10);

            if (itemName === 'Sauce Labs Bike Light') {
                expect(itemQuantity).to.equal(2);
            }
        });

        // Proceed to checkout
        cy.contains('Checkout').click();

        // Fill in checkout information (customize based on your test scenario)
        cy.get('#first-name').type('Test');
        cy.get('#last-name').type('User');
        cy.get('#postal-code').type('12345');
        cy.contains('Continue').click();
        cy.contains('Checkout: Overview').should('be.visible');

        // Verify the quantity of bike lights in the order summary
        cy.get('.cart_item').each(($item) => {
            const itemName: string = $item.find('.inventory_item_name').text().trim();
            const itemQuantity: number = parseInt($item.find('.summary_quantity').text().trim(), 10);

            if (itemName === 'Sauce Labs Bike Light') {
                expect(itemQuantity).to.equal(2);
            }
        });

        // After verification, click the cancel button
        cy.get('button#cancel').click();
    });

    afterEach(() => {
        // Logout
        cy.uilogout();
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html');
    });
});
