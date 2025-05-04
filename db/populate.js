import { Client } from "pg";
import bcrypt from 'bcryptjs'
import { con } from "./pool.js";

const generate_users_table = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR ( 255 ),
    lastName VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    password VARCHAR (255)
);
`

const hashedPassword = await bcrypt.hash('abhi@1234', 10)

const push_users = `
INSERT INTO users (firstName, lastName, email, password)
VALUES (
    'Abhay',
    'Gupta',
    'abhi@example.com',
    '${await bcrypt.hash('abhi@1234', 10)}'
),
(
    'Ravi',
    'Sharma',
    'maker@gmail.com',
    '${await bcrypt.hash('ravi@1234', 10)}'
);
`

const generate_messages_table = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    text TEXT ,
    time TIMESTAMP,
    user_id INTEGER
);
`

const push_messages = `
INSERT INTO messages (title, text, time, user_id)
VALUES (
    'Hello',
    'Certainly first message',
    NOW(),
    1
),
(
    'Follow the instructions',
    'See and follow the instructions given by the teachers',
    NOW(),
    2
);
`


const main = async () => {
    console.log('creating...')
    const client = new Client(con)
    await client.connect()
    await client.query(generate_users_table);
    await client.query(push_users);
    await client.end();
    console.log('done');
}


const reset = async () => {
    console.log('resetting...')
    const client = new Client(con);
    await client.connect();
    await client.query('DROP TABLE IF EXISTS users;')
    await client.query("DROP TABLE IF EXISTS messages;")
    console.log('done, generating new...')
    await client.query(generate_users_table);
    await client.query(push_users);
    await client.query(generate_messages_table);
    await client.query(push_messages);
    await client.end();
    console.log('done');
}

reset()