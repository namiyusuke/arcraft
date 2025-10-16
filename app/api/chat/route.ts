import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
import { searchSimilarDocuments } from "@/rag-chat";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, minSimilarity = 0.3, maxResults = 3 } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "メッセージが必要です" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 最新のユーザーメッセージを取得
    const lastMessage = messages[messages.length - 1];
    console.log("[RAG API] Last message:", JSON.stringify(lastMessage, null, 2));

    // AI SDK 5.0のメッセージ形式: { text: "..." }
    let question = "";
    if (typeof lastMessage === "string") {
      question = lastMessage;
    } else if (lastMessage.text) {
      // sendMessage({ text: "..." }) の形式
      question = lastMessage.text;
    } else if (typeof lastMessage.content === "string") {
      question = lastMessage.content;
    } else if (Array.isArray(lastMessage.content)) {
      // content配列から最初のtextを取得
      const textPart = lastMessage.content.find((part: any) => part.type === "text" || typeof part === "string");
      question = typeof textPart === "string" ? textPart : textPart?.text || "";
    } else if (lastMessage.parts) {
      // parts配列から最初のtextを取得
      const textPart = lastMessage.parts.find((part: any) => part.type === "text");
      question = textPart?.text || "";
    }

    console.log("[RAG API] Extracted question:", question);

    if (!question.trim()) {
      return new Response(JSON.stringify({
        error: "質問テキストが空です",
        debug: { lastMessage }
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. 類似ドキュメントを検索
    const searchResults = await searchSimilarDocuments(question, minSimilarity, maxResults);

    // 2. コンテキストとシステムプロンプトを作成
    let systemPrompt = "";

    if (searchResults.length === 0) {
      // 関連情報が見つからない場合
      systemPrompt = `あなたは親切なアシスタントです。
ユーザーの質問に関連する具体的な情報はデータベースに見つかりませんでした。
以下のガイドラインに従って回答してください：

回答のガイドライン:
- 関連する情報が見つからなかったことを丁寧に伝えてください
- 一般的な知識で答えられる範囲で簡潔に回答してください
- より詳しい情報が必要な場合は、別の質問を提案してください
- 日本語で回答してください`;
    } else {
      // 関連情報が見つかった場合
      const context = searchResults
        .map(
          (doc, index) =>
            `【関連情報${index + 1}】(類似度: ${(doc.similarity * 100).toFixed(1)}%)\n` +
            `タイトル: ${doc.title}\n` +
            `内容: ${doc.text}\n`
        )
        .join("\n");

      systemPrompt = `あなたは親切なアシスタントです。以下の関連情報を参考に、ユーザーの質問に正確で有用な回答をしてください。

関連情報:
${context}

回答のガイドライン:
- 関連情報を基に回答してください
- 情報が不足している場合は、その旨を伝えてください
- 具体的で実用的なアドバイスを心がけてください
- 日本語で回答してください`;
    }

    // 4. UIメッセージをモデルメッセージに変換
    const modelMessages = convertToModelMessages(messages);

    // 5. streamTextでストリーミングレスポンスを返す
    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      messages: modelMessages,
    });

    // ストリーミングレスポンスとして返す
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("RAG Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: "エラーが発生しました",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
