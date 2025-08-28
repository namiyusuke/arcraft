// import { createClient } from '@supabase/supabase-js';

// // 公開用クライアントを遅延初期化
// let supabaseInstance: ReturnType<typeof createClient> | null = null;
// export const getSupabase = () => {
//   if (!supabaseInstance) {
//     const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
//     const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

//     if (!url || !key) {
//       throw new Error('Supabase configuration is missing. Please check your environment variables.');
//     }

//     supabaseInstance = createClient(url, key);
//   }
//   return supabaseInstance;
// };

// // サービスロール用クライアントを遅延初期化
// let supabaseAdminInstance: ReturnType<typeof createClient> | null = null;
// export const getSupabaseAdmin = () => {
//   if (!supabaseAdminInstance) {
//     const url = process.env.SUPABASE_URL;
//     const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

//     if (!url || !key) {
//       throw new Error('Supabase admin configuration is missing. Please check your environment variables.');
//     }

//     supabaseAdminInstance = createClient(url, key, {
//       auth: {
//         autoRefreshToken: false,
//         persistSession: false,
//       },
//     });
//   }
//   return supabaseAdminInstance;
// };
