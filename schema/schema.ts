import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("Tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  completed:boolean("completed").default(false)
});
