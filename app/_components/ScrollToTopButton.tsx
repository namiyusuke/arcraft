"use client";

export default function ScrollToTopButton() {
  const handleScrollToTop = (e: any) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <a onClick={handleScrollToTop} href="#" className="back__btn">
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="#EFF1F3" />
        <path
          d="M25 18V32M25 18L31 24M25 18L19 24"
          stroke="#1E1E1E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
