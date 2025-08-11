# My Next.js Project

## プロジェクト概要
Next.js 15を使用したWebアプリケーションプロジェクト

## 技術スタック
- **フレームワーク**: Next.js 15.3.1
- **React**: 19.0.0
- **TypeScript**: 5.x
- **3D関連**: Three.js, @react-three/fiber, @react-three/drei
- **アニメーション**: GSAP
- **CMS**: microCMS
- **スタイリング**: CSS Modules

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# リンター実行
npm run lint
```

## プロジェクト構成
- `app/` - Next.js App Router
- `app/_components/` - 共通コンポーネント
  - `shader-image/` - WebGLシェーダー関連コンポーネント
- `public/` - 静的ファイル

## 開発時の注意点
- TypeScript厳密モード対応済み
- Three.js使用時は適切な型定義を確認すること
- @react-three/fiberのThreeEvent型を使用すること