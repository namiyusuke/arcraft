import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";
import { timestamps } from "../column-helper";

export const articleLikesSchema = sqliteTable(
  "article_likes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    articleId: text("article_id").notNull(),
    userIdentifier: text("user_identifier").notNull(),
    ...timestamps,
  },
  (t) => ({
    userIdentifierUnique: unique().on(t.articleId, t.userIdentifier),
  })
);
