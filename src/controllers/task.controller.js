const Task = require('../models/task.model');


const getTasks = async (req,res) => {

    try{
        const tasks = await Task.find();    
        res.json({
            msg: 'Tasks retrieved',
            data: tasks
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }

};

module.exports = {getTasks};
