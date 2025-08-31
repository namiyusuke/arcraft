// import ScreenCanvas from "./_components/ScreenCanvas";
// import { Experience } from "./_components/Experience";
import Menu from "@/app/_components/menu";
import Model3D from "./_components/Model3D";
import Link from "next/link";
export default async function Home({ title, discription }: { title?: string; discription?: string }) {
  return (
    <>
      <Menu />
      <Model3D />
      <div className="home__menu--sp">
        <ul>
          <li className="home__menu-item">
            <Link className="home__menu-link" href="/techlog">
              techlog
            </Link>
          </li>
          <li className="home__menu-item">
            <Link className="home__menu-link" href="/life">
              lifelog
            </Link>
          </li>
          <li className="home__menu-item">
            <Link className="home__menu-link" href="/about">
              about
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
