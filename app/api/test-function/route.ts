// import { NextResponse } from 'next/server';
// import { getSupabaseAdmin } from '@/app/_libs/supabase';

// export async function GET() {
//   try {
//     console.log('🔍 Supabase関数存在確認開始...');

//     // 1. match_documents関数の存在確認
//     const { data: functions, error: fnError } = await getSupabaseAdmin()
//       .from('pg_proc')
//       .select('proname, pronargs')
//       .like('proname', 'match_documents%');

//     if (fnError) {
//       console.error('❌ 関数確認エラー:', fnError);
//     }

//     // 2. テスト用のダミーベクトルで関数実行テスト
//     const dummyEmbedding = new Array(1536).fill(0.1);

//     const { data: testResult, error: testError } = await (getSupabaseAdmin() as any)
//       .rpc('match_documents', {
//         filter: {},
//         match_count: 1,
//         query_embedding: dummyEmbedding,
//       }) as {
//         data: any[] | null;
//         error: any;
//       };

//     if (testError) {
//       console.error('❌ 関数実行エラー:', testError);
//       return NextResponse.json({
//         success: false,
//         error: 'Function test failed',
//         details: testError.message,
//         functions: functions || [],
//       }, { status: 500 });
//     }

//     // 3. pg_extensionでvector拡張の確認
//     const { data: extensions, error: extError } = await getSupabaseAdmin()
//       .from('pg_extension')
//       .select('extname')
//       .eq('extname', 'vector');

//     return NextResponse.json({
//       success: true,
//       message: 'Function test completed successfully',
//       functionExists: true,
//       testResultCount: testResult?.length || 0,
//       availableFunctions: functions || [],
//       vectorExtensionInstalled: extensions && extensions.length > 0,
//       sampleResult: testResult?.[0] || null,
//     });

//   } catch (error) {
//     console.error('❌ 関数テストエラー:', error);
//     return NextResponse.json({
//       success: false,
//       error: 'Function test failed',
//       details: error instanceof Error ? error.message : String(error),
//     }, { status: 500 });
//   }
// }
