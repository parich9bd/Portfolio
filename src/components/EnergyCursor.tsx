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

type Lightning = {
  points: { x: number; y: number }[];
  life: number;
  color: string;
};

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

const COLORS = ["#FF5B3A", "#FF8A65", "#6EA8FF", "#FFFFFF"];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function EnergyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const pointerMedia = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerMedia.matches || reducedMotion.matches) return;

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
    const lightnings: Lightning[] = [];
    const trail: TrailPoint[] = [];

    // ----------------------------------------
    // Canvas setup
    // ----------------------------------------

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

    // ----------------------------------------
    // Energy particles
    // ----------------------------------------

    const addParticle = (x: number, y: number, power = 1, color?: string) => {
      const angle = Math.random() * Math.PI * 2;
      const force = random(0.5, 2.5) * power;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force,
        life: 1,
        size: random(0.8, 2.8),
        color: color ?? COLORS[Math.floor(Math.random() * COLORS.length)],
      });

      if (particles.length > 220) {
        particles.splice(0, particles.length - 220);
      }
    };

    // ----------------------------------------
    // Lightning generator
    // ----------------------------------------

    const createLightning = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      const distance = Math.hypot(x2 - x1, y2 - y1);

      if (distance < 12) return;

      const segments = Math.min(12, Math.ceil(distance / 8));

      const points: { x: number; y: number }[] = [{ x: x1, y: y1 }];

      for (let i = 1; i < segments; i++) {
        const progress = i / segments;

        points.push({
          x: x1 + (x2 - x1) * progress + random(-13, 13),
          y: y1 + (y2 - y1) * progress + random(-13, 13),
        });
      }

      points.push({ x: x2, y: y2 });

      lightnings.push({
        points,
        life: 1,
        color: Math.random() > 0.5 ? "#FF5B3A" : "#6EA8FF",
      });

      if (lightnings.length > 12) {
        lightnings.shift();
      }
    };

    // ----------------------------------------
    // Mouse movement
    // ----------------------------------------

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

      const dx = mouseX - previousX;
      const dy = mouseY - previousY;
      const speed = Math.hypot(dx, dy);

      active = true;

      const target = event.target;

      hovering =
        target instanceof Element &&
        Boolean(
          target.closest('a, button, [role="button"], input, textarea, select'),
        );

      // Smooth energy trail
      if (speed > 1) {
        trail.push({
          x: mouseX,
          y: mouseY,
          life: 1,
        });
      }

      if (trail.length > 24) {
        trail.shift();
      }

      // Generate particles along the movement
      const count = Math.min(5, Math.ceil(speed / 8));

      for (let i = 0; i < count; i++) {
        const progress = (i + 1) / (count + 1);

        addParticle(
          previousX + dx * progress,
          previousY + dy * progress,
          Math.min(2, speed / 20),
        );
      }

      // Lightning appears during fast movements
      const now = performance.now();

      if (speed > 24 && now - lastSparkTime > 75) {
        createLightning(previousX, previousY, mouseX, mouseY);

        lastSparkTime = now;
      }
    };

    // ----------------------------------------
    // Click explosion
    // ----------------------------------------

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const x = event.clientX;
      const y = event.clientY;

      ripples.push({
        x,
        y,
        radius: 2,
        life: 1,
      });

      if (ripples.length > 8) {
        ripples.shift();
      }

      // Explosion
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30 + random(-0.2, 0.2);
        const power = random(2, 7);

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * power,
          vy: Math.sin(angle) * power,
          life: 1,
          size: random(1.2, 3.2),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      // Radial lightning burst
      for (let i = 0; i < 4; i++) {
        const angle = random(0, Math.PI * 2);
        const distance = random(25, 65);

        createLightning(
          x,
          y,
          x + Math.cos(angle) * distance,
          y + Math.sin(angle) * distance,
        );
      }

      if (particles.length > 220) {
        particles.splice(0, particles.length - 220);
      }
    };

    // ----------------------------------------
    // Draw smooth energy trail
    // ----------------------------------------

    const drawTrail = (delta: number) => {
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.045 * delta;

        if (trail[i].life <= 0) {
          trail.splice(i, 1);
        }
      }

      if (trail.length < 2) return;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Outer glow
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const current = trail[i];
        const next = trail[i + 1];

        const midX = (current.x + next.x) / 2;
        const midY = (current.y + next.y) / 2;

        ctx.quadraticCurveTo(current.x, current.y, midX, midY);
      }

      const last = trail[trail.length - 1];

      ctx.lineTo(last.x, last.y);
      ctx.strokeStyle = "rgba(255, 91, 58, 0.35)";
      ctx.lineWidth = 8;
      ctx.shadowColor = "#FF5B3A";
      ctx.shadowBlur = 18;
      ctx.stroke();

      // Bright inner trail
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }

      ctx.strokeStyle = "rgba(110, 168, 255, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#6EA8FF";
      ctx.shadowBlur = 10;
      ctx.stroke();

      ctx.restore();
    };

    // ----------------------------------------
    // Draw lightning
    // ----------------------------------------

    const drawLightning = (delta: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = lightnings.length - 1; i >= 0; i--) {
        const lightning = lightnings[i];

        lightning.life -= 0.09 * delta;

        if (lightning.life <= 0) {
          lightnings.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = lightning.life;

        ctx.beginPath();
        ctx.moveTo(lightning.points[0].x, lightning.points[0].y);

        lightning.points.slice(1).forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = lightning.color;
        ctx.lineWidth = 4;
        ctx.shadowColor = lightning.color;
        ctx.shadowBlur = 18;
        ctx.stroke();

        // White electric core
        ctx.beginPath();
        ctx.moveTo(lightning.points[0].x, lightning.points[0].y);

        lightning.points.slice(1).forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.stroke();
      }

      ctx.restore();
    };

    // ----------------------------------------
    // Main animation
    // ----------------------------------------

    const draw = (time: number) => {
      if (!running) return;

      animationId = requestAnimationFrame(draw);

      const delta = Math.min(lastTime ? (time - lastTime) / 16.67 : 1, 2);

      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      drawTrail(delta);
      drawLightning(delta);

      // Particle physics + magnetic attraction
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.hypot(dx, dy);

        // Nearby particles react to the cursor
        if (active && distance > 8 && distance < 130) {
          const force = (1 - distance / 130) * 0.12;

          p.vx += (dx / distance) * force * delta;
          p.vy += (dy / distance) * force * delta;
        }

        p.x += p.vx * delta;
        p.y += p.vy * delta;

        p.vx *= Math.pow(0.965, delta);
        p.vy *= Math.pow(0.965, delta);

        p.life -= 0.019 * delta;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        ripple.radius += 4 * delta;
        ripple.life -= 0.035 * delta;

        if (ripple.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();

        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = ripple.life;
        ctx.strokeStyle = "#FF5B3A";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#FF5B3A";
        ctx.shadowBlur = 16;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // Cursor core
      if (active) {
        ctx.save();

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;

        // Soft glow
        const gradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          26,
        );

        gradient.addColorStop(
          0,
          hovering ? "rgba(110, 168, 255, 0.28)" : "rgba(255, 91, 58, 0.22)",
        );

        gradient.addColorStop(0.5, "rgba(255, 91, 58, 0.06)");
        gradient.addColorStop(1, "rgba(255, 91, 58, 0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 26, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.strokeStyle = hovering ? "#6EA8FF" : "#FF5B3A";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, hovering ? 12 : 7, 0, Math.PI * 2);
        ctx.stroke();

        // White core
        ctx.fillStyle = "#FFFFFF";

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    // ----------------------------------------
    // Pause when tab is hidden
    // ----------------------------------------

    const onPointerLeave = () => {
      active = false;
    };

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
    <canvas ref={canvasRef} className="energy-cursor" aria-hidden="true" />
  );
}
