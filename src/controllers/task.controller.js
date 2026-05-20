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

const getTask = async (req,res) => {
    
    try{
       const task = await Task.findById(req.params.id);

    if(!task) {
       return res.status(404).json("Task not found");
    }

    res.json({
        msg: 'Task retrieved',
        data: task
    });
    }catch {
    res.status(500).json({message: error.message});
    }
};
const createTask =  async (req,res) => {
    try{
    if(! req.body.title ){
        return res.status(400).json('Please enter the title');
    }
    if(! req.body.userId ){
        req.body.userId =  1; 

    }
    const task = await Task.create(req.body);
    res.status(201).json({
       msg: 'Task was created',
       data: task   
    });
   }catch(error){
        res.status(500).json({error: error.message});
    }

};

const updTask =  async (req,res) => {
    try{
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(! task){
        return res.status(404).json('Task is not found');
    }
    res.status(200).json({msg:'Task updated successfully' , data:task});
   }catch(err){
    res.status(500).json({msg: err.message});
   }
};

const delTask =  async (req,res) => {
    try{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(! task ){
        return res.status(404).json({msg:'Task not found'});
    }
    res.status(200).json({
        msg:'Task deleted successfully'
    });
    }catch(err){
        res.status(500).json({msg: err.message});
    }

};


module.exports = {
    getTasks,
    getTask,
    createTask,
    updTask,
    delTask
};
