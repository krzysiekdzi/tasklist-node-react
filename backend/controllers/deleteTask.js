const { removeTask } = require('../queries/tasks')

const deleteTask = (req, res) => {
    const userId = req.user.id
    const { id } = req.body
    removeTask(id, userId)
    res.status(200).json({msg: 'OK'})
}

module.exports = deleteTask
