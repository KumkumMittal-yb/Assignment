
// Question 3

// 3. Ensure the order item's total is showing correctly based on products
// added to the cart.
// a. Verify the item total amount shown during the checkout process is correct

describe('Verify Item Total Amount in Checkout', () => {
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
  
    it('should verify item total amount during checkout', () => {
      // Calculate the expected total amount as a floating-point number
      let expectedTotal: number = 0.00; // Initialize with 0.00
      cy.get('.cart_item').each(($item, index, $list) => {
        const $priceText: string = $item.find('.inventory_item_price').text().replace('Price: $', '').trim();
        const $quantity: number = parseInt($item.find('.cart_quantity').text().trim(), 10);
  
        // Remove the "$" symbol and any whitespace before parsing the price
        const $price: number = parseFloat($priceText.replace('$', '').trim());
  
        if (!isNaN($price)) {
          expectedTotal += $price * $quantity;
        } else {
          cy.log(`Skipping invalid price: ${$priceText}`);
        }
      });
  
      // Round the expectedTotal to two decimal places
      expectedTotal = Math.round(expectedTotal * 100) / 100;
  
      // Proceed to checkout
      cy.contains('Checkout').click();
  
      // Fill in checkout information
      cy.get('#first-name').type('Test');
      cy.get('#last-name').type('User');
      cy.get('#postal-code').type('12345');
      cy.contains('Continue').click();
      cy.contains('Checkout: Overview').should('be.visible');
  
      // Verify the displayed total amount on the checkout page
      cy.get('.summary_subtotal_label').invoke('text').then($displayedTotal => {
        const displayedTotal: number = parseFloat($displayedTotal.replace('Item total: $', '').trim());
  
        // Round the displayedTotal to two decimal places
        const roundedDisplayedTotal: number = Math.round(displayedTotal * 100) / 100;
  
        // Compare the displayed total with the expected total
        expect(roundedDisplayedTotal).to.equal(expectedTotal);
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
  