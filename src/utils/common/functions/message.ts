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

    itemSaved: () => {
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
        return "Item could not be saved!";
    },

    categorySaved: () => {
        return "Item saved successfully!";
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
        return `User deleted successfully!`;
    },

    deletedFailed: () => {
        return `User couldn't be deleted!`;
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

    invalidOtp: () => {
        return `Invalid code, please enter the valid 6-digits code!`;
    },

    expiredOtp: () => {
        return `OTP expired, please resend and enter the valid 6-digits code again!`;
    },

    verifiedOtp: () => {
        return `OTP verified successfully!`;
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
        return `Please check validations!`;
    },
}