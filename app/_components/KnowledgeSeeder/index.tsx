// 'use client';

// import { useState } from 'react';
// import styles from './index.module.css';

// export default function KnowledgeSeeder() {
//   const [isSeeding, setIsSeeding] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSeedKnowledge = async () => {
//     setIsSeeding(true);
//     setMessage('');

//     try {
//       console.log('🚀 Sending request to /api/seed-knowledge...');

//       const response = await fetch('/api/seed-knowledge', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('📡 Response status:', response.status);
//       console.log('📡 Response headers:', response.headers);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ API Error Response:', errorText);
//         throw new Error(`API request failed with status ${response.status}: ${errorText}`);
//       }

//       const result = await response.json();
//       console.log('📦 API Result:', result);

//       if (result.success) {
//         setMessage(`✅ 成功: ${result.details.originalDocuments}個の文書を${result.details.documentChunks}個のチャンクとして追加しました`);
//       } else {
//         setMessage(`❌ エラー: ${result.error}\n詳細: ${result.details}`);
//       }
//     } catch (error) {
//       console.error('❌ Fetch Error:', error);
//       setMessage(`❌ エラー: ${error instanceof Error ? error.message : String(error)}`);
//     } finally {
//       setIsSeeding(false);
//     }
//   };

//   const handleClearKnowledge = async () => {
//     if (!confirm('すべての知識データを削除しますか？')) return;

//     setIsSeeding(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/documents', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           action: 'clear',
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setMessage('✅ すべての知識データが削除されました');
//       } else {
//         setMessage(`❌ エラー: ${result.error}`);
//       }
//     } catch (error) {
//       setMessage(`❌ エラー: ${error}`);
//     } finally {
//       setIsSeeding(false);
//     }
//   };

//   return (
//     <div className={styles.seeder}>
//       <div className={styles.header}>
//         <h3>🌱 知識ベース初期化</h3>
//         <p>namiについての基本情報をSupabaseに送信します</p>
//       </div>

//       <div className={styles.actions}>
//         <button
//           onClick={handleSeedKnowledge}
//           disabled={isSeeding}
//           className={styles.seedButton}
//         >
//           {isSeeding ? '送信中...' : '📤 namiの情報を送信'}
//         </button>

//         <button
//           onClick={handleClearKnowledge}
//           disabled={isSeeding}
//           className={styles.clearButton}
//         >
//           🗑️ 全削除
//         </button>
//       </div>

//       {message && (
//         <div className={styles.message}>
//           {message}
//         </div>
//       )}

//       <div className={styles.info}>
//         <h4>📋 送信される情報</h4>
//         <ul>
//           <li>プロフィール（基本情報）</li>
//           <li>技術スキル（Next.js、React、TypeScript等）</li>
//           <li>3Dアニメーション経験</li>
//           <li>趣味（筋トレ、読書、コーヒー）</li>
//           <li>開発思想・哲学</li>
//           <li>仕事・活動状況</li>
//         </ul>
//         <p className={styles.note}>
//           💡 これらの情報がベクトル化されてSupabaseに保存され、チャットボットが参照できるようになります
//         </p>
//       </div>
//     </div>
//   );
// }
