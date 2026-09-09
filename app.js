
// // app.get('/api/v1/tasks')      - get all the tasks
// // app.post('/api/v1/tasks')     - create a new task
// // app.get('/api/v1/tasks/:id')  - get single task
// // app.patch('/api/v1/tasks/:id') - update task
// // app.delete('/api/v1/tasks/:id') - delete task



const express = require('express');
const app = express();

const tasks = require('./routes/task');

const port = process.env.PORT || 3000;

const connectDB = require('./Db/connect');
require('dotenv').config();  // to use the variables from .env file
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandler")


//middleware
app.use(express.static('./public'))
app.use(express.json());  // we dont have data in request body by default, so we need to use
//                         //  this middleware to parse the data in request body


//routes
app.use('/api/v1/tasks', tasks);
//new
app.use(notFound)
app.use(errorHandler)


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();