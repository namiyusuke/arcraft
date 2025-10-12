import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../column-helper";

export const inputSchema = sqliteTable("ai", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  ...timestamps,
});
