import { useState, useEffect } from "react";

const navItems = [
  ["À propos",    "about"],
  ["Parcours",    "parcours"],
  ["Projets",     "projects"],
  ["Compétences", "skills"],
  ["Contact",     "contact"],
];

export function Navbar({ dark, setDark, c }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

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

  return (
    <>
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

        <div className="nav-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ fontSize: "14px", color: c.textMuted, cursor: "pointer", fontWeight: 500, background: "none", border: "none", padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = c.text}
              onMouseLeave={e => e.target.style.color = c.textMuted}>
              {label}
            </button>
          ))}
          <button onClick={() => setDark(d => !d)} style={{ width: "36px", height: "36px", borderRadius: "10px", background: c.skillBg, border: `1.5px solid ${c.border}`, cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
            onMouseLeave={e => e.currentTarget.style.borderColor = c.border}
            title={dark ? "Mode clair" : "Mode sombre"}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <button className="hamburger-btn" style={{ display: "none", flexDirection: "column", gap: "5px", cursor: "pointer", background: "none", border: "none", padding: "4px" }}
          onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : c.text, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : c.text, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : c.text, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>{label}</button>
        ))}
        <button className="mobile-cta" onClick={() => scrollTo("contact")}>Me contacter</button>
      </div>
    </>
  );
}
