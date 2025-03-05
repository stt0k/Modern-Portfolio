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
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        particle.className = "dust-particle";

        const x = e.pageX + (Math.random() * 20 - 10);
        const y = e.pageY + (Math.random() * 20 - 10);

        const size = Math.random() * 5 + 2;

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.opacity = (Math.random() * 0.6 + 0.4).toString();

        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 1500);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      const particles = document.querySelectorAll(".dust-particle");
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="not-found-container">
      <div className="p-5 z-[9999] text-center">
        <h1 className="text-8xl font-bold mb-4 not-found-text glitch-text">
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
