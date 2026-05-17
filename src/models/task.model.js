const mongoose = require('mongoose');

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
module.exports = Task;