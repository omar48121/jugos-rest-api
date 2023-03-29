import { pool } from '../db.js';

export const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export const getProduct = async (req, res) => {
    const id = req.params.id;
    
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', id);
    
        if (rows.length <= 0) return res.status(404).json({
            message: 'Product not found'
        });
    
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export const createProduct = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)', [name, price, description, imageUrl]);
        res.send({
            id: rows.insertId,
            name,
            price,
            description,
            imageUrl
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, imageUrl } = req.body;

    try {
        const [result] = await pool.query('UPDATE products SET name = IFNULL(?, name), price = IFNULL(?, price), description = IFNULL(?, description), imageUrl = IFNULL(?, imageUrl) WHERE id = ?', [name, price, description, imageUrl, id]);
    
        if (result.affectedRows == 0) return res.status(404).json({
            message: "Product not found"
        });
    
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', id);
    
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', id);
        
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Couldn't delete, product not found"
        });
    
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}