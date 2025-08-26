"use client";

import MouseStalker from "../_components/MouseStalker";

export default function MarqueeDemo() {
  return (
    <>
      <MouseStalker />
      <div style={{ padding: "2rem", minHeight: "100vh", background: "#f0f0f0" }}>
        <h1>マーキーエフェクト デモページ</h1>
        
        <div style={{ marginTop: "2rem" }}>
          <h2>基本的な使用方法</h2>
          <p>以下の要素にマウスを重ねると、マーキーエフェクトが表示されます：</p>
          
          <div style={{ display: "grid", gap: "2rem", marginTop: "2rem" }}>
            <div 
              data-cursor-marquee-text="プロジェクト詳細を見る"
              style={{
                padding: "2rem",
                background: "white",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <h3>プロジェクト A</h3>
              <p>このプロジェクトにマウスを重ねてみてください</p>
            </div>
            
            <div 
              data-cursor-marquee-text="もっと詳しく見る"
              style={{
                padding: "2rem",
                background: "white",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <h3>プロジェクト B</h3>
              <p>別のマーキーテキストが表示されます</p>
            </div>
            
            {/* TODO(human) */}
            {/* 
              ここに追加のデモ要素を実装してください。
              以下の要件を満たすデモ項目を3つ追加してください：
              
              1. 長いテキストのマーキー（20文字以上）
              2. 短いテキストのマーキー（5文字以下）
              3. 画像と組み合わせたマーキー
              
              各要素には data-cursor-marquee-text 属性と
              適切なスタイリングを追加してください。
            */}
            
            <div style={{ marginTop: "2rem" }}>
              <h2>実装方法</h2>
              <div style={{ background: "white", padding: "2rem", borderRadius: "8px" }}>
                <h3>HTML属性</h3>
                <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`<div data-cursor-marquee-text="表示したいテキスト">
  <!-- コンテンツ -->
</div>`}
                </pre>
                
                <h3>React コンポーネント</h3>
                <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`import MouseStalker from "./_components/MouseStalker";

export default function MyPage() {
  return (
    <>
      <MouseStalker />
      {/* あなたのコンテンツ */}
    </>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}