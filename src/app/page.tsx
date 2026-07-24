"use client";

import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import AnimatedBackground from "../components/AnimatedBackground";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import Hero from "../components/Hero";
import DateForm from "../components/DateForm";
import type { DateFormData } from "../components/DateForm";
import SuccessScreen from "../components/SuccessScreen";
import SurpriseScreen from "../components/SurpriseScreen";
import { fireHeartConfetti } from "../lib/confetti";

/**
 * The five screens of our romantic journey:
 *  1. hero     – "Will you go on a date with me?"
 *  2. form     – Date planner form
 *  3. success  – Celebration with teddy bear
 *  4. surprise – Final romantic message
 */
type Screen = "hero" | "form" | "success" | "surprise";

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** When the user clicks Yes – celebrate and move to the form */
  const handleYes = useCallback(() => {
    fireHeartConfetti();
    // Short delay so confetti is visible before transition
    setTimeout(() => setScreen("form"), 1200);
  }, []);

  /** When the form is submitted */
  const handleFormSubmit = useCallback(async (data: DateFormData) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          date: data.date,
          time: data.time,
          location: data.location,
          message: data.message || "No message left.",
        },
        { publicKey }
      );

      setScreen("success");
    } catch (error) {
      console.error("Failed to send the date details email.", error);
      alert("I could not send the email right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  /** From success screen to final surprise */
  const handleContinue = useCallback(() => {
    setScreen("surprise");
  }, []);

  // Show floating hearts on all screens except the dark surprise screen
  const showLightBg = screen !== "surprise";

  return (
    <main className={`relative min-h-screen overflow-hidden ${showLightBg ? "" : ""}`}>
      {/* Ambient background effects (hidden on dark surprise screen) */}
      {showLightBg && (
        <>
          <AnimatedBackground />
          <FloatingHearts count={16} />
          <Sparkles count={24} />
        </>
      )}

      {/* Screen views */}
      <Hero visible={screen === "hero"} onYesClick={handleYes} />
      <DateForm visible={screen === "form"} onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      <SuccessScreen visible={screen === "success"} onContinue={handleContinue} />
      <SurpriseScreen visible={screen === "surprise"} />
    </main>
  );
}
