function MissingArgumentError(paramName, docUrl) {
    this.name = this.constructor.name;
    this.message = `The ${paramName} argument is missing.`;
    if (docUrl) {
        this.message += ` ${docUrl}`;
    }
    Error.captureStackTrace(this, this.constructor);
}

MissingArgumentError.prototype = new Error;

module.exports = MissingArgumentError;
