// Question 5


// Reusable login page object method:
// b. verify user is able to logout from the application.
// c. Verify the user is not able to access the /inventory.html if he is not logged in
// and assert the error message.

it('Success Logout Test', function(){
    const uname=Cypress.env('username');
    const pass=Cypress.env('password');
    cy.uilogin(uname,pass)
    cy.get('.title').should('contain.text', 'Products')
    cy.uilogout();
    cy.url().should('eq', 'https://www.saucedemo.com/')
    cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html');
})

it('Failed Login Test', function(){
    const uname=Cypress.env('username');
    cy.uilogin(uname, 'DummyPassword');
    cy.get('.error').should('contain.text','Epic sadface: Username and password do not match any user in this service');
})