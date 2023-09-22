// Question 4

// 4. Ensure the order tax:
// a. Verify the order tax is between 5% and 10% of the item price total.


describe('Verify Order Tax', () => {
    beforeEach(() => {
        // Login with the correct credentials
        const uname: string = Cypress.env('username');
        const pass: string = Cypress.env('password');
        cy.uilogin(uname, pass);

        // Add products to the cart (customize this based on your test scenario)
        cy.get('.inventory_item').eq(0).find('.btn_primary').click();
        cy.get('.inventory_item').eq(1).find('.btn_primary').click();

        // Go to the shopping cart
        cy.get('.shopping_cart_badge').click();
    });

    it('should verify order tax', () => {
        // Proceed to checkout
        cy.contains('Checkout').click();

        // Fill in checkout information
        cy.get('#first-name').type('Test');
        cy.get('#last-name').type('User');
        cy.get('#postal-code').type('12345');
        cy.contains('Continue').click();
        cy.contains('Checkout: Overview').should('be.visible');

        // Get the sub total value and calculate its minimum and maximum tax
        cy.get('.summary_subtotal_label').invoke('text').then($subtotalText => {
            const subTotal: number = parseFloat($subtotalText.replace('Item total: $', '').trim());
            
            // Calculate the minimum and maximum tax values
            const minTax: number = subTotal * 0.05; // 5% tax
            const maxTax: number = subTotal * 0.10; // 10% tax

            // Log for debugging purposes
            cy.log(`Subtotal: ${subTotal}`);
            cy.log(`Min Tax: ${minTax}`);
            cy.log(`Max Tax: ${maxTax}`);

            // Verify the displayed order tax on the checkout page
            cy.get('.summary_tax_label').invoke('text').then($displayedTax => {
                const displayedTax: number = parseFloat($displayedTax.replace('Tax: $', '').trim());

                // Check if the displayed tax is within the expected range
                expect(displayedTax).to.be.at.least(minTax);
                expect(displayedTax).to.be.at.most(maxTax);
            });
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
