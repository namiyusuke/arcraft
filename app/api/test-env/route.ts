// import { NextResponse } from 'next/server';

// export async function GET() {
//   const envCheck = {
//     OPENAI_API_KEY: !!process.env.OPENAI_API_KEY ? '✅ 設定済み' : '❌ 未設定',
//     SUPABASE_URL: !!process.env.SUPABASE_URL ? '✅ 設定済み' : '❌ 未設定',
//     SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY ? '✅ 設定済み' : '❌ 未設定',
//     SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ 設定済み' : '❌ 未設定',
//   };

//   const partialValues = {
//     SUPABASE_URL: process.env.SUPABASE_URL ? `${process.env.SUPABASE_URL.substring(0, 30)}...` : 'なし',
//     OPENAI_API_KEY: process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'なし',
//   };

//   return NextResponse.json({
//     message: '環境変数テスト',
//     envCheck,
//     partialValues,
//     allPresent: Object.values(envCheck).every(status => status.includes('✅')),
//   });
// }
