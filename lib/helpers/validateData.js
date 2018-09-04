const {ValidationError} = require('../errors');


module.exports = function(data, validation) {

    const validateMap = {
        required: value => !!value
    };

    const invalidFields = Object.entries(validation).filter(([fieldName, validationName]) => {
        if (!validationName) return;
        const validate = validateMap[validationName] || validateMap.required;
        const value = data[fieldName];
        return !validate(value);
    });

    if (invalidFields.length) {
        const [fieldName, validationName] = invalidFields[0];
        throw new ValidationError(fieldName, validationName);
    }

};