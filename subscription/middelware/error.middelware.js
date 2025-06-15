//This is completely AI GENERATED BEecause I dont know about ALl the Error that can be possible
const errorMiddel=(err,req,res,next)=>{
    
    try{
        let error={...err};
        error.message=err.message;
        console.error(err);
        let message = error.message || 'Server Error';
    let statusCode = error.statusCode || 500;

        //MOngoose
        if(err.name==='CastError'){
            const message="resource not found";
            error=new Error(message);
            error.statusCode=404;
        }
         if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    message = `Duplicate field value entered: ${field}`;
    statusCode = 400;
  }
    if (err.name === "ValidationError") {
    message = Object.values(err.errors).map((val) => val.message).join(", ");
    statusCode = 400;
  }
    if (err.name === "MongoNetworkError") {
    message = "Could not connect to the database.";
    statusCode = 503;
  }
    if (err.name === "MongoServerSelectionError") {
    message = "Database server is unreachable or misconfigured.";
    statusCode = 500;
  }
   if (err.name === "UnauthorizedError") {
    message = "Unauthorized Access";
    statusCode = 401;
  }
 res.status(statusCode).json({
      success: false,
      error: message,
    });}catch(error){
        next(error)
    }
};
export default errorMiddel;