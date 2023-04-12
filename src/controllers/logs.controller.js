import { pool } from '../db.js';

// export const getLogs = async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM logs');
//         res.json(rows);
//     } catch (error) {
//         return res.status(500).json({
//             message: "Something went wrong"
//         });
//     }
// }
export const getLogs = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM logs');
        const logs = rows.map(log => ({
            ...log,
            date: new Date(log.date).toLocaleString()
        }));
        res.json(logs);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}