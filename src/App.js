import { useState, useEffect } from "react";
import { Navbar }   from "./components/Navbar";
import { Hero }     from "./components/Hero";
import { Parcours } from "./components/Parcours";
import { Projects } from "./components/Projects";
import { Skills }   from "./components/Skills";
import { Contact }  from "./components/Contact";
import { Footer }   from "./components/Footer";

export default function App() {
  const [dark, setDark] = useState(false);

  const c = {
    bg:         dark ? "#0f172a" : "#fafaf9",
    bgAlt:      dark ? "#1e293b" : "#ffffff",
    text:       dark ? "#f1f5f9" : "#1c1917",
    textMuted:  dark ? "#94a3b8" : "#78716c",
    textHint:   dark ? "#64748b" : "#a8a29e",
    border:     dark ? "#334155" : "#e7e5e4",
    accentBg:   dark ? "#1e1b4b" : "#ede9fe",
    accentText: "#6366f1",
    skillBg:    dark ? "#1e293b" : "#f5f5f4",
    inputBg:    dark ? "#1e293b" : "#fafaf9",
  };

  useEffect(() => { document.body.style.background = c.bg; }, [dark, c.bg]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @keyframes blobA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-25px) scale(1.08)} 66%{transform:translate(-15px,15px) scale(0.95)} }
        @keyframes blobB { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(1.05)} 66%{transform:translate(20px,-10px) scale(0.97)} }
        .blob-a { animation: blobA 9s ease-in-out infinite; }
        .blob-b { animation: blobB 11s ease-in-out infinite; }
        @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .tw-cursor { display:inline-block; width:2px; height:0.85em; background:#6366f1; margin-left:3px; vertical-align:middle; animation:cursor-blink 1s step-end infinite; }
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.7);opacity:0.4} }
        .pulse-dot { animation:pulse-dot 2s ease-in-out infinite; }
        .carousel-btn:hover { opacity:1 !important; }
        .skill-card:hover img { transform: scale(1.1); }

        @media (max-width: 768px) {
          .nav-desktop   { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hero-grid     { grid-template-columns: 1fr !important; padding-top: 120px !important; }
          .hero-photo    { display: none !important; }
          .parcours-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .contact-grid-outer { grid-template-columns: 1fr !important; }
          .contact-grid  { grid-template-columns: 1fr !important; }
          .footer-inner  { flex-direction: column !important; gap: 12px !important; text-align: center; }
          .skills-grid   { grid-template-columns: 1fr 1fr !important; }
          .hero-stats    { gap: 20px !important; }
          .hero-buttons  { flex-direction: column !important; }
          .hero-buttons a, .hero-buttons button { width: 100% !important; text-align: center; box-sizing: border-box; }
        }

        .mobile-menu { display:none; position:fixed; top:68px; left:0; right:0; background:${dark?"rgba(15,23,42,0.98)":"rgba(250,250,249,0.98)"}; backdrop-filter:blur(20px); border-bottom:1px solid ${c.border}; padding:16px 6vw 24px; flex-direction:column; gap:4px; z-index:99; }
        .mobile-menu.open { display: flex; }
        .mobile-menu button { font-size:16px; color:${c.text}; cursor:pointer; font-weight:500; background:none; border:none; padding:12px 0; text-align:left; font-family:'Plus Jakarta Sans',sans-serif; border-bottom:1px solid ${dark?"#1e293b":"#f5f5f4"}; width:100%; }
        .mobile-cta { margin-top:12px; background:#6366f1 !important; color:#fff !important; border-radius:10px !important; padding:12px 0 !important; font-weight:700 !important; border:none !important; text-align:center !important; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #6366f144; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f188; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Navbar   dark={dark} setDark={setDark} c={c} />
      <Hero     dark={dark} c={c} />
      <Parcours c={c} />
      <Projects dark={dark} c={c} />
      <Skills   dark={dark} c={c} />
      <Contact  c={c} />
      <Footer   c={c} />
    </div>
  );
}