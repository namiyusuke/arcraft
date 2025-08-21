import Menu from "@/app/_components/menu";
import styles from "./index.module.css";
import ShaderImage from "@/app/_components/shader-image";
import PreviewFollower from "@/app/_components/PreviewFollower";
export default function About() {
  return (
    <div className={styles.enText}>
      <Menu />
      <p className={styles.text}>I like making things. As a creator, I always aim high.</p>
      <div className={styles.introWrapper}>
        <div className="u-wrapper--about">
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
          <div data-follower-wrap="" className="preview-container">
            <div className="preview-item__row tabelt--hide">
              <div className="preview-item__col is--large">
                <span className="preview-container__label">Name</span>
              </div>
              <div className="preview-item__col is--small">
                <span className="preview-container__label">Location</span>
              </div>
              <div className="preview-item__col is--small">
                <span className="preview-container__label">Year</span>
              </div>
              <div className="preview-item__col is--medium">
                <span className="preview-container__label">Services</span>
              </div>
            </div>
            <div data-follower-collection="" className="preview-collection">
              <div className="preview-list">
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Prism</h2>
                      </div>
                      <div className="preview-item__col is--small tablet--hide">
                        <p className="preview-item__text">Belgium</p>
                      </div>
                      <div className="preview-item__col is--small">
                        <p className="preview-item__text">2025</p>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Development</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <img
                        src="https://cdn.prod.website-files.com/6889f182607452ec007a0ae1/688a1e49a704afe5e3f4a55d_Fluid%20Abstract%20Design.avif"
                        className="preview-item__visual-img"
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Oracle</h2>
                      </div>
                      <div className="preview-item__col is--small tablet--hide">
                        <p className="preview-item__text">Australia</p>
                      </div>
                      <div className="preview-item__col is--small">
                        <p className="preview-item__text">2025</p>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Design, Development</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <img
                        src="https://cdn.prod.website-files.com/6889f182607452ec007a0ae1/688a1e2ea2b1de5d693cf173_Elegant%20Ice%20Bottle%20Display.avif"
                        className="preview-item__visual-img"
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Mosaic</h2>
                      </div>
                      <div className="preview-item__col is--small tablet--hide">
                        <p className="preview-item__text">Spain</p>
                      </div>
                      <div className="preview-item__col is--small">
                        <p className="preview-item__text">2024</p>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Development</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <img
                        src="https://cdn.prod.website-files.com/6889f182607452ec007a0ae1/688a1e2e3a3b6987bbb92dfd_Serene%20Floral%20Arrangement.avif"
                        className="preview-item__visual-img"
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Zenith</h2>
                      </div>
                      <div className="preview-item__col is--small tablet--hide">
                        <p className="preview-item__text">Japan</p>
                      </div>
                      <div className="preview-item__col is--small">
                        <p className="preview-item__text">2024</p>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Strategy, Design</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <img
                        src="https://cdn.prod.website-files.com/6889f182607452ec007a0ae1/688a1e349d92acc75bd79fa8_Minimalist%20Green%20Stools.avif"
                        className="preview-item__visual-img"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div data-follower-cursor="" className="preview-follower">
              <div data-follower-cursor-inner="" className="preview-follower__inner">
                <div className="preview-follower__label">
                  <div className="preview-follower__label-span">View case</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PreviewFollower />
    </div>
  );
}
