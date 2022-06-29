import express from 'express'
import bodyParser from 'body-parser'
const app = express()
import { getUsers, getUsersById, createUser, updateUser, deleteUser } from './queries.js'
const port = 3000


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users', getUsers)
app.get('/users/:id', getUsersById)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

 