import { sql } from "drizzle-orm";

export const paginatorModule = async (
    page,
    limit,
    tableName ,
    // clause = "",
    // params,
    conn
  ) => {
    const offset = (page - 1) * limit;
    try {
        
        const rows=await conn.select({count:sql`count(*)`}).from(tableName)
        return {
        totalPages: Math.ceil(rows[0].count / limit),
        offset,
      };
    } catch (err) {
      throw err;
    }
  };
