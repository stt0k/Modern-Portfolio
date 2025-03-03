import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex justify-between px-6 items-center">
      <div className="text-white text-sm flex items-center gap-1">
        <span>MADE BY</span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/stt0k"
          className="text-[#fee600]"
        >
          STOK
        </a>
      </div>
      <div className="text-white text-right text-sm">
        <div>A CREATIVE DEVELOPER</div>
        <div>WHO TRANSFORMS IDEAS</div>
        <div>INTO USER EXPERIENCES</div>
      </div>
    </div>
  );
};

export default Footer;
