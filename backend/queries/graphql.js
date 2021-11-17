const { PrismaClient } = require('@prisma/client')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const prisma = new PrismaClient();

const typeDefs = `
    type Task {
        createid: Int
        id: Int
        title: String
        description: String
        added: String
        deadline: String
        state: Boolean
    }

    type Query {
        allTasks(createid: Int!, deadline: String): [Task!]!
    }
`

const resolvers = {
    Query: {
        allTasks: (obj, args, context, info) => {
            if (context.user.id !== args.createid){
                return []
            }
            if (args.deadline != undefined){
                return prisma.tasks.findMany({
                    where: {
                        createid: args.createid,
                        deadline: {
                            lte: new Date(args.deadline)
                        }
                    }
                })
            }
            return prisma.tasks.findMany({
                where: {
                    createid: args.createid
                }
            })
        }
    }
}

const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
  });

module.exports = schema