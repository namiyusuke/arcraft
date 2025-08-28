// import { NextRequest, NextResponse } from 'next/server';
// import { searchSimilarDocuments } from '@/app/_libs/vectorStore';
// import { getSupabaseAdmin } from '@/app/_libs/supabase';

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const query = searchParams.get('q') || 'nami';

//     // 1. Supabaseに保存されている全ドキュメント数を確認
//     const { count } = await getSupabaseAdmin()
//       .from('documents')
//       .select('*', { count: 'exact', head: true });

//     console.log(`📊 データベース内文書数: ${count}`);

//     // 2. 実際の検索を実行
//     const searchResults = await searchSimilarDocuments(query, 5);

//     // 3. 生のデータも確認
//     const { data: rawDocs, error } = await getSupabaseAdmin()
//       .from('documents')
//       .select('id, content, metadata, created_at')
//       .limit(3) as {
//         data: Array<{
//           id: string;
//           content: string;
//           metadata: any;
//           created_at: string;
//         }> | null;
//         error: any;
//       };

//     if (error) {
//       console.error('Raw data fetch error:', error);
//     }

//     return NextResponse.json({
//       query,
//       totalDocuments: count,
//       searchResults: searchResults?.map(doc => ({
//         content: doc.pageContent.substring(0, 200) + '...',
//         metadata: doc.metadata,
//         fullLength: doc.pageContent.length,
//       })) || [],
//       searchResultsCount: searchResults?.length || 0,
//       rawSample: rawDocs?.map(doc => ({
//         id: doc.id,
//         content: doc.content.substring(0, 100) + '...',
//         metadata: doc.metadata,
//         created_at: doc.created_at,
//       })) || [],
//       success: true,
//     });

//   } catch (error) {
//     console.error('Search test error:', error);
//     return NextResponse.json({
//       error: 'Search test failed',
//       details: error instanceof Error ? error.message : String(error),
//       success: false,
//     }, { status: 500 });
//   }
// }

// export async function POST() {
//   return NextResponse.json({
//     message: 'Use GET with ?q=your_search_term to test search functionality'
//   });
// }
