const { updateTask } = require('../queries/tasks')

const editTask = (req, res) => {
    const userId = req.user.id
    const { title, description, deadline, state, id} = req.body
    updateTask(title, description, deadline, state, id, userId)
    res.status(201).json({msg: 'OK'})
}

module.exports = editTask
