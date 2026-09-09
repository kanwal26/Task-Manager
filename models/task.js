const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    //validation
    name: {
         type: String,
       required: [true, 'Please provide a name for the task'], //or required: true,
        trim: true,  // remoce spaces from the beginning and end of the string
        maxlength: [20, 'Name cannot be more than 20 characters'],
        minlength: [3, 'Name cannot be less than 3 characters']
        },     
   
    completed:{
        type: Boolean,
        default: false
    }
})

//validation to avoid empty values in the database
module.exports = mongoose.model('Task',taskSchema)