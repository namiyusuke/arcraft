"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
export const useDrawer = () => {
  const drawerref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
    if (drawerref.current) {
      drawerref.current.style.visibility = "visible";
      gsap.to(drawerref.current, {
        clipPath: "polygon(0px 0%, 100% 0%, 100% 100%, 0px 100%)",
        duration: 0.8,
        ease: "power4.out",
      });
    }
  };

  const handleClose = () => {
    if (drawerref.current) {
      gsap.to(drawerref.current, {
        clipPath: "polygon(0px 100%, 100% 100%, 100% 100%, 0px 100%)",
        duration: 0.6,
        ease: "power1.out",
        onComplete: () => {
          setIsOpen(false);
          if (drawerref.current) drawerref.current.style.visibility = "hidden";
          if (drawerref.current) drawerref.current.style.clipPath = "polygon(0px 0%, 100% 0%, 100% 0%, 0px 0%)";
        },
      });
    }
  };
  return { drawerref, isOpen, handleClick, handleClose };
};
