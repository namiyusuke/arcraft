import "dotenv/config";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { db } from "./db";
import { ai } from "./db/schemas/ai";
import { nanoid } from "nanoid";

async function insertTextWithEmbedding(title: string, text: string) {
  try {
    // テキストを埋め込みベクトルに変換
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: text,
    });

    // データベースに挿入
    const result = await db.insert(ai).values({
      id: nanoid(),
      title,
      text,
      vector: embedding,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("データが正常に挿入されました:", { title, textLength: text.length });
    return result;
  } catch (error) {
    console.error("エラーが発生しました:", error);
    throw error;
  }
}

// 使用例
async function main() {
  await insertTextWithEmbedding(
    "naminkawa yuusukeについて",
    "naminkawa yuusukeは、Next.jsを使用してフルスタックアプリケーションを構築する開発者です。"
  );

  await insertTextWithEmbedding(
    "このサイトについて",
    "このサイトは、naminkawa yuusukeが開発したフルスタックアプリケーションのデモです。"
  );

  await insertTextWithEmbedding(
    "naminkawa",
    "naminkawa yuusukeは、SQLiteベースの分散データベースであるTursoを使用して、エッジでの高速アクセスを実現します。ベクトル検索もサポートしています。"
  );
}

// スクリプトとして実行
if (require.main === module) {
  main().catch(console.error);
}

export { insertTextWithEmbedding };
