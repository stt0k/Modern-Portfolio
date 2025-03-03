import React, { useEffect } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLDivElement;
    let initCursor = false;

    if (!cursor) return;

    // Función para actualizar el cursor en hover
    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, .group, [role='button'], .project-button"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseover", (event) => {
          const target = event.target as HTMLElement;
          if (!target.closest(".no-cursor-scale")) {
            cursor.classList.add("custom-cursor--link");
            gsap.to(cursor, { scale: 1.5, duration: 0.2, ease: "power2.out" });
          }
        });
        el.addEventListener("mouseout", (event) => {
          const target = event.target as HTMLElement;
          if (!target.closest(".no-cursor-scale")) {
            cursor.classList.remove("custom-cursor--link");
            gsap.to(cursor, { scale: 0.7, duration: 0.2, ease: "power2.out" });
          }
        });
      });
    };

    // Movimiento del cursor en tiempo real con GSAP
    const onMouseMove = (e: MouseEvent) => {
      if (!initCursor) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        initCursor = true;
      }
      gsap.to(cursor, { left: e.clientX, top: e.clientY, duration: 0.4 });
    };

    window.addEventListener("mousemove", onMouseMove);
    updateHoverState();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="custom-cursor" />;
};

export default CustomCursor;
