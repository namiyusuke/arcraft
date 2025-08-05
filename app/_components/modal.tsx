"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useModel3DStore } from "../store/model3dStore";

export default function Modal() {
  const { isScreenClicked, setIsScreenClicked, isDumbbleClicked, setIsDumbbleClicked } = useModel3DStore();
  return (
    <>
      <div className="g-btn__wrapper g-btn__wrapper--techlog">
        <div className="">
          <Link className="g-techlog" href={`/techlog`}>
            技術のお話を見に行く？
          </Link>
          {
            <button
              onClick={() => {
                if (isScreenClicked) {
                  setIsScreenClicked(false);
                }
              }}
            >
              カメラを戻す
            </button>
          }
        </div>
      </div>
      <div className="g-btn__wrapper g-btn__wrapper--lifelog">
        <div className="">
          <Link className="g-lifelog" href={`/life`}>
            namiさんの日常を見に行く？
          </Link>
          {
            <button
              onClick={() => {
                if (isDumbbleClicked) {
                  setIsDumbbleClicked(false);
                }
              }}
            >
              カメラを戻す
            </button>
          }
        </div>
        <div className="g-lifelog-modal">
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
          <p>namiさんは筋トレが好きです</p>
        </div>
      </div>
    </>
  );
}
