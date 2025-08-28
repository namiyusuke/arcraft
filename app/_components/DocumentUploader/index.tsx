// 'use client';

// import { useState } from 'react';
// import styles from './index.module.css';

// export default function DocumentUploader() {
//   const [documents, setDocuments] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleUpload = async () => {
//     if (!documents.trim()) {
//       setMessage('文書を入力してください');
//       return;
//     }

//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/documents', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           action: 'add',
//           documents: [
//             {
//               content: documents,
//               metadata: {
//                 uploadedAt: new Date().toISOString(),
//                 source: 'manual_upload',
//               },
//             },
//           ],
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setMessage(`✅ 成功: ${result.documentCount}個の文書チャンクが追加されました`);
//         setDocuments('');
//       } else {
//         setMessage(`❌ エラー: ${result.error}`);
//       }
//     } catch (error) {
//       setMessage(`❌ エラー: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClear = async () => {
//     if (!confirm('すべての文書を削除しますか？')) return;

//     setIsLoading(true);
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
//         setMessage('✅ すべての文書が削除されました');
//       } else {
//         setMessage(`❌ エラー: ${result.error}`);
//       }
//     } catch (error) {
//       setMessage(`❌ エラー: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.uploader}>
//       <div className={styles.header}>
//         <h3>📚 知識ベース管理</h3>
//         <p>チャットボットに学習させたい文書を入力してください</p>
//       </div>

//       <div className={styles.inputSection}>
//         <textarea
//           value={documents}
//           onChange={(e) => setDocuments(e.target.value)}
//           placeholder="ここに文書を入力してください...&#10;&#10;例：&#10;namiはフロントエンドエンジニアです。&#10;Next.js、React、TypeScriptが得意で、Three.jsを使った3Dアニメーションも制作できます。&#10;趣味は筋トレ、読書、コーヒーです。"
//           className={styles.textarea}
//           rows={10}
//           disabled={isLoading}
//         />
//       </div>

//       <div className={styles.actions}>
//         <button
//           onClick={handleUpload}
//           disabled={isLoading || !documents.trim()}
//           className={styles.uploadButton}
//         >
//           {isLoading ? '処理中...' : '📤 文書を追加'}
//         </button>
//         <button
//           onClick={handleClear}
//           disabled={isLoading}
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
//         <h4>💡 使い方</h4>
//         <ul>
//           <li>文書は自動的に適切なサイズに分割されます</li>
//           <li>追加後、チャットボットがその情報を参照できるようになります</li>
//           <li>類似性検索により、関連する情報が自動的に活用されます</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
