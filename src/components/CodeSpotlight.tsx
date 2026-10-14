import { useEffect, useRef } from "react";

const codeLines = [
  "const developer = {",
  '  name: "Parichehr",',
  '  role: "Frontend Developer",',
  '  stack: ["React", "Next.js", "TypeScript"],',
  "};",
  "",
  "function createExperience() {",
  "  const interface = buildUI();",
  "  const motion = animate(interface);",
  "  return { interface, motion };",
  "}",
  "",
  "const app = await initializeApp();",
  "app.use(components);",
  "app.render(<Portfolio />);",
  "",
  "export default function Project() {",
  "  return <Experience />;",
  "}",
  "",
  "const styles = {",
  '  background: "#07080c",',
  '  animation: "smooth",',
  "  responsive: true,",
  "};",
  "",
  "type Project = {",
  "  title: string;",
  "  stack: string[];",
  "  creative: boolean;",
  "};",
  "",
  "const build = () => {",
  "  return createSomethingUnique();",
  "};",
  "",
  "useEffect(() => {",
  "  initializeExperience();",
  "}, []);",
  "",
  "const future = await create();",
  "if (future) deploy(future);",
];

export default function CodeSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let width = 0;
    let height = 0;
    let frame = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let isActive = false;

    // Smoothly follow the real cursor.
    let lightX = mouseX;
    let lightY = mouseY;

    const radius = 190;
    const cellWidth = 320;
    const lineHeight = 25;

    const hero = document.querySelector<HTMLElement>(".hero");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      draw();
    };

    const updateVisibility = () => {
      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom
        : 0;

      isActive = isDesktop.matches && !reducedMotion.matches &&
        heroBottom <= 80;

      canvas.style.opacity = isActive ? "1" : "0";

      if (!isActive) {
        context.clearRect(0, 0, width, height);
      } else {
        draw();
      }
    };

    const draw = () => {
      if (!context || !isActive) {
        context?.clearRect(0, 0, width, height);
        return;
      }

      context.clearRect(0, 0, width, height);

      // The code is drawn across the viewport.
      context.font = '13px "SFMono-Regular", Consolas, monospace';
      context.textBaseline = "middle";

      const columns = Math.ceil(width / cellWidth) + 1;
      const rows = Math.ceil(height / lineHeight) + 2;

      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          const lineIndex =
            (row * 7 + column * 11) % codeLines.length;

          const text = codeLines[lineIndex];

          const x = column * cellWidth + 12;
          const y = row * lineHeight + 12;

          // Subtle code colors.
          if (text.includes("const") || text.includes("function")) {
            context.fillStyle = "#ff795f";
          } else if (
            text.includes('"') ||
            text.includes("true") ||
            text.includes("false")
          ) {
            context.fillStyle = "#8bd5ff";
          } else if (
            text.includes("return") ||
            text.includes("export") ||
            text.includes("await")
          ) {
            context.fillStyle = "#c6a0f6";
          } else {
            context.fillStyle = "#8ee6b0";
          }

          context.fillText(text, x, y);
        }
      }

      // Reveal the code only inside the flashlight.
      context.globalCompositeOperation = "destination-in";

      const gradient = context.createRadialGradient(
        lightX,
        lightY,
        0,
        lightX,
        lightY,
        radius,
      );

      gradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.75)");
      gradient.addColorStop(0.75, "rgba(255, 255, 255, 0.25)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "source-over";
    };

    const animate = () => {
      frame = 0;

      if (!isActive) return;

      const easing = 0.18;

      lightX += (mouseX - lightX) * easing;
      lightY += (mouseY - lightY) * easing;

      draw();

      if (
        Math.abs(mouseX - lightX) > 0.5 ||
        Math.abs(mouseY - lightY) > 0.5
      ) {
        frame = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDesktop.matches) return;

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!frame) {
        frame = requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      updateVisibility();
    };

    const handlePreferenceChange = () => {
      updateVisibility();
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", resize);

    isDesktop.addEventListener("change", handlePreferenceChange);
    reducedMotion.addEventListener("change", handlePreferenceChange);

    resize();
    updateVisibility();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);

      isDesktop.removeEventListener("change", handlePreferenceChange);
      reducedMotion.removeEventListener("change", handlePreferenceChange);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="code-spotlight"
      aria-hidden="true"
    />
  );
}