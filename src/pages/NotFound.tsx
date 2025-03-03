import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bubble = document.createElement("div");
      bubble.className = "bubble";

      const x = e.pageX;
      const y = e.pageY;
      bubble.style.left = x + "px";
      bubble.style.top = y + "px";

      const size = Math.random() * 100;
      bubble.style.width = 1 + size + "px";
      bubble.style.height = 1 + size + "px";

      document.body.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 1100);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="not-found-container">
      <div className="p-5 z-[9999] text-center">
        <h1 className="text-8xl font-bold mb-4 not-found-text animate-float">
          404
        </h1>
        <p className="text-2xl not-found-text mb-6 animate-pulse-subtle">
          Oops! Page not found
        </p>
        <Link
          to="/"
          className="home-button text-[#fee600] hover:text-[#fff5a0]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
