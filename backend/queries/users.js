const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createUser = async (email, salt, hash) => {
    const data = {
        data: {
            email: email,
            salt: salt,
            passwordhash: hash,
            joined: new Date().toISOString()
        }
    }
    return await prisma.users.create(data)
}

const findUserByEmail = async (email) => {
    return await prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

const getUser = async (id) => {
    return await prisma.users.findUnique({
        where: {
            id: id
        }
    })
}

module.exports = { createUser, findUserByEmail, getUser }
