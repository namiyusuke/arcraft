import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';
import { getSupabaseAdmin } from './supabase';

// OpenAI埋め込みモデルの設定
const getEmbeddings = () => new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-embedding-3-small', // コスト効率の良いモデル
});

// Supabaseベクトルストアを遅延初期化
let vectorStoreInstance: SupabaseVectorStore | null = null;
export const getVectorStore = () => {
  if (!vectorStoreInstance) {
    vectorStoreInstance = new SupabaseVectorStore(getEmbeddings(), {
      client: getSupabaseAdmin(),
      tableName: 'documents',
      queryName: 'match_documents', // SQL関数作成後に有効化
    });
  }
  return vectorStoreInstance;
};

// テキスト分割器の設定
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000, // 1チャンクあたりの文字数
  chunkOverlap: 200, // チャンク間のオーバーラップ
});

/**
 * テキストドキュメントをベクトル化してSupabaseに保存
 */
export async function addDocuments(
  texts: string[],
  metadatas: Record<string, any>[] = []
) {
  try {
    // テキストを適切なサイズにチャンクに分割
    const documents: Document[] = [];
    
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const metadata = metadatas[i] || {};
      
      // テキストを分割
      const chunks = await textSplitter.splitText(text);
      
      // 各チャンクをDocument形式に変換
      chunks.forEach((chunk, chunkIndex) => {
        documents.push(
          new Document({
            pageContent: chunk,
            metadata: {
              ...metadata,
              chunkIndex,
              originalLength: text.length,
              timestamp: new Date().toISOString(),
            },
          })
        );
      });
    }

    // ベクトル化してSupabaseに保存
    await getVectorStore().addDocuments(documents);
    
    console.log(`Successfully added ${documents.length} document chunks to vector store`);
    return { success: true, documentCount: documents.length };
    
  } catch (error) {
    console.error('Error adding documents to vector store:', error);
    throw error;
  }
}

/**
 * 類似文書を検索
 */
export async function searchSimilarDocuments(
  query: string,
  k: number = 4 // 取得する類似文書の数
) {
  try {
    const results = await getVectorStore().similaritySearch(query, k);
    return results;
  } catch (error) {
    console.error('Error searching similar documents:', error);
    throw error;
  }
}

/**
 * ベクトルストアから全文書を削除（テスト用）
 */
export async function clearVectorStore() {
  try {
    const { error } = await getSupabaseAdmin()
      .from('documents')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 全てを削除
    
    if (error) throw error;
    console.log('Vector store cleared successfully');
    return { success: true };
  } catch (error) {
    console.error('Error clearing vector store:', error);
    throw error;
  }
}