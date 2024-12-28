import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema/schema";
import "dotenv/config"
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export const db = drizzle(pool);
export const getConnection = async () => {
    const client = await pool.connect();
    const connection = drizzle(client);
    return { connection, release: () => client.release() };
  };
  
