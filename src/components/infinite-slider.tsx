"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";

const InfiniteSlider: React.FC = () => {
  const text = "FRONTEND — BACKEND — UI — EXPERIENCES — ";
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Obtener el ancho real del contenido
      const width = containerRef.current.scrollWidth;
      setContentWidth(width);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#fee600] shadow-2xl shadow-[#fee600] m-0 p-0">
      <div className="relative flex">
        <div
          ref={containerRef}
          className="animate-scroll flex whitespace-nowrap"
          style={
            {
              "--content-width": `${contentWidth}px`,
            } as React.CSSProperties
          }
        >
          <div className="flex">
            <span className="text-black text-[8vw] font-bold tracking-tighter mx-4">
              {text}
            </span>
            <span className="text-black text-[8vw] font-bold tracking-tighter mx-4">
              {text}
            </span>
            <span className="text-black text-[8vw] font-bold tracking-tighter mx-4">
              {text}
            </span>
          </div>
        </div>
        <div
          className="absolute top-0 left-0 animate-scroll2 flex whitespace-nowrap"
          style={
            {
              "--content-width": `${contentWidth}px`,
            } as React.CSSProperties
          }
        >
          <div className="flex">
            <span className="text-black text-[8vw] font-bold tracking-tighter mx-4">
              {text}
            </span>
            <span className="text-black text-[8vw] font-bold tracking-tighter mx-4">
              {text}
            </span>
            <span className="text-black text-[8vw] font-bold tracking-tighter mx-4">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
