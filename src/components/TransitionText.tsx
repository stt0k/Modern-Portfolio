import React from "react";

interface TransitionTextProps {
  filledText: string;
  outlineText: string;
  className?: string;
}

const TransitionText: React.FC<TransitionTextProps> = ({
  filledText,
  outlineText,
  className = "",
}) => {
  return (
    <div className={`relative hover-title ${className}`}>
      <div className="filled-text">{filledText}</div>
      <div
        className="outline-text"
        style={{ color: "transparent", WebkitTextStroke: "1px white" }}
      >
        {outlineText}
      </div>
    </div>
  );
};

export default TransitionText;
