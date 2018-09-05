module.exports = class DuplicateException {
    constructor(message) {
        this.message = message;
        this.name = 'DuplicateException';
    }
};