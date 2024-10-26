class APIError {
    message;
    code;

    constructor(message, code) {
        this.message = message;
        this.code = code;
    }

    /** @param {{text:string}} information */
    object(information) {
        return {
            information: information,
            message: this.message,
            code: this.code
        }
    }
}

module.exports = {
    APIError
};