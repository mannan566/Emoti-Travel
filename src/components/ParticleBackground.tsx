import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  theme?: "ocean" | "forest" | "sunset" | "minimal";
}

export const ParticleBackground = ({ theme = "minimal" }: ParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Theme color mapping
  const getThemeColor = () => {
    switch (theme) {
      case "ocean":
        return "#3BAFDA"; // ocean blue
      case "forest":
        return "#4CAF50"; // forest green
      case "sunset":
        return "#FF7043"; // sunset orange
      default:
        return "#888"; // minimal gray
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = container.querySelectorAll<HTMLDivElement>(".earth-particle");

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;

      particles.forEach((p, i) => {
        const speed = 2 + (i % 5);
        p.style.transform = `translate(${x / speed}px, ${y / speed}px) scale(${p.dataset.scale})`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #0d0d0d, #000)", // space-like bg
      }}
    >
      {/* Earth center glow */}
      <div className="absolute left-1/2 top-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/60 to-green-400/40 blur-3xl opacity-50 animate-pulse" />

      {/* Particles orbiting */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="earth-particle absolute rounded-full"
          data-scale={(0.3 + Math.random() * 1.2).toFixed(2)}
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: getThemeColor(),
            opacity: 0.5 + Math.random() * 0.5,
            boxShadow: `0 0 ${2 + Math.random() * 6}px ${getThemeColor()}`,
            borderRadius: "50%",
            transition: "transform 0.2s ease-out",
          }}
        />
      ))}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};
