const express= require('express');
const app=express();
const port=9000;
app.use(express.json());
const cors=require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');
 
const connection = mysql.createConnection({
    host: "128.199.122.4",
    user: "root",
    password: "phearakboyloy",
    database: "ecommerce",
});
 
connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Database connect successfully');
  }
});


const options = {
    origin: ['http://localhost:3000','http://localhost:8080'],
}

// app.get('/api/api/categories',cors(),(req,res)=>{
//     try {
//         const data = await connection.promise().query(
//           `SELECT *  from categories;`
//         );
//         res.status(202).json({
//           users: data[0],
//         });
//       } catch (err) {
//         res.status(500).json({
//           message: err,
//         });
//       }
// });

// app.post('/api/api/categories',cors(),(req,res)=>{
//     try {
//         const { name } = req.body;
//         const [{ insertId }] = await connection.promise().query(
//           `INSERT INTO catgories (name) 
//               VALUES (?)`,
//           [name]
//         );
//         res.status(202).json({
//           message: "Catgories Created",
//         });
//       } catch (err) {
//         res.status(500).json({
//           message: err,
//         });
//       }
// });

app.get('/api/categories', (request, response) => {
  connection.query('SELECT * FROM categories', (error, data) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error retrieving users');
    } else {
      response.send(data);
    }
  });
});

app.get('/api/categories/:id', (request, response) => {
  const { id } = request.params;
  connection.query('SELECT * FROM categories WHERE id = ?', [id], (error, data) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error retrieving users');
    } else {
      response.send(data);
    }
  });
});
 
app.post('/api/categories', (request, response) => {
  const { name } = request.body;
  connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error creating categories');
    } else {
      response.send(`${name} created successfully`);
    }
  });
});
 
app.put('/api/categories/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.body;
  connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error updating categories');
    } else {
      response.send('categories updated successfully');
    }
  });
});
 
app.delete('/api/categories/:id', (request, response) => {
  const { id } = request.params;
  connection.query('DELETE FROM categories WHERE id = ?', [id], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error deleting categories');
    } else {
      response.send('Categories deleted successfully');
    }
  });
});


app.listen(port, () =>{
    console.log('Server started: '+`http://0.0.0.0:${port}`);
})