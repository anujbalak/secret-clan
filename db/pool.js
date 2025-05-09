import pg from 'pg';
import 'dotenv/config'

const { Pool } = pg;

export const remote_con = {
    connectionString: process.env.REMOTE_DATABASE_URL
}

export const con = {
    host: process.env.LOCAL_HOST,
    database: process.env.LOCAL_DATABASE,
    user: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASSWORD,
    port: process.env.LOCAL_PORT,
}

const pool = new Pool(remote_con)

export default pool;