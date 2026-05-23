import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({ value, suffix = "", decimals = 0 }: AnimatedCounterProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => {
    if (decimals > 0) return v.toFixed(decimals);
    if (value >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${Math.round(v / 1_000)}K`;
    return Math.round(v).toString();
  });
  const [text, setText] = useState("0");

  useEffect(() => {
    spring.set(value);
    return display.on("change", (v) => setText(String(v)));
  }, [value, spring, display]);

  return (
    <motion.span>
      {text}
      {suffix}
    </motion.span>
  );
}
