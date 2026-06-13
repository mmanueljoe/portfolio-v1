"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { NAV_LINKS } from "@/lib/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: Readonly<MobileMenuProps>) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    globalThis.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      globalThis.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-ink-900/40"
      />
      <div className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-surface px-6 py-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="self-end text-on-surface"
        >
          <X size={20} />
        </button>
        <ul className="mt-8 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-body text-lg font-medium text-on-surface-muted transition-colors duration-150 hover:text-on-surface"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
