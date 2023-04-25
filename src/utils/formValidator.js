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

export const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf == '') return { status: false, message: 'O CPF é obrigatório!' }; // Verifica se o CPF está vazio

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length != 11) return { status: false, message: 'O CPF precisar ter 11 dígitos!' };

    // Verifica se todos os dígitos são iguais
    var igual = true;
    for (var i = 1; i < cpf.length; i++) {
        if (cpf[i] != cpf[0]) {
            igual = false;
            break;
        }
    }
    if (igual) return { status: false, message: 'O CPF é inválido!' };

    // Verifica se os dois últimos dígitos verificadores estão corretos
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    var resto = soma % 11;
    var digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = soma % 11;
    var digito2 = resto < 2 ? 0 : 11 - resto;

    if (digito1 != parseInt(cpf[9]) || digito2 != parseInt(cpf[10])) {
        return { status: false, message: 'O CPF é inválido!' };
    }

    // Se chegou até aqui, o CPF é válido
    return { status: true };
};


export const validatephoneNumber = (num) => {

    if (num.length < 8) {
        return { status: false, message: 'Número de telefone inválido!' };
    }
    return { status: true };
};


