import { pool } from '../db.js';

export const getLogs = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM logs');

        const transformedRows = rows.map((obj) => {
            const fecha = new Date(obj.date);
            const fechaMenos6Horas = new Date(fecha.getTime() - (6 * 60 * 60 * 1000));
            
            return ({
                ...obj,
                date: fechaMenos6Horas.toISOString()
            })
        });

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}