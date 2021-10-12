const { Joi } = require("express-validation");

const createMachineValidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        clientId: Joi.string()
            .required(),
        equipmentId: Joi.string()
            .required(),
        manufacturerId: Joi.string()
            .required(),
        productId: Joi.string()
            .required(),
        modelId: Joi.string()
            .required(),
        serialNumber: Joi.string()
            .required(),
    })
};

const createMachineConsumableValidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        machineId: Joi.string().required(),
        timeRemaining: Joi.string().required(),
        noOfCycle: Joi.string().required()
    })
};

const loginValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6).required(),
    })
};

const createClientValidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        address: Joi.string(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
};

const createEscalationValidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string().email().required(),
        machineId: Joi.string().required(),
        labelId: Joi.string().required(),
    })
};

const addConsumableMessage = {
    body: Joi.object({
        message: Joi.string()
            .required(),
        type: Joi.string()
            .required(),
        showOn: Joi.string()
            .required(),
    })
};

module.exports = {
    createMachineValidation,
    loginValidation,
    createMachineConsumableValidation,
    createClientValidation,
    createEscalationValidation,
    addConsumableMessage
};