import { defineConfig } from "drizzle-kit";
import "dotenv/config"
export default defineConfig({
  schema: "./schema/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
