import { drizzle } from "drizzle-orm/libsql/web";
// まだ存在しない場合コメントアウト
import * as aiSchema from "./schemas/ai";
import * as inputSchema from "./schemas/input";
import * as articleLikesSchema from "./schemas/article-likes";

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
  },
  schema: {
    ...aiSchema,
    ...inputSchema,
    ...articleLikesSchema,
  },
});
