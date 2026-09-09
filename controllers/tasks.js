const Task = require('../models/task')
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../Errors/custom-errors")

const getAllTasks = asyncWrapper (async(req, res) => { 
     //res.json('get all tasks')
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
                               /* NEW ADDED */
    /* // res.status(200).json({ tasks, amount: tasks.length }) 
    // or
    res
    .status(200)
    // .json({ success: true , data: { tasks, nbHits: tasks.length} }) 
    .json({ status: "success" , data: { tasks, nbHits: tasks.length} }) */
}
)


const createTask = asyncWrapper (async(req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })  // 201 status code means resource created successfully
   

})

const getTask = asyncWrapper (async(req, res) => {
        const task = await Task.findById(req.params.id)
        //two types of errors can occur here, one is if the id is not valid and second is if the id is valid but no task is found with that id
        //same structure but change last id digit u get 500 error if same character or digit and 
        // 404 error if different character or digit
        //an invalid MongoDB ID normally goes into your catch → 500, while a valid ID with no matching task gives 404.
        if (!task) {
                                /*  NEW  without custom class*/
            // const error = new Error("Task not found")
            // error.status = 404
            // return next(error)

             /*  NEW  with custom class*/
             return next(createCustomError(`No task found with id: ${req.params.id}`, 404))
        
        }
        res.status(200).json({ task });

})


const updateTask = asyncWrapper (async (req, res) => {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body,
            // validators
            {
               // previous versions new: true, // return the updated document
                returnDocument: 'after',
                runValidators: true, // run the validators defined in the schema
            }
        )
        if (!task) {
            // return res.status(404).json({ msg: `No task found with id: ${taskID}` });
                 return next(createCustomError(`No task found with id: ${req.params.id}`, 404)) 
        }
        res.status(200).json({ task });

}   )

const deleteTask = asyncWrapper ( async(req, res) => {
    //res.send('delete task')
        const { id: taskID } = req.params
        const task = await Task.findByIdAndDelete({ _id: taskID })      
    if (!task) {
             return next(createCustomError(`No task found with id: ${req.params.id}`, 404))
    }
    // res.status(200).json({ msg: ' Task deleted successfully' });
    res.status(200).json({ task } ); // same functionality as below
    // res.status(200).send(); // same functionality as above
    // res.status(200).json({ task: null, status: 'success' }); // same functionality as above


})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}