const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createTask = async (title, description, deadline, createid) => {
    const data = {
        data: {
            title: title,
            description: description,
            createid: createid,
            deadline: deadline,
            state: false,
            added: new Date().toISOString()
        }
    }
    console.log(`Creating task ${title}`)
    return await prisma.tasks.create(data)
}

const updateTask = async (title, description, deadline, state, id, userId) => {
    const task =  await prisma.tasks.findUnique({
        where: {
            id: id
        }
    })
    if (userId !== task.createid){
        console.log('Silent fail, someone tries to update others task')
        return
    }
    console.log(`Updating task ${title}`)

    return await prisma.tasks.update({
        where: {
            id: id
        },
        data: {
            title: title,
            description: description,
            deadline: deadline,
            state: state,
        },
    })
}

const removeTask = async (id, userId) => {
    const task =  await prisma.tasks.findUnique({
        where: {
            id: id
        }
    })
    if (userId !== task.createid){
        console.log('Silent fail, someone tries to delete others task')
        return
    }
    return await prisma.tasks.delete({
        where: {
            id: id
        }
    })
}

const fetchTasks = async (createid) => {
    return await prisma.tasks.findMany({
        where: {
            createid: createid
        }
    })
}

module.exports = { createTask, updateTask, removeTask, fetchTasks }
