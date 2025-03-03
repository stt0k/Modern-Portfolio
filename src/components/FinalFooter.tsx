import React from "react";

const FinalFooter = () => {
  return (
    <div className="w-full text-white py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Text */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Let's build something amazing together!
          </h2>
        </div>

        {/* START A PROJECT */}
        <div className="flex justify-center mb-40">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=espstok04@gmail.com&su=Let's%20Work%20Together!"
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer no-link-style"
          >
            <div
              className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "1px white" }}
            >
              START A
            </div>
            <div
              className="absolute top-20 md:top-24 left-0 right-0 text-6xl md:text-8xl font-bold tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "1px white" }}
            >
              PROJECT
            </div>
          </a>
        </div>

        {/* Linea */}
        <div className="w-full h-px bg-gray-800 mb-6"></div>

        {/* Redes */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white text-sm flex items-center gap-1 mb-4 md:mb-0">
            <span>Made by</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/stt0k"
              className="text-[#fee600] no-cursor-scale"
            >
              stt0k
            </a>
            <span>✨</span>
          </div>
          <div className="flex space-x-8 no-cursor-scale">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/stt0k"
              className="text-sm uppercase hover:text-gray-300"
            >
              GITHUB
            </a>
            <a href="#" className="text-sm uppercase hover:text-gray-300">
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalFooter;
