import React, { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const previousScrollY = useRef<number>(0);
  const currentScrollY = useRef<number>(0);
  const scrollSpeed = 0.05;

  const smoothScrolling = () => {
    currentScrollY.current +=
      (window.scrollY - currentScrollY.current) * scrollSpeed;

    if (scrollableRef.current) {
      scrollableRef.current.style.transform = `translate3d(0, -${currentScrollY.current}px, 0)`;
    }

    const parallaxElements = document.querySelectorAll("[data-speed]");
    parallaxElements.forEach((element) => {
      const speed = parseFloat((element as HTMLElement).dataset.speed || "0");
      const yPos = -(currentScrollY.current * speed);
      (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    previousScrollY.current = currentScrollY.current;
    requestRef.current = requestAnimationFrame(smoothScrolling);
  };

  useEffect(() => {
    const setBodyHeight = () => {
      if (scrollableRef.current) {
        document.body.style.height = `${
          scrollableRef.current.getBoundingClientRect().height
        }px`;
      }
    };

    requestRef.current = requestAnimationFrame(smoothScrolling);
    setBodyHeight();

    window.addEventListener("resize", setBodyHeight);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", setBodyHeight);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="fixed top-0 left-0 w-full h-screen overflow-hidden"
    >
      <div ref={scrollableRef} className="absolute top-0 left-0 w-full">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
