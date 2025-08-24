"use client";
import MomentumHover from "./MomentumHover";
import styles from "./MomentumHoverDemo.module.css";

export default function MomentumHoverDemo() {
  return (
    <div className={styles.demo}>
      <h2>運動量ベースホバーエフェクト デモ</h2>
      
      <div className={styles.grid}>
        {/* 基本的な例 */}
        <MomentumHover>
          <div className={styles.card}>
            <h3>基本カード</h3>
            <p>マウスの速度と位置に基づいて慣性効果が適用されます</p>
          </div>
        </MomentumHover>

        {/* 高感度設定 */}
        <MomentumHover 
          xyMultiplier={50}
          rotationMultiplier={30}
          inertiaResistance={150}
        >
          <div className={`${styles.card} ${styles.sensitive}`}>
            <h3>高感度カード</h3>
            <p>より大きな動きと回転効果</p>
          </div>
        </MomentumHover>

        {/* 画像カード */}
        <MomentumHover 
          xyMultiplier={25}
          rotationMultiplier={15}
        >
          <div className={`${styles.card} ${styles.imageCard}`}>
            <div className={styles.imagePlaceholder}>画像</div>
            <h3>画像カード</h3>
            <p>画像付きカードでの効果</p>
          </div>
        </MomentumHover>

        {/* 低抵抗設定 */}
        <MomentumHover 
          inertiaResistance={100}
        >
          <div className={`${styles.card} ${styles.smooth}`}>
            <h3>スムーズカード</h3>
            <p>低い抵抗でより長く続く慣性効果</p>
          </div>
        </MomentumHover>
      </div>

      <div className={styles.instructions}>
        <p>💡 使用方法：各カードにマウスを素早く当てて、異なる角度と速度で試してみてください</p>
        <p>📱 この効果はタッチデバイスでは無効化されます</p>
      </div>
    </div>
  );
}