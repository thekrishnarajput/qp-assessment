export const messages = {

    notAuthorized: () => {
        return "You are not authorized to perform this action!";
    },

    noTokenProvided: () => {
        return "Authorization failed, no token provided!";
    },

    invalidOrExpiredToken: () => {
        return "Authorization failed, token is invalid!";
    },

    itemNotSaved: () => {
        return "Item could not be saved!";
    },

    insufficientQuantity: (param: number) => {
        return `This product has ${param} stock available! Please reduce quantity.`;
    },

    outOfStock: () => {
        return `This product is out of stock! Please remove and add similar item.`;
    },

    itemSaved: () => {
        return "Item saved successfully!";
    },

    itemNotAdded: () => {
        return "Item could not be saved!";
    },

    itemAdded: () => {
        return "Item saved successfully!";
    },

    itemNotRemoved: () => {
        return "Item could not be removed!";
    },

    itemRemoved: () => {
        return "Item removed successfully!";
    },

    itemNotUpdated: () => {
        return "Item quantity could not be updated!";
    },

    itemUpdated: () => {
        return "Item quantity updated successfully!";
    },

    categoryNotSaved: () => {
        return "Category could not be saved!";
    },

    categorySaved: () => {
        return "Category saved successfully!";
    },

    orderInitiated: () => {
        return "Order has been initiated successfully!";
    },

    orderPlaced: (name: string, orderId: number) => {
        return `Congratulations ${name || ""}! Your order with order id: ${orderId}, has been placed successfully. You can check the order status in My Orders`;
    },

    orderAlreadyPlaced: () => {
        return "Sorry, this order has already been placed!";
    },

    userNotSaved: () => {
        return "User could not be created!";
    },

    userSaved: () => {
        return "User account is created successfully!";
    },

    updatedSuccess: () => {
        return `Data updated successfully!`;
    },

    updatedFailed: () => {
        return `Data couldn't be updated!`;
    },

    deletedSuccess: () => {
        return `Deleted successfully!`;
    },

    deletedFailed: () => {
        return `Sorry, couldn't be deleted!`;
    },

    savedSuccess: () => {
        return `Data saved successfully!`;
    },

    savedFailed: () => {
        return `Data couldn't be saved!`;
    },

    noDataFound: () => {
        return `Sorry, no data found!`;
    },

    dataFound: () => {
        return `Data found!`;
    },

    loginSuccess: () => {
        return `Logged in successfully!`;
    },

    incorrectPassword: () => {
        return `Incorrect password, please enter a correct password!`;
    },

    errorMessage: () => {
        return `Oops! something went wrong, please try again.`;
    },

    blockedOrDeletedMessage: () => {
        return `Oops! looks like this account is blocked or deleted, please contact to the site admin.`;
    },

    alreadyExists: (params: string) => {
        return `Sorry, this ${params} is already linked with another account.`;
    },

    oldPasswordExists: () => {
        return `Sorry, this password is already exists, please choose another password.`;
    },

    validationError: () => {
        return `Please check validation fields!`;
    },
}