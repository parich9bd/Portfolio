import { useEffect, useRef } from "react";

/**
 * Flashlight code reveal.
 * Faint code is painted once on an offscreen canvas. A soft circular
 * "light" that follows the cursor reveals it. It only shows after the
 * hero has scrolled away (About section and below).
 */

const codeLines = [
  "const developer = {",
  '  name: "Parichehr",',
  '  role: "Frontend Developer",',
  '  stack: ["React", "Next.js", "TypeScript"],',
  "};",
  "",
  "function createExperience() {",
  "  const ui = buildUI();",
  "  const motion = animate(ui);",
  "  return { ui, motion };",
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

// Colors follow the site palette (accent orange, scene blue, muted ink).
const COLORS = {
  keyword: "#ff5b3a",
  string: "#6ea8ff",
  bool: "#ffb199",
  call: "#f2f3f7",
  ident: "#c3c8d8",
  other: "#8a90a6",
  gutter: "#5b6177",
};

// 1 comment, 2 string, 3 keyword, 4 boolean, 5 function call,
// 6 identifier, 7 whitespace, 8 anything else
const TOKEN =
  /(\/\/.*$)|("[^"]*"|'[^']*'|`[^`]*`)|\b(const|let|function|return|export|default|await|type|if|import|from|new)\b|\b(true|false)\b|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_$][\w$]*)|(\s+)|(.)/g;

const FONT = '12px ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const RADIUS = 230; // flashlight size
const EASING = 0.16; // how smoothly the light follows the cursor
const COLUMN_WIDTH = 400;
const LINE_HEIGHT = 24;
const SHOW_AFTER_HERO_PX = 80; // hero bottom must be above this to activate

export default function CodeSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const buffer = document.createElement("canvas");
    const bufferCtx = buffer.getContext("2d");
    if (!bufferCtx) return;
    const bctx = bufferCtx;

    const hero = document.querySelector<HTMLElement>(".hero");

    let width = 0;
    let height = 0;
    let frame = 0;
    let isActive = false;

    let mouseX = -1000;
    let mouseY = -1000;
    let lightX = -1000;
    let lightY = -1000;

    /* Paint the code once (offscreen). Cheap to redraw every frame. */
    const paintCode = (dpr: number) => {
      buffer.width = Math.round(width * dpr);
      buffer.height = Math.round(height * dpr);

      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, width, height);
      bctx.font = FONT;
      bctx.textBaseline = "middle";

      const charWidth = bctx.measureText("M").width;
      const columns = Math.ceil(width / COLUMN_WIDTH) + 1;
      const rows = Math.ceil(height / LINE_HEIGHT) + 2;

      for (let column = 0; column < columns; column++) {
        // Every column starts at a different line, so it reads like real files.
        const start = (column * 9) % codeLines.length;

        for (let row = 0; row < rows; row++) {
          const text = codeLines[(start + row) % codeLines.length];
          if (!text) continue;

          const x = column * COLUMN_WIDTH + 16;
          const y = row * LINE_HEIGHT + 14;

          bctx.fillStyle = COLORS.gutter;
          bctx.fillText(String(row + 1).padStart(2, "0"), x, y);

          let cursorX = x + charWidth * 4;

          for (const match of text.matchAll(TOKEN)) {
            const token = match[0];

            if (match[7]) {
              cursorX += charWidth * token.length;
              continue;
            }

            bctx.fillStyle = match[1]
              ? COLORS.gutter
              : match[2]
                ? COLORS.string
                : match[3]
                  ? COLORS.keyword
                  : match[4]
                    ? COLORS.bool
                    : match[5]
                      ? COLORS.call
                      : match[6]
                        ? COLORS.ident
                        : COLORS.other;

            bctx.fillText(token, cursorX, y);
            cursorX += charWidth * token.length;
          }
        }
      }
    };

    /* Each frame: copy the code, keep only what the light touches. */
    const draw = () => {
      if (!isActive) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(buffer, 0, 0, width, height);

      // Mask: the code stays visible only inside the light circle.
      ctx.globalCompositeOperation = "destination-in";
      const mask = ctx.createRadialGradient(
        lightX,
        lightY,
        0,
        lightX,
        lightY,
        RADIUS,
      );
      mask.addColorStop(0, "rgba(0, 0, 0, 1)");
      mask.addColorStop(0.4, "rgba(0, 0, 0, 0.72)");
      mask.addColorStop(0.75, "rgba(0, 0, 0, 0.22)");
      mask.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = mask;
      ctx.fillRect(0, 0, width, height);

      // A very soft warm glow so it feels like a real light.
      ctx.globalCompositeOperation = "source-over";
      const glow = ctx.createRadialGradient(
        lightX,
        lightY,
        0,
        lightX,
        lightY,
        RADIUS * 1.1,
      );
      glow.addColorStop(0, "rgba(255, 91, 58, 0.10)");
      glow.addColorStop(1, "rgba(255, 91, 58, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      frame = 0;
      if (!isActive) return;

      lightX += (mouseX - lightX) * EASING;
      lightY += (mouseY - lightY) * EASING;

      draw();

      if (Math.abs(mouseX - lightX) > 0.5 || Math.abs(mouseY - lightY) > 0.5) {
        frame = requestAnimationFrame(animate);
      }
    };

    const requestFrame = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const updateVisibility = () => {
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;

      isActive =
        desktop.matches &&
        !reducedMotion.matches &&
        heroBottom <= SHOW_AFTER_HERO_PX;

      // Fading is handled by the CSS transition on .code-spotlight.
      canvas.style.opacity = isActive ? "1" : "0";

      if (isActive) requestFrame();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      paintCode(dpr);
      updateVisibility();
      draw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!desktop.matches) return;

      mouseX = event.clientX;
      mouseY = event.clientY;

      // Not active yet (still in the hero): follow instantly,
      // so the light doesn't slide in from the corner later.
      if (!isActive) {
        lightX = mouseX;
        lightY = mouseY;
        return;
      }

      requestFrame();
    };

    const handlePointerLeave = () => {
      // Cursor left the window: push the light off-screen smoothly.
      mouseX = -RADIUS * 2;
      mouseY = -RADIUS * 2;
      requestFrame();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    desktop.addEventListener("change", updateVisibility);
    reducedMotion.addEventListener("change", updateVisibility);

    resize();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      desktop.removeEventListener("change", updateVisibility);
      reducedMotion.removeEventListener("change", updateVisibility);

      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="code-spotlight" aria-hidden="true" />
  );
}