Creating a CRUD (Create, Read, Update, Delete) application using Node.js with PostgreSQL involves several steps. Here's a step-by-step guide to help you set it up:

### Step 1: Setup PostgreSQL

Make sure PostgreSQL is installed and running. You can download and install PostgreSQL from its official website.

Create a database and a table. For instance, let's create a simple `users` table.

```sql
CREATE DATABASE mydatabase;

\c mydatabase

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);
```

### Step 2: Setup Node.js Project

1. **Initialize a new Node.js project**

   ```bash
   mkdir myapp
   cd myapp
   npm init -y
   ```

2. **Install necessary dependencies**

   ```bash
   npm install express pg body-parser
   ```

### Step 3: Create the Node.js Application

1. **Create the main application file (`app.js`)**

   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const { Pool } = require('pg');

   const app = express();
   const port = 3000;

   const pool = new Pool({
     user: 'yourusername',
     host: 'localhost',
     database: 'mydatabase',
     password: 'yourpassword',
     port: 5432,
   });

   app.use(bodyParser.json());

   // Create
   app.post('/users', async (req, res) => {
     const { name, email } = req.body;
     try {
       const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
       res.status(201).json(result.rows[0]);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   // Read
   app.get('/users', async (req, res) => {
     try {
       const result = await pool.query('SELECT * FROM users');
       res.status(200).json(result.rows);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   app.get('/users/:id', async (req, res) => {
     const { id } = req.params;
     try {
       const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
       if (result.rows.length === 0) {
         return res.status(404).json({ error: 'User not found' });
       }
       res.status(200).json(result.rows[0]);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   // Update
   app.put('/users/:id', async (req, res) => {
     const { id } = req.params;
     const { name, email } = req.body;
     try {
       const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
       if (result.rows.length === 0) {
         return res.status(404).json({ error: 'User not found' });
       }
       res.status(200).json(result.rows[0]);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   // Delete
   app.delete('/users/:id', async (req, res) => {
     const { id } = req.params;
     try {
       const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
       if (result.rows.length === 0) {
         return res.status(404).json({ error: 'User not found' });
       }
       res.status(200).json(result.rows[0]);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   app.listen(port, () => {
     console.log(`App running on port ${port}.`);
   });
   ```

2. **Run the application**

   ```bash
   node app.js
   ```

### Step 4: Test the API

You can use tools like Postman or curl to test the CRUD operations.

- **Create a user**
  ```bash
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'
  ```

- **Read all users**
  ```bash
  curl http://localhost:3000/users
  ```

- **Read a specific user by ID**
  ```bash
  curl http://localhost:3000/users/1
  ```

- **Update a user**
  ```bash
  curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Jane Doe","email":"jane@example.com"}'
  ```

- **Delete a user**
  ```bash
  curl -X DELETE http://localhost:3000/users/1
  ```

This setup should provide you with a basic Node.js CRUD application using PostgreSQL. Adjust the configurations and expand the functionalities as needed for your specific use case.