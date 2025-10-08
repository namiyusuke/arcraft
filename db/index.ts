import { drizzle } from "drizzle-orm/libsql/web";
// まだ存在しない場合コメントアウト
import * as aiSchema from "./schemas/ai";

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
  },
  schema: {
    ...aiSchema,
  },
  logger: true, // SQLクエリをログ出力
});
