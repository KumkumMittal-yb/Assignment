describe('template spec', () => {

    // beforeEach(() => {
    //     // cy.login("standard_user", "secret_sauce")
    //     const username = "standard_user";
    //     const password = "secret_sauce";
    //     cy.visit('https://www.saucedemo.com'); // Navigate to the login page
    //     cy.get('#user-name').type(username); // Fill in the username field
    //     cy.get('#password').type(password); // Fill in the password field
    //     cy.get('input[type="submit"]').click();
    // });

    it('testcase-1', () => {
        cy.visit('https://www.saucedemo.com'); // Navigate to the login page
        cy.get('#user-name').type("standard_user"); // Fill in the username field
        cy.get('#password').type("secret_sauce"); // Fill in the password field
        cy.get('input[type="submit"]').click();
        cy.get('#shopping_cart_container').click()
    })

    it.only("tc2",()=>{
        cy.uilogin("standard_user","secret_sauce");
    })
})