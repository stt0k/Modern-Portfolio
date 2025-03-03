import React from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.1,
  className = "",
}) => {
  return (
    <div data-speed={speed} className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxSection;
