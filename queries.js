import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg
const pool = new Pool({ connectionString: process.env.DB_CONNECTIONSTRING });

// get all users
export const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  // get user by id
export const getUsersById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}  

// post a new user 
export const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

// PUT updated data in an existing user

export const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }


// delete a user 
export const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

