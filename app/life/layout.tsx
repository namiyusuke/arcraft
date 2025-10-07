"use client";
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import Footer from "../_components/Footer";
import { useScrollObserver } from "@/app/fooks/useScrollObserver";
import Ai from "../_components/ai";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  const { ref } = useScrollObserver("is-observer");

  return (
    <>
      <div className="g-bg-purple">
        <div className="g-bg-orange"></div>
        <Hero title="lifelog" className="text__life" />
        <Sheet>{children}</Sheet>
        <div ref={ref} className="js-observer">
          <Footer />
          <Suspense fallback={<div>Loading...</div>}>
            <NuqsAdapter>
              <Ai />
            </NuqsAdapter>
          </Suspense>
        </div>
      </div>
    </>
  );
}
