import React, { useEffect, useRef } from "react";

interface ParticleProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleColor?: string;
  particleGap?: number;
  particleCount?: number;
}

class Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  size: number;
  color: string;
  baseX: number;
  baseY: number;
  density: number;
  ease: number;
  initialX: number;
  initialY: number;
  initialProgress: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.originX = x;
    this.originY = y;
    // Posiciones iniciales aleatorias para la animación de entrada
    this.initialX = Math.random() * window.innerWidth;
    this.initialY = Math.random() * window.innerHeight;
    this.x = this.initialX;
    this.y = this.initialY;
    this.size = size;
    this.color = color;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 30 + 1;
    this.ease = Math.random() * 0.2 + 0.05;
    this.initialProgress = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update(
    mouse: { x: number; y: number; isOverText: boolean },
    isLoading: boolean
  ) {
    // Animación inicial
    if (isLoading) {
      this.initialProgress += 0.02;
      if (this.initialProgress > 1) this.initialProgress = 1;

      this.x =
        this.initialX + (this.baseX - this.initialX) * this.initialProgress;
      this.y =
        this.initialY + (this.baseY - this.initialY) * this.initialProgress;
      return;
    }

    // Solo aplicar la interacción del mouse cuando está sobre el área del texto
    if (mouse.isOverText) {
      // Calcular distancia entre partícula y mouse
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 80;

      // Crear fuerza direccional
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;

      // Distancia máxima, pasada esta distancia no hay ningún efecto
      const force = (maxDistance - distance) / maxDistance;

      // Si la distancia es menor que el mouse aplicar fuerza
      if (distance < maxDistance) {
        this.x -= forceDirectionX * force * this.density;
        this.y -= forceDirectionY * force * this.density;
      } else {
        // Si no hay interacción, volver lentamente a la posición original
        if (this.x !== this.baseX) {
          const dx = this.baseX - this.x;
          this.x += dx * this.ease;
        }
        if (this.y !== this.baseY) {
          const dy = this.baseY - this.y;
          this.y += dy * this.ease;
        }
      }
    } else {
      // Si el mouse no está sobre el área del texto, volver a la posición original
      if (this.x !== this.baseX) {
        const dx = this.baseX - this.x;
        this.x += dx * this.ease;
      }
      if (this.y !== this.baseY) {
        const dy = this.baseY - this.y;
        this.y += dy * this.ease;
      }
    }
  }
}

const ParticleText: React.FC<ParticleProps> = ({
  text = "LOOK MY PROJECTS",
  fontSize = 100,
  fontFamily = "Arial",
  particleSize = 2,
  particleColor = "#fee600",
  particleGap = 4,
  particleCount = 2000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, isOverText: false });
  const loadingRef = useRef(true);
  const textBoundsRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Función para obtener los píxeles del texto
  const getTextPixels = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Medir el texto para calcular sus límites
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize;

    // Calcular posición centrada
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Establecer los límites del texto
    textBoundsRef.current = {
      x: centerX - textWidth / 2,
      y: centerY - textHeight / 2,
      width: textWidth,
      height: textHeight,
    };

    // Dibujar el texto
    ctx.fillText(text, centerX, centerY);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  // Crear partículas basadas en los píxeles del texto
  const createParticles = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    const particles: Particle[] = [];
    const pixels = getTextPixels(ctx, canvas);
    const data = pixels.data;

    // Limitar el número de partículas
    for (let y = 0; y < canvas.height; y += particleGap) {
      for (let x = 0; x < canvas.width; x += particleGap) {
        const index = (y * canvas.width + x) * 4;
        if (data[index] > 128 && particles.length < particleCount) {
          particles.push(new Particle(x, y, particleSize, particleColor));
        }
      }
    }

    return particles;
  };

  const checkMouseOverText = (mouseX: number, mouseY: number) => {
    const { x, y, width, height } = textBoundsRef.current;

    // Márgenes para mejorar la detección
    const margin = fontSize * 0.4;

    return (
      mouseX >= x - margin &&
      mouseX <= x + width + margin &&
      mouseY >= y - margin &&
      mouseY <= y + height + margin
    );
  };

  // Loop de animación
  const animate = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    particles: Particle[]
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isLoading = loadingRef.current;

    particles.forEach((particle) => {
      particle.update(mouseRef.current, isLoading);
      particle.draw(ctx);
    });

    // Después de un tiempo, desactivar el modo de carga
    if (
      isLoading &&
      particles.length > 0 &&
      particles[0].initialProgress >= 1
    ) {
      loadingRef.current = false;
    }

    requestIdRef.current = requestAnimationFrame(() =>
      animate(ctx, canvas, particles)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Restablecer el estado de carga para la animación inicial
    loadingRef.current = true;

    // Ajustar tamaño dinámico del canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.min(window.innerHeight * 0.6, fontSize * 6); // Mayor altura en móvil

      particlesRef.current = createParticles(ctx, canvas);
    };
    // Configurar los event listeners
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const bounds = canvasRef.current.getBoundingClientRect(); // Obtener la posición del canvas en la pantalla

      const mouseX = e.clientX - bounds.left; // Ajustar la coordenada X
      const mouseY = e.clientY - bounds.top; // Ajustar la coordenada Y

      mouseRef.current = {
        x: mouseX,
        y: mouseY,
        isOverText: checkMouseOverText(mouseX, mouseY),
      };
    };

    // Inicializar
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mouseMoveHandler);

    // Comenzar la animación
    requestIdRef.current = requestAnimationFrame(() =>
      animate(ctx, canvas, particlesRef.current)
    );

    // Limpieza
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [
    fontSize,
    fontFamily,
    text,
    particleSize,
    particleColor,
    particleGap,
    particleCount,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto sm:h-screen max-h-[60vh]"
    />
  );
};

export default ParticleText;
