// src/hooks/useTyping.ts — streams a string character-by-character.
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useTyping(text: string, speed = 12) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setOutput("");
    setDone(false);
    if (!text) {
      setDone(true);
      return;
    }
    if (reduced) {
      setOutput(text);
      setDone(true);
      return;
    }
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        if (timer.current) clearInterval(timer.current);
        setDone(true);
      }
    }, speed);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [text, speed, reduced]);

  return { output, done };
}
