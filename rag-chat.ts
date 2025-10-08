import { openai } from "@ai-sdk/openai";
import { embed, generateText } from "ai";
import { db } from "./db";
import { ai } from "./db/schemas/ai";
import { desc, sql } from "drizzle-orm";

interface SearchResult {
  id: string;
  title: string;
  text: string;
  similarity: number;
}

/**
 * 質問をベクトル化して類似するドキュメントを検索する
 */
async function searchSimilarDocuments(
  question: string,
  minSimilarity: number = 0.4,
  limit: number = 3
): Promise<SearchResult[]> {
  // 質問をベクトル化
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: question,
  });

  console.log("[RAG] Environment:", process.env.NODE_ENV);
  console.log("[RAG] Database URL:", process.env.TURSO_DATABASE_URL?.substring(0, 30) + "...");

  const similarity = sql<number>`1 - vector_distance_cos(${ai.vector}, ${sql.raw(
    `vector32('[${embedding.join(",")}]')`
  )})`;

  try {
    // 類似度検索
    const results = await db
      .select({
        id: ai.id,
        title: ai.title,
        text: ai.text,
        similarity: similarity,
      })
      .from(ai)
      .where(sql`${similarity} > ${minSimilarity}`)
      .orderBy(desc(similarity))
      .limit(limit);

    console.log("[RAG] Query succeeded, results:", results.length);
    return results;
  } catch (error) {
    console.error("[RAG] Query failed");
    console.error("[RAG] Error name:", error instanceof Error ? error.name : typeof error);
    console.error("[RAG] Error message:", error instanceof Error ? error.message : String(error));
    console.error("[RAG] Full error:", JSON.stringify(error, null, 2));
    throw error;
  }
}

/**
 * 検索結果を使ってAIが回答を生成する
 */
async function generateAnswer(question: string, searchResults: SearchResult[]): Promise<string> {
  // 関連情報をコンテキストとして整理
  const context = searchResults
    .map(
      (doc, index) =>
        `【関連情報${index + 1}】(類似度: ${(doc.similarity * 100).toFixed(1)}%)\n` +
        `タイトル: ${doc.title}\n` +
        `内容: ${doc.text}\n`
    )
    .join("\n");

  // AIに回答を生成させる
  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    messages: [
      {
        role: "system",
        content: `あなたは親切なアシスタントです。以下の関連情報を参考に、ユーザーの質問に正確で有用な回答をしてください。

関連情報:
${context}

回答のガイドライン:
- 関連情報を基に回答してください
- 情報が不足している場合は、その旨を伝えてください
- 具体的で実用的なアドバイスを心がけてください
- 日本語で回答してください`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return text;
}

/**
 * RAGチャット機能のメイン関数
 */
export async function ragChat(
  question: string,
  options: {
    minSimilarity?: number;
    maxResults?: number;
    includeSearchDetails?: boolean;
  } = {}
): Promise<{
  answer: string;
  searchResults?: SearchResult[];
}> {
  try {
    const { minSimilarity = 0.3, maxResults = 3, includeSearchDetails = false } = options;

    console.log(`質問: ${question}`);
    console.log("関連情報を検索中...");

    // 1. 類似ドキュメントを検索
    const searchResults = await searchSimilarDocuments(question, minSimilarity, maxResults);

    if (searchResults.length === 0) {
      return {
        answer:
          "申し訳ございませんが、お探しの内容に関連する情報が見つかりませんでした。別の質問を試してみてください。",
        searchResults: includeSearchDetails ? searchResults : undefined,
      };
    }

    console.log(`${searchResults.length}件の関連情報が見つかりました`);

    // 2. AIが回答を生成
    console.log("回答を生成中...");
    const answer = await generateAnswer(question, searchResults);

    return {
      answer,
      searchResults: includeSearchDetails ? searchResults : undefined,
    };
  } catch (error) {
    console.error("RAGチャットエラー:", error);
    throw error;
  }
}

// 使用例とテスト
async function main() {
  const questions = [
    "Next.jsについて教えて",
    "TypeScriptの利点は何？",
    "Tursoデータベースの特徴は？",
    "Reactのフックについて",
  ];

  for (const question of questions) {
    console.log("\n" + "=".repeat(50));

    const result = await ragChat(question, {
      includeSearchDetails: true,
    });

    console.log(`\n【質問】${question}`);
    console.log(`\n【回答】\n${result.answer}`);

    if (result.searchResults) {
      console.log(`\n【参考にした情報】`);
      result.searchResults.forEach((doc, index) => {
        console.log(`${index + 1}. ${doc.title} (類似度: ${(doc.similarity * 100).toFixed(1)}%)`);
      });
    }

    console.log("\n" + "=".repeat(50));
  }
}

// スクリプトとして実行
if (require.main === module) {
  main().catch(console.error);
}
