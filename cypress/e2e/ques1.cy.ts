// Question 1
// Confirm the lowest price in the store:
// a. There are a few items shown on the page. Each item has a price. Can you
// extract the list of prices and confirm the lowest price is 7.99 (a number)?




it('Confirms the item with the lowest price', () => {
    const uname=Cypress.env('username');
    const pass=Cypress.env('password');
    cy.uilogin(uname,pass)
  cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
  // confirm the inventory page really loads
  // and the lowest price is 7.99
  cy.get('.inventory_list')
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    // from each price element, get its inner text
    // and log it to the DevTools console
    .then((list) => Cypress._.map(list, 'innerText'))
    .then(console.log)
    // each price string has "$" character in front
    // remove it using string "substr" method
    .then((list) => Cypress._.map(list, (s) => s.substr(1)))
    .then(console.log)
    // convert each price string into a Number
    .then((list) => Cypress._.map(list, Number))
    .then(console.log)
    // find the smallest price number using Cypress._.min
    .then((list) => Cypress._.min(list))
    .then(console.log)
    // and confirm it is 7.99
    .should('equal', 7.99)
})

