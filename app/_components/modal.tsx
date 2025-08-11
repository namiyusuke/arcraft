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
          <Link className="g-techlog c-button__link" href={`/techlog`}>
            技術のお話を見に行く？
          </Link>
          {
            <button
              className="c-button"
              onClick={() => {
                if (isScreenClicked) {
                  setIsScreenClicked(false);
                }
              }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#EFF1F3" />
                <path
                  d="M17.4 20.4L19.8 17H22.3L20.2 20H26.5C28.2239 20 29.8772 20.6848 31.0962 21.9038C32.3152 23.1228 33 24.7761 33 26.5C33 28.2239 32.3152 29.8772 31.0962 31.0962C29.8772 32.3152 28.2239 33 26.5 33H22L23 31H26.5C27.6935 31 28.8381 30.5259 29.682 29.682C30.5259 28.8381 31 27.6935 31 26.5C31 25.3065 30.5259 24.1619 29.682 23.318C28.8381 22.4741 27.6935 22 26.5 22H20.2L22.3 25H19.8L17.4 21.6L17 21L17.4 20.4Z"
                  fill="#1E1E1E"
                />
              </svg>
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
              className="c-button"
              onClick={() => {
                if (isDumbbleClicked) {
                  setIsDumbbleClicked(false);
                }
              }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#EFF1F3" />
                <path
                  d="M17.4 20.4L19.8 17H22.3L20.2 20H26.5C28.2239 20 29.8772 20.6848 31.0962 21.9038C32.3152 23.1228 33 24.7761 33 26.5C33 28.2239 32.3152 29.8772 31.0962 31.0962C29.8772 32.3152 28.2239 33 26.5 33H22L23 31H26.5C27.6935 31 28.8381 30.5259 29.682 29.682C30.5259 28.8381 31 27.6935 31 26.5C31 25.3065 30.5259 24.1619 29.682 23.318C28.8381 22.4741 27.6935 22 26.5 22H20.2L22.3 25H19.8L17.4 21.6L17 21L17.4 20.4Z"
                  fill="#1E1E1E"
                />
              </svg>
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
