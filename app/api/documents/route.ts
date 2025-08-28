// import { NextRequest, NextResponse } from 'next/server';
// import { addDocuments, clearVectorStore } from '@/app/_libs/vectorStore';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { action, documents } = body;

//     if (action === 'add' && documents) {
//       // 文書を追加
//       const texts = documents.map((doc: any) => doc.content);
//       const metadatas = documents.map((doc: any) => doc.metadata || {});

//       const result = await addDocuments(texts, metadatas);

//       return NextResponse.json({
//         success: true,
//         message: `${result.documentCount} document chunks added successfully`,
//         documentCount: result.documentCount,
//       });

//     } else if (action === 'clear') {
//       // 全文書を削除（開発・テスト用）
//       await clearVectorStore();

//       return NextResponse.json({
//         success: true,
//         message: 'All documents cleared from vector store',
//       });

//     } else {
//       return NextResponse.json(
//         { error: 'Invalid action or missing documents' },
//         { status: 400 }
//       );
//     }

//   } catch (error) {
//     console.error('Error in documents API:', error);
//     return NextResponse.json(
//       { error: 'Internal server error', details: String(error) },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   // 簡単なヘルスチェック
//   return NextResponse.json({
//     message: 'Documents API is running',
//     endpoints: {
//       POST: {
//         add: 'Add documents to vector store',
//         clear: 'Clear all documents (dev only)',
//       },
//     },
//   });
// }
