import { useEffect, useRef } from "react";
/**
 * Watery / blurred cursor trail.
 * Renders an absolutely-positioned canvas that fills its nearest
 * positioned parent. Parent should be `relative overflow-hidden`.
 */
export function CursorTrail({
  color = "rgba(201, 168, 76, 0.55)", // gold
}: {
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    type Drop = { x: number; y: number; r: number; life: number; max: number };
    const drops: Drop[] = [];
    let mouse: { x: number; y: number } | null = null;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse = { x, y };
      drops.push({
        x,
        y,
        r: 18 + Math.random() * 22,
        life: 0,
        max: 60 + Math.random() * 30,
      });
      if (drops.length > 120) drops.splice(0, drops.length - 120);
    };
    const onLeave = () => {
      mouse = null;
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.life += 1;
        const t = d.life / d.max;
        if (t >= 1) {
          drops.splice(i, 1);
          continue;
        }
        const radius = d.r * (1 + t * 1.6);
        const alpha = (1 - t) * 0.9;
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, radius);
        grad.addColorStop(0, color.replace(/[\d.]+\)$/, `${alpha})`));
        grad.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (mouse) {
        const radius = 80;
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          radius,
        );
        grad.addColorStop(0, color.replace(/[\d.]+\)$/, "0.35)"));
        grad.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [color]);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ filter: "blur(18px)", mixBlendMode: "screen" }}
    />
  );
}