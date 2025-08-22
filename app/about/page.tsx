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
            {/* <div className="preview-item__row tabelt--hide">
              <div className="preview-item__col is--large">
                <span className="preview-container__label">Name</span>
              </div>
              <div clKuuche DesignassName="preview-item__col is--small">
                <span className="preview-container__label">Location</span>
              </div>
              <div className="preview-item__col is--small">
                <span className="preview-container__label">Year</span>
              </div>
              <div className="preview-item__col is--medium">
                <span className="preview-container__label">Services</span>
              </div>
            </div> */}
            <div data-follower-collection="" className="preview-collection">
              <div className="preview-list">
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Arcraft</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Next+Three js</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/nami-portofolio.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">This is Shibajuku Sakaba.</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Astro+vanilla js</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/newyear2024.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Kuuche Design</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Astro+vanilla js+Newt</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/kuuche.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Yusuke Namikawa portfolio site</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Nuxt+MicroCMS</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/nami-portofolio.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">New Year's greeting site 2024</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">vanilla js</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/newyear2024.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">Welcome to Wombat Tours</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Astro+vanilla js</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/wombat.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
                <div data-follower-item="" className="preview-item">
                  <a href="#" className="preview-item__inner w-inline-block">
                    <div className="preview-item__row">
                      <div className="preview-item__col is--large">
                        <h2 className="preview-item__heading">WNew Year's greeting site 2023</h2>
                      </div>
                      <div className="preview-item__col is--medium">
                        <p className="preview-item__text">Astro+vanilla js</p>
                      </div>
                    </div>
                    <div data-follower-visual="" className="preview-item__visual">
                      <video
                        src="/video/newyear2023.mp4"
                        className="preview-item__visual-img"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div data-follower-cursor="" className="preview-follower">
              <div data-follower-cursor-inner="" className="preview-follower__inner">
                {/* <div className="preview-follower__label">
                  <div className="preview-follower__label-span">View case</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PreviewFollower />
    </div>
  );
}
