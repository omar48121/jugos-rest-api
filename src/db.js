import { createPool } from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js';

/* export const pool = createPool({
    host: DB_HOST,
    database: DB_DATABASE,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD
}); */
export const pool = createPool({
    host: '127.0.0.1',
    database: 'jugosnaty_strongmine',
    port: '3306',
    user: 'root',
    password: 'omar4812'
});