import Menu from "@/app/_components/menu";
import styles from "./index.module.css";
import ShaderImage from "@/app/_components/shader-image";
export default function About() {
  return (
    <div className={styles.enText}>
      <Menu />
      <p className={styles.text}>I like making things. As a creator, I always aim high.</p>
      <div className={styles.introWrapper}>
        <div className="u-wrapper">
          <div className={styles.intro}>
            <div className={styles.introInner}>
              <div className={styles.introBody}>
                <p className={styles.jaText}>
                  「触れて心地いいUI」をつくることが好きです。
                  <br />
                  滑らかなアニメーションや、気づかないけれど気持ちいいインタラクションなど、“体験の質”にこだわったフロントエンド開発が得意です。
                  <br />
                  本職では制作会社のエンジニアとして、またプライベートではAttcraftというユニット活動や個人開発に取り組み、日々制作に勤しんでいます。
                  <br />
                  サウナと体を動かすことが好きです。
                </p>
              </div>
              <div className={styles.introCanvas}>
                <ShaderImage imageSrc="/sample.jpg" className={styles.snsLogo} />
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
