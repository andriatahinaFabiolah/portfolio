import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

/* ─────────────────────────────────────────────────────────────
   DATA — mis à jour d'après ton CV
───────────────────────────────────────────────────────────── */

const ROLES = [
  "Full Stack Developer",
  "React.js Specialist",
  "Node.js Back-end Dev",
  "Disponible · Stage & Alternance",
];

const skills = {
  "Frontend":        ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS"],
  "Backend":         ["Node.js", "Express.js", "API REST"],
  "Base de données": ["MySQL", "PostgreSQL"],
  "Outils":          ["Git", "GitHub", "VS Code"],
};

const projects = [
  {
    id: 1, number: "01",
    title: "Gestion de Matériel",
    category: "Full Stack",
    badge: "Stage · Ministère des Transports",
    icon: "💻",
    tech: ["React", "Node.js", "Express", "MySQL"],
    description:
      "Application de suivi en temps réel du matériel informatique — affectation aux directions, automatisation des processus internes et optimisation de la gestion des équipements de l'institution.",
    accent: "#6366f1",
    link: "https://github.com/andriatahinaFabiolah/gestion-materiel",
    image: "/project-materiel.PNG",
  },
  {
    id: 2, number: "02",
    title: "Banking App",
    category: "Backend",
    badge: null,
    icon: "🏦",
    tech: ["PHP", "MySQL", "Triggers"],
    description:
      "Supervision des virements bancaires automatisés via triggers MySQL. Interfaces distinctes admin & client avec historique complet des transactions et gestion des flux financiers.",
    accent: "#0ea5e9",
    link: "https://github.com/andriatahinaFabiolah/Banking_app",
    image: "/project-banking.PNG",
  },
  {
    id: 3, number: "03",
    title: "Knapsack DP",
    category: "Algorithmique",
    badge: null,
    icon: "🎒",
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "Visualisation interactive de l'algorithme du sac à dos — programmation dynamique O(n·W). Outil pédagogique pour comprendre et explorer les fondamentaux algorithmiques.",
    accent: "#f59e0b",
    link: "https://github.com/andriatahinaFabiolah/knapsack-problem",
    image: "/project-knapsack.PNG",
  },
];

const experiences = [
  {
    role:    "Développeuse Full Stack",
    company: "Assurance ARO",
    period:  "Août – Oct. 2024",
    accent:  "#6366f1",
    tasks: [
      "Conception d'applications web internes (React.js + Node.js)",
      "Interfaces UI/UX responsive avec Tailwind CSS",
      "Tests automatisés · optimisation des performances",
    ],
  },
  {
    role:    "Développeuse Full Stack",
    company: "Ministère des Transports et de la Météorologie",
    period:  "Août – Oct. 2023",
    accent:  "#0ea5e9",
    tasks: [
      "App full stack de gestion de matériel informatique",
      "API REST Node.js/Express connectée à MySQL",
      "Automatisation des processus internes de l'institution",
    ],
  },
];

const formations = [
  { degree: "Master 2 Informatique",  school: "École Nationale d'Informatique (ENI)", period: "2025 – Présent", current: true,  accent: "#6366f1" },
  { degree: "Master 1 Informatique",  school: "École Nationale d'Informatique (ENI)", period: "2024 – 2025",    current: false, accent: "#8b5cf6" },
  { degree: "Licence Informatique",   school: "École Nationale d'Informatique (ENI)", period: "2021 – 2024",    current: false, accent: "#a78bfa" },
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */

function useVisible(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.1 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

function Reveal({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const v = useVisible(ref);
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

function useTypewriter(words, spd = 100, delSpd = 50, pause = 1800) {
  const [text, setText] = useState("");
  const [idx,  setIdx]  = useState(0);
  const [del,  setDel]  = useState(false);

  useEffect(() => {
    const curr = words[idx];
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < curr.length) {
          setText(curr.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDel(true), pause);
        }
      } else {
        if (text.length > 0) {
          setText(curr.slice(0, text.length - 1));
        } else {
          setDel(false);
          setIdx(i => (i + 1) % words.length);
        }
      }
    }, del ? delSpd : spd);
    return () => clearTimeout(t);
  }, [text, del, idx, words, spd, delSpd, pause]);

  return text;
}

/* ─────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────── */

export default function App() {
  const [form,     setForm]     = useState({ name: "", email: "", message: "" });
  const [sent,     setSent]     = useState(false);
  const [sending,  setSending]  = useState(false);
  const [error,    setError]    = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark,     setDark]     = useState(false);
  const formRef = useRef(null);
  const role    = useTypewriter(ROLES);

  /* ── Couleurs thème ── */
  const c = {
    bg:          dark ? "#0f172a" : "#fafaf9",
    bgAlt:       dark ? "#1e293b" : "#ffffff",
    text:        dark ? "#f1f5f9" : "#1c1917",
    textMuted:   dark ? "#94a3b8" : "#78716c",
    textHint:    dark ? "#64748b" : "#a8a29e",
    border:      dark ? "#334155" : "#e7e5e4",
    accentBg:    dark ? "#1e1b4b" : "#ede9fe",
    accentText:  "#6366f1",
    skillBg:     dark ? "#1e293b" : "#f5f5f4",
    inputBg:     dark ? "#1e293b" : "#fafaf9",
  };

  useEffect(() => { document.body.style.background = c.bg; }, [dark, c.bg]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (!e.target.closest("nav")) setMenuOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  const navItems = [
    ["À propos",    "about"],
    ["Parcours",    "parcours"],
    ["Projets",     "projects"],
    ["Compétences", "skills"],
    ["Contact",     "contact"],
  ];

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
    border: `1.5px solid ${c.border}`, borderRadius: "10px",
    background: c.inputBg, color: c.text,
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  /* ────────────────────────────────────────────────────────── */
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>

      {/* Google Fonts — à déplacer dans public/index.html pour de meilleures perfs */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        /* ── Animations ── */
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-25px) scale(1.08); }
          66%      { transform: translate(-15px,15px) scale(0.95); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-25px,20px) scale(1.05); }
          66%      { transform: translate(20px,-10px) scale(0.97); }
        }
        .blob-a { animation: blobA 9s ease-in-out infinite; }
        .blob-b { animation: blobB 11s ease-in-out infinite; }

        @keyframes cursor-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .tw-cursor {
          display: inline-block; width: 2px; height: 0.85em;
          background: #6366f1; margin-left: 3px;
          vertical-align: middle;
          animation: cursor-blink 1s step-end infinite;
        }
        @keyframes pulse-dot { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.7); opacity:0.4; } }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-desktop       { display: none !important; }
          .hamburger-btn     { display: flex !important; }
          .hero-grid         { grid-template-columns: 1fr !important; padding-top: 120px !important; }
          .hero-photo        { display: none !important; }
          .parcours-grid     { grid-template-columns: 1fr !important; }
          .projects-row      { grid-template-columns: 60px 1fr !important; }
          .projects-row .proj-arrow { display: none !important; }
          .contact-grid      { grid-template-columns: 1fr !important; }
          .footer-inner      { flex-direction: column !important; gap: 12px !important; text-align: center; }
          .skills-grid       { grid-template-columns: 1fr 1fr !important; }
          .hero-stats        { gap: 20px !important; }
          .hero-buttons      { flex-direction: column !important; }
          .hero-buttons a, .hero-buttons button { width: 100% !important; text-align: center; box-sizing: border-box; }
        }

        /* ── Menu mobile ── */
        .mobile-menu {
          display: none;
          position: fixed; top: 68px; left: 0; right: 0;
          background: ${dark ? "rgba(15,23,42,0.98)" : "rgba(250,250,249,0.98)"};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${c.border};
          padding: 16px 6vw 24px;
          flex-direction: column; gap: 4px; z-index: 99;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          font-size: 16px; color: ${c.text}; cursor: pointer; font-weight: 500;
          background: none; border: none; padding: 12px 0; text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border-bottom: 1px solid ${dark ? "#1e293b" : "#f5f5f4"}; width: 100%;
        }
        .mobile-cta {
          margin-top: 12px; background: #6366f1 !important; color: #fff !important;
          border-radius: 10px !important; padding: 12px 0 !important;
          font-weight: 700 !important; border: none !important; text-align: center !important;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #6366f144; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #6366f188; }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 6vw", height: "68px",
        background: scrolled ? (dark ? "rgba(15,23,42,0.97)" : "rgba(250,250,249,0.97)") : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.border}` : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ fontWeight: 700, fontSize: "18px", color: c.text, letterSpacing: "-0.5px", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Fabiolah<span style={{ color: "#6366f1" }}>.</span>
        </div>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              fontSize: "14px", color: c.textMuted, cursor: "pointer", fontWeight: 500,
              background: "none", border: "none", padding: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = c.text}
              onMouseLeave={e => e.target.style.color = c.textMuted}>
              {label}
            </button>
          ))}

          {/* Dark mode toggle */}
          <button onClick={() => setDark(d => !d)} style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: c.skillBg, border: `1.5px solid ${c.border}`,
            cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; }}
            title={dark ? "Mode clair" : "Mode sombre"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Hamburger */}
        <button className="hamburger-btn" style={{
          display: "none", flexDirection: "column", gap: "5px",
          cursor: "pointer", background: "none", border: "none", padding: "4px",
        }} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : c.text, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : c.text, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : c.text, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Menu mobile */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>{label}</button>
        ))}
        <button className="mobile-cta" onClick={() => scrollTo("contact")}>Me contacter</button>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="about" className="hero-grid" style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        alignItems: "center", padding: "100px 6vw 60px",
        gap: "60px", maxWidth: "1200px", margin: "0 auto",
      }}>

        {/* Blobs animés */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div className="blob-a" style={{
            position: "absolute", width: "600px", height: "600px",
            background: "radial-gradient(circle, #6366f120, transparent 70%)",
            top: "-150px", right: "-100px",
          }} />
          <div className="blob-b" style={{
            position: "absolute", width: "500px", height: "500px",
            background: "radial-gradient(circle, #8b5cf615, transparent 70%)",
            bottom: "-50px", left: "-80px",
          }} />
        </div>

        {/* Colonne gauche */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: c.accentBg, color: c.accentText,
              padding: "6px 16px", borderRadius: "100px",
              fontSize: "13px", fontWeight: 600, marginBottom: "28px",
            }}>
              <span className="pulse-dot" style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#6366f1", display: "inline-block",
              }} />
              Open to work · Stage · Alternance · Freelance
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800,
              lineHeight: 1.1, letterSpacing: "-1.5px",
              marginBottom: "20px", color: c.text,
            }}>
              Développeuse<br />
              <span style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {role}
              </span>
              <span className="tw-cursor" />
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ fontSize: "16px", color: c.textMuted, lineHeight: 1.8, maxWidth: "480px", marginBottom: "36px" }}>
              Master 2 Informatique à l'<strong style={{ color: c.text }}>ENI Madagascar</strong>, spécialisée en développement Full Stack avec React.js & Node.js.
              Forte de <strong style={{ color: c.text }}>2 stages en entreprise</strong>, je construis des applications performantes, du prototype à la production.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-buttons" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} style={{
                background: c.text, color: c.bg, border: "none",
                borderRadius: "10px", padding: "14px 28px",
                fontSize: "14px", fontWeight: 700, cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "opacity 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Voir mes projets →
              </button>

              <a href="/cv.pdf" download="CV_ANDRIATAHINA_Fabiolah.pdf" style={{
                display: "inline-block", background: "transparent", color: c.text,
                border: `1.5px solid ${c.border}`, borderRadius: "10px",
                padding: "14px 28px", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = c.border}>
                ⬇ Télécharger CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="hero-stats" style={{ display: "flex", gap: "32px", marginTop: "48px" }}>
              {[["2", "Stages"], ["10+", "Technologies"], ["Bac+5", "Formation ENI"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: c.text }}>{val}</div>
                  <div style={{ fontSize: "12px", color: c.textHint, marginTop: "2px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Colonne droite — Photo */}
        <Reveal delay={200}>
          <div className="hero-photo" style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              position: "absolute", top: "-20px", right: "-20px",
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
              borderRadius: "24px", zIndex: 0,
            }} />
            <div style={{
              position: "relative", zIndex: 1,
              borderRadius: "20px", overflow: "hidden",
              aspectRatio: "3/4", background: c.border,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `4px solid ${dark ? "#1e293b" : "#fff"}`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}>
              <img src="image.jpeg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Fabiolah ANDRIATAHINA" />
            </div>
            {/* Badge flottant */}
            <div style={{
              position: "absolute", bottom: "24px", left: "-20px",
              background: dark ? "#1e293b" : "#fff",
              borderRadius: "14px", padding: "12px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              zIndex: 2, display: "flex", alignItems: "center", gap: "10px",
              border: `1px solid ${c.border}`,
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
              }}>👩‍💻</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: c.text }}>ANDRIATAHINA Fabiolah</div>
                <div style={{ fontSize: "11px", color: c.textMuted }}>Master 2 · ENI Madagascar</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          PARCOURS
      ══════════════════════════════════════════════════════ */}
      <section id="parcours" style={{ padding: "100px 6vw", background: c.bgAlt }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>
              Mon parcours
            </span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px", color: c.text }}>
              Formation & Expériences
            </h2>
          </Reveal>

          <div className="parcours-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>

            {/* Formation */}
            <div>
              <Reveal>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: c.textHint, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "28px" }}>
                  🎓 Formation
                </h3>
              </Reveal>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: "11px", top: "8px", bottom: "8px",
                  width: "2px", background: "linear-gradient(to bottom, #6366f1, #a78bfa)",
                  borderRadius: "2px",
                }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {formations.map((f, i) => (
                    <Reveal key={f.degree} delay={i * 80}>
                      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                        <div style={{
                          width: "24px", height: "24px", borderRadius: "50%",
                          background: f.current ? f.accent : (dark ? "#334155" : "#e7e5e4"),
                          border: `3px solid ${f.accent}`, flexShrink: 0, marginTop: "14px",
                          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1,
                        }}>
                          {f.current && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />}
                        </div>
                        <div style={{
                          background: c.bg, border: `1.5px solid ${c.border}`,
                          borderRadius: "14px", padding: "16px 20px", flex: 1,
                          transition: "border-color 0.2s, transform 0.2s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = f.accent; e.currentTarget.style.transform = "translateX(4px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "15px", fontWeight: 700, color: c.text }}>{f.degree}</span>
                            {f.current && (
                              <span style={{ fontSize: "10px", fontWeight: 700, color: "#6366f1", background: "#ede9fe", padding: "2px 8px", borderRadius: "100px" }}>
                                EN COURS
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: "13px", color: c.textMuted }}>{f.school}</div>
                          <div style={{ fontSize: "12px", color: c.textHint, marginTop: "4px" }}>{f.period}</div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Expériences */}
            <div>
              <Reveal>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: c.textHint, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "28px" }}>
                  💼 Expériences
                </h3>
              </Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {experiences.map((exp, i) => (
                  <Reveal key={exp.company} delay={i * 100}>
                    <div style={{
                      background: c.bg, border: `1.5px solid ${c.border}`,
                      borderRadius: "16px", padding: "20px 24px",
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = exp.accent; e.currentTarget.style.transform = "translateX(4px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: c.text }}>{exp.role}</div>
                          <div style={{ fontSize: "13px", color: exp.accent, fontWeight: 600, marginTop: "2px" }}>{exp.company}</div>
                        </div>
                        <span style={{
                          fontSize: "11px", fontWeight: 600, color: exp.accent,
                          background: exp.accent + "18", padding: "4px 12px",
                          borderRadius: "100px", whiteSpace: "nowrap",
                        }}>
                          Stage · {exp.period}
                        </span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {exp.tasks.map(task => (
                          <li key={task} style={{ fontSize: "13px", color: c.textMuted, lineHeight: 1.6 }}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════ */}
      <section id="projects" style={{ padding: "100px 6vw", background: c.bg }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>
              Ce que j'ai construit
            </span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px", color: c.text }}>
              Mes Projets
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div className="projects-row" style={{
                  display: "grid", gridTemplateColumns: "80px 1fr 280px",
                  alignItems: "stretch", gap: "0",
                  background: dark ? "#1e293b" : "#fafaf9",
                  border: `1.5px solid ${c.border}`,
                  borderRadius: "16px", overflow: "hidden",
                  transition: "all 0.3s ease", cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.accent;
                    e.currentTarget.style.background = dark ? "#273448" : "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px ${p.accent}22`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = c.border;
                    e.currentTarget.style.background = dark ? "#1e293b" : "#fafaf9";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}>

                  {/* Numéro */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 0", borderRight: `1px solid ${c.border}` }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, fontFamily: "monospace", color: p.accent, opacity: 0.5 }}>
                      {p.number}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div style={{ padding: "24px 28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "20px" }}>{p.icon}</span>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: c.text, margin: 0 }}>{p.title}</h3>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: p.accent, background: p.accent + "18", padding: "3px 10px", borderRadius: "100px" }}>
                        {p.category}
                      </span>
                      {p.badge && (
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#16a34a", background: "#dcfce7", padding: "3px 10px", borderRadius: "100px" }}>
                          ✓ {p.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "14px", color: c.textMuted, margin: "0 0 12px", lineHeight: 1.6 }}>{p.description}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tech.map(t => (
                        <span key={t} style={{
                          fontSize: "11px", fontWeight: 600, color: c.textMuted,
                          background: dark ? "#334155" : "#f5f5f4",
                          border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: "6px",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div style={{ position: "relative", borderLeft: `1px solid ${c.border}`, overflow: "hidden", minHeight: "160px" }}>
                    <img
                      src={p.image}
                      alt={`Aperçu ${p.title}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", transition: "transform 0.4s ease" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                    {/* Overlay gradient */}
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${dark ? "#1e293b" : "#fafaf9"}22, transparent 30%)`, pointerEvents: "none" }} />
                    {/* Bouton GitHub */}
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                      position: "absolute", bottom: "12px", right: "12px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "36px", height: "36px",
                      background: dark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(8px)",
                      border: `1.5px solid ${c.border}`,
                      borderRadius: "10px", textDecoration: "none",
                      fontSize: "16px", color: c.text,
                      transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.9)"; e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.text; }}>
                      ↗
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════════════ */}
      <section id="skills" style={{ padding: "100px 6vw", background: c.bgAlt }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>
              Stack technique
            </span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px", color: c.text }}>
              Compétences
            </h2>
          </Reveal>

          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {Object.entries(skills).map(([category, items], ci) => (
              <Reveal key={category} delay={ci * 80}>
                <div style={{
                  background: c.bg, border: `1.5px solid ${c.border}`,
                  borderRadius: "16px", padding: "24px",
                }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: c.textHint, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                    {category}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {items.map(skill => (
                      <span key={skill} style={{
                        fontSize: "13px", fontWeight: 600, color: c.text,
                        background: dark ? "#334155" : "#f5f5f4",
                        border: `1.5px solid ${c.border}`,
                        padding: "6px 14px", borderRadius: "8px",
                        transition: "all 0.2s", cursor: "default",
                      }}
                        onMouseEnter={e => { e.target.style.background = "#ede9fe"; e.target.style.borderColor = "#6366f1"; e.target.style.color = "#6366f1"; }}
                        onMouseLeave={e => { e.target.style.background = dark ? "#334155" : "#f5f5f4"; e.target.style.borderColor = c.border; e.target.style.color = c.text; }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "100px 6vw", background: c.bg }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>
              Travaillons ensemble
            </span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "8px", color: c.text }}>
              Me contacter
            </h2>
            <p style={{ fontSize: "16px", color: c.textMuted, marginBottom: "40px", lineHeight: 1.7 }}>
              Disponible pour un stage, une alternance, une mission freelance ou un projet collaboratif. N'hésitez pas !
            </p>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#15803d" }}>Message envoyé !</div>
                <div style={{ fontSize: "14px", color: "#16a34a", marginTop: "6px" }}>Je vous répondrai dans les plus brefs délais.</div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, display: "block", marginBottom: "6px" }}>Nom</label>
                    <input required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#6366f1"}
                      onBlur={e => e.target.style.borderColor = c.border} />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, display: "block", marginBottom: "6px" }}>Email</label>
                    <input required type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@email.com" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#6366f1"}
                      onBlur={e => e.target.style.borderColor = c.border} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, display: "block", marginBottom: "6px" }}>Message</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet ou votre message..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#6366f1"}
                    onBlur={e => e.target.style.borderColor = c.border} />
                </div>

                {error && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", color: "#dc2626" }}>
                    ⚠️ {error}
                  </div>
                )}

                <button type="submit" disabled={sending} style={{
                  background: sending ? "#a8a29e" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff", border: "none",
                  borderRadius: "10px", padding: "14px 32px",
                  fontSize: "15px", fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "opacity 0.2s", alignSelf: "flex-start",
                }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                  {sending ? "Envoi en cours..." : "Envoyer le message →"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "24px 6vw", background: c.bg }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: c.text }}>
            Fabiolah<span style={{ color: "#6366f1" }}>.</span>
          </span>

          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://github.com/andriatahinaFabiolah" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "13px", color: c.textMuted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = c.text}
              onMouseLeave={e => e.currentTarget.style.color = c.textMuted}>
              GitHub
            </a>

            {/* TODO: Remplace ce <span> par un <a href="TON_URL_LINKEDIN"> une fois ton profil créé */}
            <span style={{ fontSize: "13px", color: c.textHint, fontWeight: 500, cursor: "default", opacity: 0.4 }}
              title="LinkedIn — bientôt disponible">
              LinkedIn
            </span>

            <a href="mailto:andriatahinafabiolah@gmail.com"
              style={{ fontSize: "13px", color: c.textMuted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = c.text}
              onMouseLeave={e => e.currentTarget.style.color = c.textMuted}>
              Email
            </a>
          </div>

          <span style={{ fontSize: "12px", color: c.textHint }}>© 2026 ANDRIATAHINA Fabiolah</span>
        </div>
      </footer>

    </div>
  );
}