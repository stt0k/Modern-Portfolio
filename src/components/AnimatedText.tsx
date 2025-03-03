"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delayOffset?: number;
  staggerChildren?: number;
  animationDuration?: number;
}

const AnimatedText = ({
  text,
  className = "",
  once = true,
  delayOffset = 0,
  staggerChildren = 0.03,
  animationDuration = 0.5,
}: AnimatedTextProps) => {
  const [splittedText, setSplittedText] = useState<string[]>([]);
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.2,
  });

  useEffect(() => {
    const words = text.split(" ");
    const characters = words.map((word) => word.split(""));

    const result: string[] = [];
    characters.forEach((word, wordIndex) => {
      result.push(...word);
      if (wordIndex < characters.length - 1) {
        result.push(" ");
      }
    });

    setSplittedText(result);
  }, [text]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayOffset * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: animationDuration,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="inline-block">
        {splittedText.map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            className={char === " " ? "inline-block w-[0.3em]" : "inline-block"}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              willChange: "transform",
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedText;
