"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useUiStyle } from "@/components/providers/UiStyleProvider";

export interface MobileMenuItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  toggle: () => void;
  items: MobileMenuItem[];
}

export function MobileMenu({ isOpen, toggle, items }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const { setUiStyle, setAutoMode } = useUiStyle();

  useEffect(() => {
    if (isOpen) {
      setAutoMode(false);
      setUiStyle("dark");
    } else {
      setAutoMode(true);
      setUiStyle("light");
    }
  }, [isOpen, setAutoMode, setUiStyle]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggle();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, toggle]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    menu.addEventListener("keydown", handleTabKey);
    return () => menu.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    toggle();

    const hash = href.startsWith("/#") ? href.replace("/", "") : href;

    if (pathname === "/" && hash.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-8 text-center"
          >
            {items.map((item, index) => (
              <Link
                key={item.label}
                ref={index === 0 ? firstItemRef : null}
                href={item.href}
                onClick={(event) => handleLinkClick(event, item.href)}
                className="text-3xl font-semibold tracking-tight text-black transition-opacity hover:opacity-60 focus:outline-none focus:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
