



class CustomAPIError extends Error{
    constructor(message,statusCode){
        super(message) //invokes constructor of parent class
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomAPIError(message , statusCode) // return new instance

}
module.exports = {CustomAPIError, createCustomError}