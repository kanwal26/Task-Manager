const asyncWrapper = (fn) => {
    //we actually return another func
    return async (req, res, next) =>{
        try {
            await fn (req, res, next) 
        } catch (error) {
            next(error)  // we are passing this to next middleware
            
        }

    }

}

module.exports = asyncWrapper