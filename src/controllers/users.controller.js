import bcrypt from 'bcrypt';
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
        console.log("------> User already exists");
        res.sendStatus(409);
    }
    else {
        const result = await pool.query(insert_query);
        console.log("-----> Created new User");
        console.log(result[0].insertId);
        res.sendStatus(201);
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
    const email = req.body.email;
    const password = req.body.password;
    const sqlSearch = "SELECT * FROM users WHERE email = ?";
    const search_query = format(sqlSearch, [email]);
    const result = await pool.query(search_query);
    if (result[0].length == 0) {
        console.log("--------> User does not exist")
        res.sendStatus(404)
    } else {
        console.log(result[0][0].password);
        const hashedPassword = result[0][0].password;
        if (await bcrypt.compare(password, hashedPassword)) {
            console.log("--------> Login Successful")
            res.send(`${email} is logged in!`)
        }
        else {
            console.log("--------> Password Incorrect")
            res.send("Password incorrect!")
        }
    }
}