export const isSignupFormEmpty = ({ firstName, lastName, email, password, dateOfBirth, gender }) => {

    if (!firstName || !lastName || !email || !password || !dateOfBirth || !gender) {
        return { status: false, message: "Please fill all the details" };

    } else {
        return { status: true };
    }
};

export const isLoginFormEmpty = ({ email, password }) => {
    if (!email || !password) {
        return { status: false, message: "Please fill all the details" };
    }
    return { status: true };
};


export const validateEmail = (email) => {

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
        return { status: false, message: "Please provide a valid email id" };
    }
    return { status: true };
};


export const validatePassword = (password) => {

    const errors = [];

    if (password.length < 6) {
        errors.push("at least 6 characters");
    }
    if (password.length > 16) {
        errors.push("not more than 16 characters");
    }
    if (password.search(/[a-z]/i) < 0) {
        errors.push("at least one lower case");
    }
    if (password.search(/[A-Z]/i) < 0) {
        errors.push("at least one upper case");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("at least one number");
    }
    if (password.search(/[!@#$%^&*]/) < 0) {
        errors.push("at least one special character(! @ # $ % ^ & *)");
    }

    if (errors.length > 0) {
        return { status: false, message: errors.join(", ") };
    }
    return { status: true };
};


export const isCheckoutFormEmpty = (obj) => {

    const { addressLine1, addressLine2, city, pinCode, state, country, cpf, phoneNumber } = obj;

    if (!addressLine1 || !addressLine2 || !city || !pinCode || !state || !cpf || !country || !phoneNumber) {

        return { status: false, message: 'Preencha os campos obrigatórios!' };
    }
    return { status: true };
};


export const validatePinCode = (num) => {

    if (num.length < 8) {
        return { status: false, message: 'CEP precisa ser 8 dígitos!' };
    }
    return { status: true };
};


export const validatephoneNumber = (num) => {

    if (num.length < 8) {
        return { status: false, message: 'Número de telefone inválido!' };
    }
    return { status: true };
};


