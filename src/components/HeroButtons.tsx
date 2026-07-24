"use client";

import { motion, useAnimation } from "framer-motion";
import { useCallback, useRef, useState, useEffect } from "react";

const funnyTexts = [
  "Nope 😜",
  "Try Again 😂",
  "You almost got me 🤭",
  "Not today 😆",
  "Nice try ❤️",
  "Haha nope! 🙈",
  "Can't catch me! 🏃‍♂️",
  "Wrong button! 💅",
  "Keep trying! 😘",
  "So close! 🤏",
  "Never! 😝",
  "I'm too fast! ⚡",
  "LOL nice one 🤣",
  "Almost! 😏",
];

interface HeroButtonsProps {
  onYesClick: () => void;
}

export default function HeroButtons({ onYesClick }: HeroButtonsProps) {
  const [noText, setNoText] = useState("💔 No");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hasEscaped, setHasEscaped] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);

  /** Move the No button to a random position away from cursor & Yes button */
  const escapeNoButton = useCallback(() => {
    if (!containerRef.current || !yesBtnRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const yesBtn = yesBtnRef.current.getBoundingClientRect();
    const btnW = 160;
    const btnH = 56;

    // Try up to 20 random positions until one doesn't overlap Yes button
    let newX = 0;
    let newY = 0;
    for (let i = 0; i < 20; i++) {
      newX = Math.random() * (container.width - btnW - 40) - (container.width / 2 - btnW / 2) + 20;
      newY = Math.random() * (container.height - btnH - 40) - (container.height / 2 - btnH / 2) + 20;

      // Check overlap with Yes button (relative to container center)
      const absX = container.width / 2 + newX - btnW / 2;
      const absY = container.height / 2 + newY - btnH / 2;
      const yesRelX = yesBtn.left - container.left;
      const yesRelY = yesBtn.top - container.top;

      const overlapX = Math.abs(absX - yesRelX) < btnW + 20;
      const overlapY = Math.abs(absY - yesRelY) < btnH + 20;

      if (!(overlapX && overlapY)) break;
    }

    setNoPos({ x: newX, y: newY });
    setHasEscaped(true);
    setEscapeCount((c) => c + 1);
    setNoText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center gap-6 py-8"
      style={{ minHeight: "200px" }}
    >
      {/* Yes Button */}
      <motion.button
        ref={yesBtnRef}
        onClick={onYesClick}
        className="relative z-10 px-10 py-4 rounded-full text-white font-semibold text-lg
                   bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600
                   shadow-lg cursor-pointer glow-button"
        whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(236,72,153,0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      >
        ❤️ Yes
      </motion.button>

      {/* No Button – runs away! */}
      <motion.button
        ref={noBtnRef}
        className="relative z-10 px-10 py-4 rounded-full text-pink-600 font-semibold text-lg
                   bg-white/80 backdrop-blur-sm border-2 border-pink-200
                   shadow-md cursor-pointer select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          x: hasEscaped ? noPos.x : 0,
          ...(hasEscaped ? { y: noPos.y } : {}),
          rotate: hasEscaped ? (Math.random() > 0.5 ? 8 : -8) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
        onMouseEnter={escapeNoButton}
        onTouchStart={(e) => {
          e.preventDefault();
          escapeNoButton();
        }}
        onClick={(e) => {
          e.preventDefault();
          escapeNoButton();
        }}
        whileHover={{ scale: 1.05 }}
      >
        {noText}
      </motion.button>

      {/* Escape counter message */}
      {escapeCount > 2 && (
        <motion.p
          className="text-pink-400 text-sm mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={escapeCount}
        >
          {escapeCount > 8
            ? "Just click Yes already! 😍"
            : escapeCount > 5
            ? "The No button really doesn't want to be clicked! 😂"
            : "Hmm... that button seems shy! 🙈"}
        </motion.p>
      )}
    </div>
  );
}
