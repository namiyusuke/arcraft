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

    // embeddingを数値配列に変換
    const vectorArray: number[] = Array.isArray(embedding) ? embedding : Array.from(embedding as ArrayLike<number>);

    // データベースに挿入
    const result = await db.insert(ai).values({
      id: nanoid(),
      title,
      text,
      vector: vectorArray,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result;
  } catch (error) {
    throw error;
  }
}

// 使用例
async function main() {
  await insertTextWithEmbedding(
    "このサイトについて",
    "このブログはnamiのブログサイトです。技術的な内容から日常の出来事まで幅広く発信しています。"
  );
  await insertTextWithEmbedding(
    "nami(このサイトの運営者)について",
    "namiはフロントエンドエンジニアで、趣味は筋トレとサウナ巡りです。週5,6でジムに通い、ストイックな生活を送っております。"
  );
  await insertTextWithEmbedding(
    "nami(このサイトの運営者)の休みの日の過ごし方",
    "namiの休みの日のルーティンは早朝の筋トレから始まります。お昼から夜にかけてコードを書いて自主制作に励み、夜はサウナでリフレッシュします。"
  );
  await insertTextWithEmbedding(
    "attcraftについて",
    "attcraftは、このサイトの運営者であるnamiと、しがないデザイナーのくうみんさんの二人で結成したチームです。"
  );
  await insertTextWithEmbedding(
    "namiの強みについて",
    "namiの強みは、インタラクションが心地よいアニメーションを実装できることです。ユーザー体験を向上させるために、細部にまでこだわったアニメーションを提供します。"
  );
  await insertTextWithEmbedding(
    "namiの実績について",
    "namiのポートフォリオはhttps://portfolio-nami2024.netlify.app/ です。"
  );
  await insertTextWithEmbedding(
    "namiの秘密について",
    "namiの秘密は、実は左利き寄り両利きです。左手でお箸もって右手でペンを持ちます。"
  );
}

// スクリプトとして実行
if (require.main === module) {
  main().catch(console.error);
}

export { insertTextWithEmbedding };
