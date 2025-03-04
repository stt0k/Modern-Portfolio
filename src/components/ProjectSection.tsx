"use client";

import type React from "react";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  number: string;
  image: string;
  link: string;
}

const ProjectsSection: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: "DASHBOARD CRM",
      number: "01",
      image:
        "https://res.cloudinary.com/dkgt07zcg/image/upload/f_auto,q_auto/v1/Portfolio/iukeytk4pc6y0tssgxou",
      link: "https://github.com/stt0k",
    },
    {
      id: 2,
      name: "STOFLI-UI",
      number: "02",
      image:
        "https://res.cloudinary.com/dkgt07zcg/image/upload/f_auto,q_auto/v1/Portfolio/uv1gkrebrss9einrbfjd",
      link: "https://github.com/stt0k",
    },
    {
      id: 3,
      name: "FASTORDER",
      number: "03",
      image:
        "https://res.cloudinary.com/dkgt07zcg/image/upload/f_auto,q_auto/v1/Portfolio/fnkqlxtyybz7bkmz6abc",
      link: "https://github.com/stt0k",
    },
    {
      id: 4,
      name: "SPOTIFY CLON",
      number: "04",
      image:
        "https://res.cloudinary.com/dkgt07zcg/image/upload/f_auto,q_auto/v1/Portfolio/gpfsfld7paatpygkbwj3",
      link: "https://github.com/stt0k",
    },
    {
      id: 5,
      name: "PORTFOLIO",
      number: "05",
      image:
        "https://res.cloudinary.com/dkgt07zcg/image/upload/f_auto,q_auto/v1/Portfolio/tloduoq3r80jsgyihhud",
      link: "https://github.com/stt0k",
    },
  ];

  return (
    <div className="flex bg-white h-screen items-center m-0 p-0 relative rounded-t-3xl">
      <div className="w-full">
        <div className="space-y-0">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="no-link-style relative border-t border-gray-300 overflow-hidden project-button cursor-pointer block"
              onMouseEnter={() => setHoveredButton(project.id)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div
                className={`absolute inset-0 bg-black transition-all duration-500 ease-in-out ${
                  hoveredButton === project.id ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform:
                    hoveredButton === project.id
                      ? "translateY(0)"
                      : "translateY(100%)",
                }}
              />

              <div className="flex items-center py-8 px-8 md:px-16 relative z-10 gap-x-3">
                <h2
                  className={`text-5xl md:text-7xl font-bold tracking-tighter transition-colors duration-300 ${
                    hoveredButton === project.id ? "text-white" : "text-black"
                  }`}
                >
                  {project.name}
                </h2>
                <span
                  className={`text-xl md:text-2xl transition-colors duration-300 mb-7 ${
                    hoveredButton === project.id ? "text-white" : "text-black"
                  }`}
                >
                  [{project.number}]
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Image container */}
      <div className="fixed right-0 top-0 w-[50vw] h-screen pointer-events-none">
        <div className="relative w-full h-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`absolute inset-0 transition-all duration-700 ease-out p-8 ${
                hoveredButton === project.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{
                zIndex: hoveredButton === project.id ? 10 : 0,
              }}
            >
              {/* Container con animaciones */}
              <div className="relative w-full h-full bg-black overflow-hidden rounded-2xl">
                <div
                  className={`absolute inset-0 transition-transform duration-700 ease-out ${
                    hoveredButton === project.id ? "scale-100" : "scale-110"
                  }`}
                />
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredButton === project.id ? "scale-100" : "scale-110"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
