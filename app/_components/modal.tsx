"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useModel3DStore } from "../store/model3dStore";
import AnimatedLink from "./AnimatedLink";

export default function Modal() {
  const { isScreenClicked, setIsScreenClicked, isDumbbleClicked, setIsDumbbleClicked } = useModel3DStore();
  return (
    <>
      <div className="g-btn__wrapper g-btn__wrapper--techlog">
        <div className="c-button__link-wrap">
          <AnimatedLink className="g-techlog c-button__link" href={`/techlog`}>
            techlog
          </AnimatedLink>
          {
            <button
              className="c-button c-button-back"
              onClick={() => {
                if (isScreenClicked) {
                  setIsScreenClicked(false);
                }
              }}
            >
              <span className="c-button-back-arrow"></span>
            </button>
          }
        </div>
      </div>
      <div className="g-btn__wrapper g-btn__wrapper--lifelog">
        <div className="">
          <AnimatedLink className="g-techlog c-button__link" href={`/life`}>
            lifelog
          </AnimatedLink>
          {
            <button
              className="c-button c-button-back"
              onClick={() => {
                if (isDumbbleClicked) {
                  setIsDumbbleClicked(false);
                }
              }}
            >
              <span className="c-button-back-arrow"></span>
            </button>
          }
        </div>
        {/* <div className="g-lifelog-modal">
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
        </div> */}
      </div>
    </>
  );
}
