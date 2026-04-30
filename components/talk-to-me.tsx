"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AGENT_EMBED_URL =
  "http://localhost:3000/a/jiten-mohanty-s-business-i6g0";

export default function TalkToMe() {
  const [open, setOpen] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBubbleVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const dismissBubble = () => setBubbleVisible(false);

  const openModal = () => {
    dismissBubble();
    setOpen(true);
  };

  return (
    <>
      {/* Floating widget — fixed bottom-right */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {bubbleVisible && (
            <motion.div
              key="bubble"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-[260px] rounded-2xl rounded-br-sm bg-background border border-border shadow-lg px-4 py-3 pr-8 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={openModal}
              role="button"
              aria-label="Talk to Jiten's AI"
            >
              <p className="text-sm font-medium leading-snug">
                <span className="mr-1">👋</span> Hi! You can talk directly
                to <span className="text-primary">Jiten</span>.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tap to start a voice call.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissBubble();
                }}
                aria-label="Dismiss"
                className="absolute top-1.5 right-1.5 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {/* tail */}
              <span className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 bg-background border-r border-b border-border" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={openModal}
          aria-label="Talk to Jiten's AI assistant"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary text-primary-foreground shadow-[0_12px_40px_rgba(0,0,0,0.18)] flex items-center justify-center overflow-visible"
        >
          {/* pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
          <span className="absolute inset-0 rounded-full ring-2 ring-primary/30" />

          {/* Agent SVG — friendly headset bot */}
          <svg
            viewBox="0 0 64 64"
            className="relative h-8 w-8 sm:h-9 sm:w-9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* headset arc */}
            <path
              d="M14 34c0-10 8-18 18-18s18 8 18 18"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* head */}
            <rect
              x="18"
              y="22"
              width="28"
              height="24"
              rx="8"
              fill="currentColor"
              fillOpacity="0.18"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            {/* eyes */}
            <circle cx="27" cy="34" r="2.4" fill="currentColor" />
            <circle cx="37" cy="34" r="2.4" fill="currentColor" />
            {/* smile */}
            <path
              d="M27 40c1.6 1.6 3.4 2.4 5 2.4s3.4-.8 5-2.4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* ear cups */}
            <rect x="11" y="32" width="6" height="10" rx="2" fill="currentColor" />
            <rect x="47" y="32" width="6" height="10" rx="2" fill="currentColor" />
            {/* mic boom */}
            <path
              d="M47 42v4a4 4 0 0 1-4 4h-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="35" cy="50" r="2" fill="currentColor" />
          </svg>
        </motion.button>
      </div>

      {/* Modal with embedded iframe */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3">
            <DialogTitle className="text-base sm:text-lg">
              Talk to Jiten&apos;s AI
            </DialogTitle>
            <p className="text-xs text-muted-foreground">
              Powered by Gemini Live · No signup · 9 min/call
            </p>
          </DialogHeader>

          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <iframe
              src={AGENT_EMBED_URL}
              allow="microphone"
              width="380"
              height="640"
              title="Talk to Jiten's AI assistant"
              className="block w-full h-[560px] sm:h-[640px]"
              style={{
                border: 0,
                borderRadius: "12px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                maxWidth: "100%",
              }}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Microphone access required. If you can&apos;t see the widget,
              your browser may have blocked it — try Chrome or Safari on a
              non-incognito tab.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
