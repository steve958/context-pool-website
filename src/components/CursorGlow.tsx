"use client";

import { useEffect, useState, useRef } from "react";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth follow animation
    const animate = () => {
      // Lerp towards mouse position (0.1 = smooth, 0.3 = snappy)
      const lerpFactor = 0.12;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * lerpFactor;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * lerpFactor;
      
      setRenderPos({ ...glowPos.current });
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Don't render during SSR or on touch devices
  if (!mounted) return null;
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  const primaryGradient = `radial-gradient(circle, rgba(124,106,247,0.07) 0%, rgba(124,106,247,0.02) 40%, transparent 70%)`;
  const secondaryGradient = `radial-gradient(circle, rgba(124,106,247,0.1) 0%, rgba(124,106,247,0.03) 50%, transparent 70%)`;
  const accentGradient = `radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 60%)`;

  return (
    <>
      {/* Primary glow - large soft illumination */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: renderPos.x - 400,
          top: renderPos.y - 400,
          width: 800,
          height: 800,
          pointerEvents: "none",
          zIndex: 0,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: primaryGradient,
          transform: "translate3d(0,0,0)",
          willChange: "left, top",
        }}
      />
      
      {/* Secondary glow - tighter, brighter core */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: renderPos.x - 200,
          top: renderPos.y - 200,
          width: 400,
          height: 400,
          pointerEvents: "none",
          zIndex: 0,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: secondaryGradient,
          transform: "translate3d(0,0,0)",
          willChange: "left, top",
        }}
      />

      {/* Subtle accent glow - warm undertone */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: renderPos.x - 100,
          top: renderPos.y - 100,
          width: 200,
          height: 200,
          pointerEvents: "none",
          zIndex: 0,
          opacity: isVisible ? 0.7 : 0,
          transition: "opacity 0.4s ease",
          background: accentGradient,
          transform: "translate3d(0,0,0)",
          willChange: "left, top",
        }}
      />
    </>
  );
}
