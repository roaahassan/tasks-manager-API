const validateTask = (req,res,next) => {
   const {title} = req.body;
   if(! title) {
    return res.status(404).json('Title is required');
   }

   next();
};
module.exports = validateTask;