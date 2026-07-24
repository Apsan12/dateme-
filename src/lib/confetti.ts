import confetti from "canvas-confetti";

/** Fire a heart-themed confetti burst */
export function fireHeartConfetti() {
  // Left burst
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 80,
    origin: { x: 0, y: 0.7 },
    colors: ["#ec4899", "#f43f5e", "#d8b4fe", "#fda4af", "#fce7f3"],
    shapes: ["circle"],
    scalar: 1.3,
  });

  // Right burst
  confetti({
    angle: 120,
    particleCount: 60,
    spread: 80,
    origin: { x: 1, y: 0.7 },
    colors: ["#ec4899", "#f43f5e", "#d8b4fe", "#fda4af", "#fce7f3"],
    shapes: ["circle"],
    scalar: 1.3,
  });

  // Center burst
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ec4899", "#f43f5e", "#d8b4fe", "#fda4af", "#fce7f3", "#fbbf24"],
      shapes: ["circle"],
      scalar: 1.5,
      gravity: 0.8,
    });
  }, 300);
}
