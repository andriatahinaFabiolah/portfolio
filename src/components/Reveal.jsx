import { useRef } from "react";
import { useVisible } from "../hooks/useVisible";

export function Reveal({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const v   = useVisible(ref);

  return (
    <div ref={ref} style={{
      opacity:    v ? 1 : 0,
      transform:  v ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
