// import { NextResponse } from 'next/server';
// import { addDocuments } from '@/app/_libs/vectorStore';

// export async function POST() {
//   try {
//     console.log('🧪 シンプルなテストデータを追加します...');

//     // 非常にシンプルなテストデータ
//     const testTexts = [
//       'namiはフロントエンドエンジニアです',
//       'namiはNext.jsが得意です',
//       'namiは筋トレが趣味です'
//     ];

//     const testMetadatas = testTexts.map((text, index) => ({
//       source: 'simple_test',
//       test_id: index + 1,
//       added_at: new Date().toISOString(),
//     }));

//     console.log('📝 テストデータ:');
//     testTexts.forEach((text, index) => {
//       console.log(`  ${index + 1}: ${text}`);
//     });

//     const result = await addDocuments(testTexts, testMetadatas);

//     console.log('✅ テストデータ追加完了');
//     console.log('📊 結果:', result);

//     return NextResponse.json({
//       success: true,
//       message: 'Simple test data added successfully',
//       details: {
//         textsAdded: testTexts.length,
//         chunks: result.documentCount,
//         testTexts,
//       }
//     });

//   } catch (error) {
//     console.error('❌ テストデータ追加エラー:', error);
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to add simple test data',
//       details: error instanceof Error ? error.message : String(error),
//     }, { status: 500 });
//   }
// }
