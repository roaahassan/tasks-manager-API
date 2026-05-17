const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(express.json());

app.use('/tasks', taskRoutes);


app.get('/tasks/:id' , async (req,res) => {
    
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
});


app.post('/tasks/create', async (req,res) => {
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

});

app.patch('/tasks/update/:id' , async (req,res) => {
    try{
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(! task){
        return res.status(404).json('Task is not found');
    }
    res.status(200).json({msg:'Task updated successfully' , data:task});
   }catch(err){
    res.status(500).json({msg: err.message});
   }
});

app.delete('/tasks/delete/:id', async (req,res) => {
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

});

module.exports = app;