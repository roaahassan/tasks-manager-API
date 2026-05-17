const express = require('express');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

//DB connection
mongoose.connect('mongodb+srv://rowahhassan888_db_user:2SOTKjdZ7i9XMdTf@cluster2.g6o1poa.mongodb.net/tasksDB?appName=Cluster2')
.then( () => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Schema Model
const taskSchema = new mongoose.Schema({
    title:{
        type: String,required: [true, 'title is required'],
        trim:true,
        minlength:[3,'Title must be at least 3 chars']
    },
    des:{type: String , maxlength: [200,'Description must be less than 200 chars']},
    dueDate:{type: Date, validate:{
        validator: function(value) {
            return value > new Date;
        },
        message: 'duaDate must be in the future'}
    },
    taskStatus:{type:String ,enum: ['pending','in-progress','completed'] ,default:'pending' },
    // userId:{type:mongoose.Schema.Types.ObjectId,ref: 'User',required:[true,'User };
    // timestamps: true
});
const Task = mongoose.model('Task', taskSchema);

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.get('/tasks' , async (req,res) => {

    // 
    try{
        const userTasks = await Task.find();    
        res.json({
            msg: 'Tasks retrieved',
            data: userTasks
        });
    }catch{
        res.status(500).json('There is no task yet !');
    }
});

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


app.post('/createTask', async (req,res) => {
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

app.put('/tasks/:id' , async (req,res) => {
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

app.delete('/tasks/:id', async (req,res) => {
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

app.listen(5000, () => {
    console.log('Sever is running on port 5000');

});

