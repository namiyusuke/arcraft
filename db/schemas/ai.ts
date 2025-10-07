import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../column-helper";
import { customType } from "drizzle-orm/sqlite-core";
const float32Array = customType<{
  data: number[];
  config: { dimensions: number };
  configRequired: true;
  driverData: Buffer;
}>({
  dataType(config) {
    return `F32_BLOB(${config.dimensions})`;
  },
  fromDriver(value: Buffer) {
    return Array.from(new Float32Array(value.buffer));
  },
  toDriver(value: number[]) {
    return sql.raw(`vector32('[${value.join(",")}]')`);
  },
});
export const ai = sqliteTable("ai", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  vector: float32Array("vector", { dimensions: 1536 }),
  ...timestamps,
});
