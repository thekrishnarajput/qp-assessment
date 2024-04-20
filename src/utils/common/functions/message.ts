export const messages = {

    notAuthorized: () => {
        return "You are not authorized to perform this action!";
    },

    itemNotSaved: () => {
        return "Item could not be saved!";
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

    deletedSuccess: () => {
        return `User deleted successfully!`;
    },

    deletedFailed: () => {
        return `User couldn't be deleted!`;
    },

    updatedFailed: () => {
        return `Data couldn't be updated!`;
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

    alreadyExists: (params: string) => {
        return `Sorry, this ${params} is already linked with another account.`;
    },

    txnIdAlreadyExists: () => {
        return `Sorry, this transaction id is already exists.`;
    },

    validationError: () => {
        return `Please check validations!`;
    },
}