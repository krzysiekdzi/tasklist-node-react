const { createTask } = require('../queries/tasks')

const addTask = (req, res) => {
    const {id} = req.user
    const { title, description, deadline } = req.body
    createTask(title, description, deadline, id)
    res.status(201).json({msg: 'OK'})
}

module.exports = addTask