describe('Load Item Data from Fixture File', () => {
    beforeEach(() => {
        // Login with the correct credentials
        const uname: string = Cypress.env('username');
        const pass: string = Cypress.env('password');
        cy.uilogin(uname, pass);
    });

    it('should load item data from fixture file and confirm item presence', () => {
        // Load item data from the fixture file
        cy.fixture('itemData').then((itemData) => {
            // Ensure the item with name 'Sauce Labs Backpack' is present in the fixture data
            const desiredItemName: string = 'Sauce Labs Backpack';
            const desiredItem = itemData.find((item) => item.name === desiredItemName);

            expect(desiredItem, `Item "${desiredItemName}" not found in fixture data`).to.exist;

            // Log the item details for verification
            cy.log(`Item Name: ${desiredItem.name}`);
            cy.log(`Item Description: ${desiredItem.description}`);
            cy.log(`Item Price: ${desiredItem.price}`);
        });
    });

    afterEach(() => {
        // Logout
        cy.uilogout();
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html');
    });
});
