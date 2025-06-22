import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import "./globals.css";
import { unstable_ViewTransition as ViewTransition } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <ViewTransition name="cross-fade">
          <div className="g-bg-base">{children}</div>
          <Footer />
        </ViewTransition>
      </body>
    </html>
  );
}
