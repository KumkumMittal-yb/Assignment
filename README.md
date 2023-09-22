In the same code base set up Cypress and organize code using TypeScript :
1. Confirm the lowest price in the store:
a. There are a few items shown on the page. Each item has a price. Can you
extract the list of prices and confirm the lowest price is 7.99 (a number)?
2. Test the checkout process:
a. Go through the checkout pages and write a test case for the checkout flow.
3. Ensure the order item's total is showing correctly based on products
added to the cart.
a. Verify the item total amount shown during the checkout process is correct.
Junior QA Engineer Assignment 3
4. Ensure the order tax:
a. Verify the order tax is between 5% and 10% of the item price total.
5. Reusable login page object method:
a. implement a reusable method login and logout
b. verify user is able to logout from the application.
c. Verify the user is not able to access the /inventory.html if he is not logged in
and assert the error message.
6. Ensure the cart shows the correct number when the user removes the
inventory from the cart:
a. Verify the Add button and the cart badges work.
b. verify the remove button works and that the count is correctly updated.
7. Avoid hard-coded username and password:
a. Move the login information into the env config object.
8. Test the item product view:
a. Load and verify the product view showing an individual item.
9. Confirm the quantity change on checkout:
a. Confirm the user can buy two bike lights.
10. Load item data from a fixture file:
a. Load JSON fixture file and confirm the item is present.


