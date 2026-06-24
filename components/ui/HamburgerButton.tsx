"use client";

import { motion } from "framer-motion";
import { useUiStyle } from "@/components/providers/UiStyleProvider";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export function HamburgerButton({ isOpen, toggle }: HamburgerButtonProps) {
  const { uiStyle } = useUiStyle();
  const isLight = uiStyle === "light";
  const strokeColor = isLight ? "#fff" : "#000";

  return (
    <button
      onClick={toggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="relative z-50 flex h-8 w-8 items-center justify-center"
    >
      <motion.span
        className="absolute h-[2px] w-6 transition-colors duration-300"
        style={{ backgroundColor: strokeColor }}
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.span
        className="absolute h-[2px] w-6 transition-colors duration-300"
        style={{ backgroundColor: strokeColor }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.span
        className="absolute h-[2px] w-6 transition-colors duration-300"
        style={{ backgroundColor: strokeColor }}
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </button>
  );
}
