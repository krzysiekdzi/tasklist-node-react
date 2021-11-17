const express = require('express')
const handleRegister = require('./controllers/register')
const handleLogin = require('./controllers/login')
const addTask = require('./controllers/addTask')
const editTask = require('./controllers/editTask')
const deleteTask = require('./controllers/deleteTask')
const getTasks = require('./controllers/getTasks')
const authenticationMiddleware = require('./middleware/authentication')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./queries/graphql')

const app = express()
const router = express.Router()

app.use(express.json())
app.use('/graphql', authenticationMiddleware, graphqlHTTP({
  schema,
}));
app.use(router)


router.route('/register').post(handleRegister)
router.route('/login').post(handleLogin)

router.route('/addTask').post(authenticationMiddleware, addTask)
router.route('/updateTask').put(authenticationMiddleware, editTask)
router.route('/deleteTask').delete(authenticationMiddleware, deleteTask)
router.route('/tasks').get(authenticationMiddleware, getTasks)


const start = async () => {
    try {
      app.listen(5000, () => {console.log("Started OK")}
      );
    } catch (error) {
      console.log(error);
    }
  };
  
start();
  