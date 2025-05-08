import pool from "./pool.js";

export const registerNewUser = async ({firstname, lastname, email, password}) => {
    await pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, password])
} 

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0]; 
}

export const getUserById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows[0];
}

export const getAllMessages = async () => {
    const { rows } = await pool.query("SELECT * FROM messages;");
    return rows;
}

export const getAllMessagesAndUsernames = async () => {
    const { rows } = await pool.query("SELECT messages.*, users.firstname FROM messages JOIN users ON user_id = users.id ORDER BY messages.time DESC;");
    return rows;
}

export const enterNewMessage = async (title, text, user_id) => {
    await pool.query('INSERT INTO messages (title, text, time, user_id) VALUES ($1, $2, $3, $4)', [title, text, new Date(), user_id]);
}

export const updateMembership = async (id, value) => {
    await pool.query('UPDATE users SET member = $2 WHERE id = $1', [id, value]);
}

export const updateAdminStatus = async (id, value) => {
    await pool.query('UPDATE users SET admin = $2 WHERE id = $1', [id, value]);
}

export const deleteMessage = async (id) => {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}

export const updateTitle = async (title, id) => {
    await pool.query('UPDATE messages SET title = $1, time = $3 WHERE id = $2', [title, id, new Date()])
}

export const updateText = async (text, id) => {
    await pool.query('UPDATE messages SET title = $1, time = $3 WHERE id = $2', [text, id, new Date()])
}