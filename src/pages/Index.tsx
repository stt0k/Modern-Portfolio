"use client";

import { useEffect, useState, useRef } from "react";
import CustomCursor from "../components/CustomCursor";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import ProjectsSection from "../components/ProjectSection";
import InfiniteSlider from "@/components/infinite-slider";
import ParticleText from "@/components/ParticleText";
import SmoothScroll from "@/components/SmoothScroll";
import ParallaxSection from "@/components/ParallaxSection";
import FinalFooter from "@/components/FinalFooter";
import AnimatedText from "@/components/AnimatedText";
import ColorSection from "@/components/ColorSection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const horizontalContent = horizontalContentRef.current;

    if (!scrollContainer || !horizontalContent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(scrollContainer);

    const handleWheel = (e: WheelEvent) => {
      if (!isInView) return;

      const contentWidth = horizontalContent.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;

      if (contentWidth > containerWidth) {
        const maxScroll = contentWidth - containerWidth;
        let newScrollLeft = horizontalContent.scrollLeft + e.deltaY;

        if (newScrollLeft < 0) newScrollLeft = 0;
        if (newScrollLeft > maxScroll) newScrollLeft = maxScroll;

        if (
          (newScrollLeft === 0 && e.deltaY < 0) ||
          (newScrollLeft === maxScroll && e.deltaY > 0)
        ) {
          return;
        }

        horizontalContent.scrollLeft = newScrollLeft;
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      observer.disconnect();
    };
  }, [isInView]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <CustomCursor />
      <SmoothScroll>
        <div
          className={`transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
            <Logo />
          </div>

          {/* Main Title */}
          <ParallaxSection speed={0.05}>
            <div className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen px-3 sm:px-8 gap-y-6 sm:gap-y-20 no-cursor-scale z-10">
              <div className="w-full max-w-full">
                <div className="text-[19vw] sm:text-[20vw] font-bold leading-[0.85] tracking-tighter relative group text-center sm:text-start">
                  <div className="filled-text transition-all duration-500 ease-in-out group-hover:opacity-0">
                    PEOPLE IMAGINE
                  </div>
                  <div
                    className="outline-text absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1px white",
                    }}
                  >
                    DEVS ENGINEER
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </ParallaxSection>

          {/* Particle Text */}
          <div className="flex items-center justify-center flex-col px-3 sm:px-0 mt-[-30px] sm:mt-0">
            <ParticleText
              text="LOOK MY PROJECTS"
              fontSize={window.innerWidth < 640 ? 45 : 120}
              fontFamily="Arial, sans-serif"
              particleSize={1.5}
              particleColor="#fee600"
              particleGap={4}
              particleCount={3000}
            />
            <ParallaxSection speed={0.2}>
              <div className="flex flex-col justify-center text-center">
                <AnimatedText
                  text="This is what happens"
                  className="text-[5vw] sm:text-[2vw]"
                  staggerChildren={0.02}
                  delayOffset={0.2}
                />
                <div className="text-[5vw] sm:text-[2vw] flex justify-center items-center flex-wrap">
                  <AnimatedText
                    text="when you build with"
                    className="inline-flex"
                    staggerChildren={0.02}
                    delayOffset={0.5}
                  />
                  <AnimatedText
                    text=" passion."
                    className="inline-flex"
                    staggerChildren={0.05}
                    delayOffset={1}
                    animationDuration={0.8}
                  />
                </div>
              </div>
            </ParallaxSection>
          </div>

          {/* Projects Section + Infinite Slider + ColorSection */}
          <ParallaxSection speed={0.1} className="m-0 p-0">
            <div className="m-0 p-0">
              <ProjectsSection />
              <ColorSection />
              <InfiniteSlider />
            </div>
          </ParallaxSection>

          {/* Final Footer */}
          <ParallaxSection speed={0.02}>
            <FinalFooter />
          </ParallaxSection>
        </div>
      </SmoothScroll>
    </div>
  );
};

export default Index;
