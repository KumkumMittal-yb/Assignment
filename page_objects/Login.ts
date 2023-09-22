// Reusable login page object method:
// a. implement a reusable method login and logout



class Login {
    private username: string = "#user-name";
    private password: string = "#password";
    private submit: string = "input[type=submit]";

    get Username() {
        return cy.get(this.username);
    }

    get Password() {
        return cy.get(this.password);
    }

    get SubmitButton() {
        return cy.get(this.submit);
    }
}

export const loginObj = new Login();