function ValidationError(fieldName, type = 'required') {

    const typeToVerbMap = {
        required: 'is required',
        unique: 'already exists'
    };
    const verb = typeToVerbMap[type] || typeToVerbMap.required;

    this.name = this.constructor.name;
    this.message = `The field "${fieldName}" ${verb}`;
    Error.captureStackTrace(this, this.constructor);
}

ValidationError.prototype = new Error;

module.exports = ValidationError;
