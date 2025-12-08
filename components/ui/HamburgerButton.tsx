"use client";

import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export function HamburgerButton({ isOpen, toggle }: HamburgerButtonProps) {
  return (
    <button
      onClick={toggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="relative z-50 w-8 h-8 flex items-center justify-center"
    >
      <motion.span
        className="absolute h-[2px] w-6 bg-black"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.span
        className="absolute h-[2px] w-6 bg-black"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.span
        className="absolute h-[2px] w-6 bg-black"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </button>
  );
}

