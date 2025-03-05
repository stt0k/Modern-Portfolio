import React, { useEffect, useState } from "react";

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 2;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Particle effects */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Text container */}
        <div className="ctn">
          <div className="text-pop-up-top">STOK</div>
        </div>

        {/* Loading bar */}
        <div className="relative w-96 h-1 bg-neutral-900 mt-7 overflow-hidden loading-container">
          <div
            className="h-full bg-yellow-400 rounded-none transition-all duration-300 ease-linear loading-bar"
            style={{ width: `${progress}%` }}
          />
          <div className="loading-line" />
        </div>

        {/* Loading text */}
        <div className="mt-6 flex flex-col items-center">
          <div className="text-white text-sm font-light tracking-[0.3em] loading-text">
            INITIALIZING PAGE
          </div>
          <div className="text-yellow-400 text-xs mt-2 font-mono">
            {progress.toString().padStart(3, "0")}%
          </div>
        </div>

        {/* Background grid */}
        <div className="absolute w-full h-full pointer-events-none">
          <div className="cyber-grid" />
        </div>
      </div>
    );
  }

  return null;
}

export default LoadingScreen;
