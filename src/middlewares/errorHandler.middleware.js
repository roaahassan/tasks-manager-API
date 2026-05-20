const errHandler = (err,req,res,next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if(err.name === 'ValidationError') {
        statusCode = 400;
    }

    res.status(statusCode).json({
        success:false,
        message
    });
     
};
module.exports = errHandler;