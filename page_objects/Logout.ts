// Question 5
// Reusable login page object method:
// a. implement a reusable method login and logout

class Logout {
    

    BurgerMenu() {
        return cy.get('#react-burger-menu-btn');
    }

    Logout() {
        return cy.get('#logout_sidebar_link');
    }

}

export const logoutObj = new Logout();