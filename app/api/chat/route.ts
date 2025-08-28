import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { searchSimilarDocuments } from "@/app/_libs/vectorStore";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // ユーザーの最新メッセージから関連文書を検索
    const lastUserMessage = messages[messages.length - 1].content;
    let contextInfo = "";
    let debugInfo = {
      query: lastUserMessage,
      searchResults: null as any,
      contextUsed: false,
      error: null as string | null
    };
    
    console.log(`🔍 RAG検索開始 - クエリ: "${lastUserMessage}"`);
    
    try {
      const similarDocs = await searchSimilarDocuments(lastUserMessage, 3);
      debugInfo.searchResults = similarDocs;
      
      console.log(`📊 検索結果: ${similarDocs?.length || 0}件`);
      
      if (similarDocs && similarDocs.length > 0) {
        console.log(`📊 検索結果の詳細分析:`);
        similarDocs.forEach((doc, index) => {
          console.log(`📄 文書${index + 1}:`, {
            content: doc.pageContent.substring(0, 150) + '...',
            contentLength: doc.pageContent.length,
            metadata: doc.metadata,
            // SupabaseVectorStoreは類似度スコアを返さない場合がある
          });
        });
        
        contextInfo = similarDocs
          .map((doc, index) => `[参考情報${index + 1}]\n${doc.pageContent}`)
          .join('\n\n');
        
        debugInfo.contextUsed = true;
        console.log(`✅ RAGコンテキストを生成:`);
        console.log(`   - 文書数: ${similarDocs.length}`);
        console.log(`   - 総文字数: ${contextInfo.length}`);
        console.log(`   - コンテキストプレビュー: ${contextInfo.substring(0, 200)}...`);
      } else {
        console.log('⚠️  関連文書が見つかりませんでした');
      }
    } catch (error) {
      debugInfo.error = error instanceof Error ? error.message : String(error);
      console.error('❌ Vector search error:', error);
      // エラーが発生してもチャットは継続
    }
    
    const systemMessage = contextInfo 
      ? `あなたはnamiについて詳しい親切なアシスタントです。日本語で回答してください。

重要：以下の参考情報には、ユーザーの質問に関連する重要な情報が含まれています。
この情報を必ず活用して、具体的で詳細な回答を提供してください。

参考情報：
${contextInfo}

上記の参考情報を基に、ユーザーの質問に対して具体的で詳細な回答をしてください。
参考情報に含まれる内容を積極的に使用し、「参考情報によると」や「情報によれば」などの表現を使って、
情報源を明確にしながら回答してください。`
      : 'あなたは親切なアシスタントです。日本語で回答してください。一般的な知識で回答してください。';

    console.log(`🤖 システムメッセージ (${systemMessage.length}文字):`);
    console.log(systemMessage.substring(0, 300) + '...');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    // 開発環境でのみデバッグ情報を返す
    const response: any = { message: aiResponse };
    
    if (process.env.NODE_ENV === 'development') {
      response.debug = {
        ...debugInfo,
        systemMessageLength: systemMessage.length,
        contextUsed: debugInfo.contextUsed,
        searchResultsCount: debugInfo.searchResults?.length || 0,
      };
      console.log('🐛 RAGデバッグ情報:', response.debug);
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
