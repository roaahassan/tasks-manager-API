const Task = require('../models/task.model');


const getTasks = async (req,res) => {

    const tasks = await Task.find();    
    res.json({
        success:true,
        message: 'Tasks retrieved',
        data: tasks
    });
    
};

const getTask = async (req,res) => {

    const task = await Task.findById(req.params.id);

    if(!task) {
       return res.status(404).json({
        success:false,
        message:"Task not found"
    });

    }
    res.json({
        success:true,
        message: 'Task retrieved',
        data: task
    });

};
const createTask =  async (req,res) => {

    const task = await Task.create(req.body);
    res.status(201).json({
       success:true,
       message: 'Task was created',
       data: task   
    });

};

const updTask =  async (req,res) => {
    
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(! task){
        return res.status(404).json({
            success:false,
            msg:'Task is not found'
        });
    }
    res.status(200).json({
        success:true, 
        message:'Task updated successfully',
        data:task
    });
    
};

const delTask =  async (req,res) => {
   
    const task = await Task.findByIdAndDelete(req.params.id);
    if(! task ){
        return res.status(404).json({
            success:false,
            message:'Task not found'
        });
    }
    res.status(200).json({
        success:true,
        message:'Task deleted successfully',
        data:getTasks
    });
   
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updTask,
    delTask
};
