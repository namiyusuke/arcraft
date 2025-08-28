import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/_libs/supabase';

export async function GET() {
  try {
    console.log('🔍 Supabaseデータベース調査開始...');

    // 1. テーブル存在確認
    const { data: tableExists, error: tableError } = await getSupabaseAdmin()
      .from('documents')
      .select('count', { count: 'exact', head: true });

    if (tableError) {
      console.error('❌ テーブルアクセスエラー:', tableError);
      return NextResponse.json({
        success: false,
        error: 'Table access error',
        details: tableError.message,
      }, { status: 500 });
    }

    console.log('✅ documentsテーブル存在確認: OK');

    // 2. 全データ数確認
    const { count } = await getSupabaseAdmin()
      .from('documents')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 総レコード数: ${count}`);

    // 3. 実際のデータ取得（最初の5件）
    const { data: docs, error: dataError } = await getSupabaseAdmin()
      .from('documents')
      .select('id, content, metadata, embedding, created_at')
      .limit(5) as {
        data: Array<{
          id: string;
          content: string;
          metadata: any;
          embedding: number[] | null;
          created_at: string;
        }> | null;
        error: any;
      };

    if (dataError) {
      console.error('❌ データ取得エラー:', dataError);
      return NextResponse.json({
        success: false,
        error: 'Data fetch error',
        details: dataError.message,
      }, { status: 500 });
    }

    // 4. データ詳細分析
    const analysis = docs?.map(doc => ({
      id: doc.id,
      contentLength: doc.content?.length || 0,
      contentPreview: doc.content?.substring(0, 200) + '...',
      fullContent: doc.content, // フル内容も確認
      hasMetadata: !!doc.metadata,
      metadata: doc.metadata,
      hasEmbedding: !!doc.embedding,
      embeddingLength: doc.embedding ? doc.embedding.length : 0,
      embeddingPreview: doc.embedding ? doc.embedding.slice(0, 5) : null,
      created_at: doc.created_at,
    })) || [];

    console.log('📋 データベース詳細分析:');
    analysis.forEach((item, index) => {
      console.log(`文書${index + 1}:`, {
        id: item.id,
        contentLength: item.contentLength,
        hasEmbedding: item.hasEmbedding,
        embeddingLength: item.embeddingLength,
      });
    });

    return NextResponse.json({
      success: true,
      summary: {
        totalDocuments: count,
        documentsWithContent: analysis.filter(d => d.contentLength > 0).length,
        documentsWithEmbedding: analysis.filter(d => d.hasEmbedding).length,
        averageContentLength: analysis.reduce((sum, d) => sum + d.contentLength, 0) / (analysis.length || 1),
      },
      sampleDocuments: analysis,
      rawFirst: docs?.[0] || null,
    });

  } catch (error) {
    console.error('❌ データベース調査エラー:', error);
    return NextResponse.json({
      success: false,
      error: 'Database investigation failed',
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}