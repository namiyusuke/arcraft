import Menu from "@/app/_components/menu";
import styles from "./index.module.css";
import ShaderImage from "@/app/_components/shader-image";
export default function About() {
  return (
    <>
      <div className={styles.wrap}>
        <Menu />
        <div className="u-wrapper" data-variant="detail">
          <div className={styles.body}>
            <div className={styles.wrapper}>
              <hgroup className={styles.title}>
                <h2 className={styles.enTitle}>privacy policy</h2>
                <p className={styles.jaText}>プライバシーポリシー</p>
              </hgroup>
              <div className={styles.introWrapper}>
                <div>
                  <section className={styles.section}>
                    <h3>基本方針</h3>
                    <p>
                      当ブログは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。
                    </p>
                    <h4>適用範囲</h4>
                    <p>
                      本プライバシーポリシーは、お客様の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
                    </p>
                    <h4>個人情報の利用目的</h4>
                    <p>当サイトは、お客様からご提供いただく情報を以下の目的の範囲内において利用します。</p>
                    <ul>
                      <li>ご本人確認のため</li>
                      <li>お問い合わせ、コメント等の確認・回答のため</li>
                      <li>サービスの提供・改善・開発・マーケティングのため</li>
                      <li>利用規約等で禁じている行為などの調査のため</li>
                      <li>その他個別に承諾いただいた目的</li>
                    </ul>
                  </section>
                  <section className={styles.section}>
                    <h3>基本方針</h3>
                    <p>
                      当ブログは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。
                    </p>
                    <h4>適用範囲</h4>
                    <p>
                      本プライバシーポリシーは、お客様の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
                    </p>
                    <h4>個人情報の利用目的</h4>
                    <p>当サイトは、お客様からご提供いただく情報を以下の目的の範囲内において利用します。</p>
                    <ul>
                      <li>ご本人確認のため</li>
                      <li>お問い合わせ、コメント等の確認・回答のため</li>
                      <li>サービスの提供・改善・開発・マーケティングのため</li>
                      <li>利用規約等で禁じている行為などの調査のため</li>
                      <li>その他個別に承諾いただいた目的</li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.copy}>©️2025 Arcraft</p>
    </>
  );
}
