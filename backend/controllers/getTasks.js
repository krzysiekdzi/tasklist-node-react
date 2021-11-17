const { fetchTasks } = require('../queries/tasks')

const getTasks = async (req, res) => {
    const {id} = req.user
    const tasks = await fetchTasks(id)
    console.log(tasks)
    return res.status(200).json({tasks})
}

module.exports = getTasks