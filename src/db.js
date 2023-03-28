import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'vup.h.filess.io',
    database: 'jugosnaty_strongmine',
    port: '3306',
    user: 'jugosnaty_strongmine',
    password: 'd12f1f2428cf4dce0dda150f1d28fda10db970c5'
});
/* export const pool = createPool({
    host: '127.0.0.1',
    database: 'jugosnaty_strongmine',
    port: '3306',
    user: 'root',
    password: 'omar4812'
}); */