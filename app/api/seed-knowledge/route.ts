import { NextResponse } from 'next/server';
import { addDocuments } from '@/app/_libs/vectorStore';
import { namiKnowledge } from '@/app/_data/namiKnowledge';

export async function POST() {
  try {
    console.log('=== Starting to seed knowledge base ===');
    
    // 環境変数チェック
    const requiredEnvs = ['OPENAI_API_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
    for (const env of requiredEnvs) {
      if (!process.env[env]) {
        throw new Error(`Missing required environment variable: ${env}`);
      }
    }
    
    console.log('✅ Environment variables check passed');
    
    // データを整理
    const texts = namiKnowledge.map(item => item.content);
    const metadatas = namiKnowledge.map(item => ({
      ...item.metadata,
      source: 'seed_data',
      seeded_at: new Date().toISOString(),
    }));
    
    console.log(`📝 Preparing to add ${texts.length} documents...`);
    console.log('📄 全テキストサンプル:');
    texts.forEach((text, index) => {
      console.log(`  ${index + 1}: ${text.substring(0, 150)}...`);
    });
    
    console.log('🏗️ ベクトル化とSupabase保存開始...');
    
    // ベクトル化してSupabaseに保存
    const result = await addDocuments(texts, metadatas);
    
    console.log('✅ Knowledge base seeding completed successfully');
    console.log('🎯 保存結果:', result);
    
    return NextResponse.json({
      success: true,
      message: 'Knowledge base seeded successfully',
      details: {
        originalDocuments: texts.length,
        documentChunks: result.documentCount,
      }
    });
    
  } catch (error) {
    console.error('❌ Error seeding knowledge base:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed knowledge base',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // API情報を返す
  return NextResponse.json({
    endpoint: '/api/seed-knowledge',
    method: 'POST',
    description: 'Seeds the knowledge base with nami\'s information',
    data: {
      documents: namiKnowledge.length,
      categories: [...new Set(namiKnowledge.map(item => item.metadata.category))],
    }
  });
}