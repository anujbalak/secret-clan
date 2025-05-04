import pool from "./pool.js";

export const registerNewUser = async ({firstname, lastname, email, password}) => {
    await pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, password])
} 

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0]; 
}