import { useState, useEffect } from "react";

export function useTypewriter(words, spd = 100, delSpd = 50, pause = 1800) {
  const [text, setText] = useState("");
  const [idx,  setIdx]  = useState(0);
  const [del,  setDel]  = useState(false);

  useEffect(() => {
    const curr = words[idx];
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < curr.length) setText(curr.slice(0, text.length + 1));
        else setTimeout(() => setDel(true), pause);
      } else {
        if (text.length > 0) setText(curr.slice(0, text.length - 1));
        else { setDel(false); setIdx(i => (i + 1) % words.length); }
      }
    }, del ? delSpd : spd);
    return () => clearTimeout(t);
  }, [text, del, idx, words, spd, delSpd, pause]);

  return text;
}