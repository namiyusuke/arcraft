import { drizzle } from "drizzle-orm/libsql/web";
// まだ存在しない場合コメントアウト
import * as aiSchema from "./schemas/ai";
import * as inputSchema from "./schemas/input";
import * as articleLikesSchema from "./schemas/article-likes";

// ビルド時に環境変数がない場合はダミー値を使用
const databaseUrl = process.env.TURSO_DATABASE_URL || "http://localhost:8080";
const authToken = process.env.TURSO_AUTH_TOKEN;

export const db = drizzle({
  connection: {
    url: databaseUrl,
    authToken: authToken || "",
  },
  schema: {
    ...aiSchema,
    ...inputSchema,
    ...articleLikesSchema,
  },
});
