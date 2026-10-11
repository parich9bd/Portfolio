import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  life: number;
};

const COLORS = ["#FF5B3A", "#FF8A65", "#6EA8FF", "#FFFFFF"];

export default function EnergyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!media.matches || reducedMotion.matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let animationId = 0;
    let lastTime = 0;
    let lastSparkTime = 0;

    let mouseX = -100;
    let mouseY = -100;
    let previousX = -100;
    let previousY = -100;

    let active = false;
    let hovering = false;
    let running = true;

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];

    // Resize canvas
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Create energy particles
    const addParticle = (
      x: number,
      y: number,
      velocity: number,
    ) => {
      const angle = Math.random() * Math.PI * 2;
      const force = Math.random() * 1.8 + velocity * 0.025;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force,
        life: 1,
        size: Math.random() * 2.2 + 0.7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });

      if (particles.length > 180) {
        particles.splice(0, particles.length - 180);
      }
    };

    // Draw lightning between two points
    const addLightning = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.hypot(dx, dy);

      if (distance < 8) return;

      const segments = Math.min(9, Math.ceil(distance / 10));

      const points: Array<{ x: number; y: number }> = [
        { x: x1, y: y1 },
      ];

      for (let i = 1; i < segments; i++) {
        const progress = i / segments;

        points.push({
          x: x1 + dx * progress + (Math.random() - 0.5) * 15,
          y: y1 + dy * progress + (Math.random() - 0.5) * 15,
        });
      }

      points.push({ x: x2, y: y2 });

      ctx.save();

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      points.slice(1).forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.strokeStyle = "rgba(255, 91, 58, 0.45)";
      ctx.lineWidth = 5;
      ctx.shadowColor = "#FF5B3A";
      ctx.shadowBlur = 16;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      points.slice(1).forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.shadowColor = "#6EA8FF";
      ctx.shadowBlur = 9;
      ctx.stroke();

      ctx.restore();
    };

    // Track mouse movement
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      previousX = mouseX;
      previousY = mouseY;

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (previousX < 0 || previousY < 0) {
        previousX = mouseX;
        previousY = mouseY;
      }

      const speed = Math.hypot(
        mouseX - previousX,
        mouseY - previousY,
      );

      active = true;

      const target = event.target;

      hovering =
        target instanceof Element &&
        Boolean(
          target.closest(
            'a, button, [role="button"], input, textarea, select',
          ),
        );

      const count = Math.min(4, Math.ceil(speed / 12));

      for (let i = 0; i < count; i++) {
        const progress = (i + 1) / (count + 1);

        addParticle(
          previousX + (mouseX - previousX) * progress,
          previousY + (mouseY - previousY) * progress,
          speed,
        );
      }

      const now = performance.now();

      if (speed > 22 && now - lastSparkTime > 65) {
        addLightning(previousX, previousY, mouseX, mouseY);
        lastSparkTime = now;
      }
    };

    // Click ripple
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      ripples.push({
        x: event.clientX,
        y: event.clientY,
        radius: 0,
        life: 1,
      });

      if (ripples.length > 8) {
        ripples.shift();
      }

      for (let i = 0; i < 12; i++) {
        addParticle(event.clientX, event.clientY, 8);
      }
    };

    const onPointerLeave = () => {
      active = false;
    };

    // Animation loop
    const draw = (time: number) => {
      if (!running) return;

      animationId = requestAnimationFrame(draw);

      const delta = Math.min(
        lastTime ? (time - lastTime) / 16.67 : 1,
        2,
      );

      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Particles
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        particle.vx *= Math.pow(0.96, delta);
        particle.vy *= Math.pow(0.96, delta);

        particle.life -= 0.022 * delta;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * particle.life,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      ctx.restore();

      // Click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        ripple.radius += 3.5 * delta;
        ripple.life -= 0.035 * delta;

        if (ripple.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();

        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = ripple.life;
        ctx.strokeStyle = "#FF5B3A";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#FF5B3A";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(
          ripple.x,
          ripple.y,
          ripple.radius,
          0,
          Math.PI * 2,
        );
        ctx.stroke();

        ctx.restore();
      }

      // Sharp, visible cursor core
      if (active) {
        ctx.save();

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;

        // Soft orange glow
        const gradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          22,
        );

        gradient.addColorStop(0, "rgba(255, 91, 58, 0.18)");
        gradient.addColorStop(0.5, "rgba(255, 91, 58, 0.07)");
        gradient.addColorStop(1, "rgba(255, 91, 58, 0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 22, 0, Math.PI * 2);
        ctx.fill();

        // Clear orange ring
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#FF5B3A";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(
          mouseX,
          mouseY,
          hovering ? 10 : 7,
          0,
          Math.PI * 2,
        );
        ctx.stroke();

        // Bright white center
        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    // Pause animation while the tab is hidden
    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationId);
      } else {
        running = true;
        lastTime = 0;
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();

    window.addEventListener("resize", resize);

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });

    window.addEventListener("pointerdown", onPointerDown, {
      passive: true,
    });

    window.addEventListener("blur", onPointerLeave);

    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    animationId = requestAnimationFrame(draw);

    return () => {
      running = false;

      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("blur", onPointerLeave);

      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="energy-cursor"
      aria-hidden="true"
    />
  );
}