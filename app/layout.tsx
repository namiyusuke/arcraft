import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import "./globals.css";
// import TransitionComponent from "@/app/TransitionComponent";
import { unstable_ViewTransition as ViewTransition } from "react";
import { LenisProvider } from "./lenis-provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <LenisProvider>
          <Header />
          {/* <ViewTransition> */}
          {/* <TransitionComponent> */}
          <div className="g-bg-base">{children}</div>
          {/* </TransitionComponent> */}
          <Footer />
          {/* </ViewTransition> */}
        </LenisProvider>
      </body>
    </html>
  );
}
