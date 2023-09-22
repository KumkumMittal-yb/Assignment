import 'cypress-file-upload';
import { loginObj } from "../../page_objects/Login"
import { logoutObj } from '../../page_objects/Logout';


Cypress.Commands.add('uilogin', (username: string, password: string) => {
    cy.visit('/'); // Navigate to the login page
    loginObj.Username.type(username);
    loginObj.Password.type(password);
    loginObj.SubmitButton.click(); // Click the login button
});

Cypress.Commands.add('uilogout', () => {
    logoutObj.BurgerMenu().click();
    logoutObj.Logout().click();
});