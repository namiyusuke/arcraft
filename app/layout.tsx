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
      <head>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              (function(d) {
                var config = {
                  kitId: 'vfo5azs',
                  scriptTimeout: 3000,
                  async: true
                },
                h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
              })(document);
            `,
          }}
        />
      </head>
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
