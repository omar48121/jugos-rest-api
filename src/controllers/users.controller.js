import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { format } from 'mysql2';
import { pool } from '../db.js';

export const createUser = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const sqlSearch = "SELECT * FROM users WHERE email = ?";
  const search_query = format(sqlSearch, [email]);
  const sqlInsert = "INSERT INTO users VALUES (0,?,?,?,?)";
  const insert_query = format(sqlInsert, [email, name, lastName, hashedPassword]);
  const result = await pool.query(search_query);
  if (result[0].length != 0) {
    console.log("--> User already exists");
    res.sendStatus(409);
  }
  else {
    const result = await pool.query(insert_query);
    console.log("--> Created new User");
    console.log(result[0].insertId);
    res.sendStatus(201);
    const sqlInsert = "INSERT INTO logs (userId, description) VALUES (?, ?);";
    const sqlInsertQuery = format(sqlInsert, [result[0].insertId, 'Usuario registrado']);
    const result2 = await pool.query(sqlInsertQuery);
  }
}

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
}

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const sqlSearch = 'SELECT * FROM users WHERE email = ?';
  const search_query = format(sqlSearch, [email]);
  const result = await pool.query(search_query);

  if (result[0].length === 0) {
    console.log('--> User does not exist');
    res.sendStatus(404);
  } else {
    const hashedPassword = result[0][0].password;
    if (await bcrypt.compare(password, hashedPassword)) {
      const user = { email: result[0][0].email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      console.log('--> Login Successful');
      res.json({ accessToken, message: 'success' });
      const sqlInsert = "INSERT INTO logs (userId, description) VALUES (?, ?);";
      const sqlInsertQuery = format(sqlInsert, [result[0][0].userId, 'Inicio de sesión']);
      const result2 = await pool.query(sqlInsertQuery);
    } else {
      console.log('--> Password Incorrect');
      res.json({ message: 'password incorrect' });
    }
  }
};

export const logoutUser = async (req, res) => {
  const { email } = req.body;
  const sqlSearch = 'SELECT * FROM users WHERE email = ?';
  const search_query = format(sqlSearch, [email]);
  const result = await pool.query(search_query);

  if (result[0].length === 0) {
    console.log('--> User does not exist');
    res.sendStatus(404);
  } else {
    const sqlInsert = "INSERT INTO logs (userId, description) VALUES (?, ?);";
    const sqlInsertQuery = format(sqlInsert, [result[0][0].userId, 'Sesión finalizada']);
    const result2 = await pool.query(sqlInsertQuery);
    res.sendStatus(200);
  }
}