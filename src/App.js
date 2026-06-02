import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const skills = {
  "Frontend": ["React.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
  "Backend": ["Node.js", "Express.js", "PHP"],
  "Base de données": ["MySQL", "PostgreSQL", "MongoDB"],
  "Outils": ["Git", "GitHub", "VS Code", "Docker"],
};

const projects = [
  {
    id: 1,
    title: "Gestion de Matériel",
    category: "Full Stack",
    tech: ["React", "Node.js", "Express", "MySQL"],
    description: "Application web de gestion de matériel informatique avec affectation aux directions et portes.",
    accent: "#6366f1",
    icon: "💻",
    link: "https://github.com/andriatahinaFabiolah/gestion-materiel",
    number: "01",
  },
  {
    id: 2,
    title: "Banking App",
    category: "Backend",
    tech: ["PHP", "MySQL", "Triggers"],
    description: "Supervision des virements bancaires automatisés via triggers MySQL avec interfaces admin & client.",
    accent: "#0ea5e9",
    icon: "🏦",
    link: "https://github.com/andriatahinaFabiolah/Banking_app",
    number: "02",
  },
  {
    id: 3,
    title: "Knapsack DP",
    category: "Algorithmique",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Visualisation interactive de l'algorithme du sac à dos — programmation dynamique O(n·W).",
    accent: "#f59e0b",
    icon: "🎒",
    link: "https://github.com/andriatahinaFabiolah/knapsack-problem",
    number: "03",
  },
];

function useVisible(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
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
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest("nav")) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;  
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      console.log("Envoi:", { name: form.name, email: form.email, message: form.message });
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  const navItems = [
    ["À propos", "about"],
    ["Projets", "projects"],
    ["Compétences", "skills"],
    ["Contact", "contact"],
  ];

  const S = {
    page: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: "#fafaf9",
      color: "#1c1917",
      minHeight: "100vh",
    },
    nav: {
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 6vw",
      height: "68px",
      background: scrolled ? "rgba(250,250,249,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid #e7e5e4" : "none",
      transition: "all 0.3s ease",
    },
    logo: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      fontSize: "18px",
      color: "#1c1917",
      letterSpacing: "-0.5px",
      cursor: "pointer",
    },
    navLink: {
      fontSize: "14px",
      color: "#78716c",
      cursor: "pointer",
      fontWeight: 500,
      background: "none",
      border: "none",
      padding: 0,
      transition: "color 0.2s",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    hamburger: {
      display: "none",
      flexDirection: "column",
      gap: "5px",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "4px",
    },
  };

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 120px !important; }
          .hero-photo { display: none !important; }
          .projects-grid-row { grid-template-columns: 60px 1fr !important; }
          .projects-grid-row .project-arrow { display: none !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; gap: 12px !important; text-align: center; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-stats { gap: 20px !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a, .hero-buttons button { width: 100% !important; text-align: center; box-sizing: border-box; }
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 68px;
          left: 0; right: 0;
          background: rgba(250,250,249,0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e7e5e4;
          padding: 16px 6vw 24px;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          font-size: 16px;
          color: #1c1917;
          cursor: pointer;
          font-weight: 500;
          background: none;
          border: none;
          padding: 12px 0;
          text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border-bottom: 1px solid #f5f5f4;
          width: 100%;
        }
        .mobile-cta {
          margin-top: 12px;
          background: #6366f1 !important;
          color: #fff !important;
          border-radius: 10px !important;
          padding: 12px 0 !important;
          font-weight: 700 !important;
          border: none !important;
          text-align: center !important;
        }
      `}</style>

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Fabiolah ANDRIATAHINA
        </div>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {navItems.map(([l, id]) => (
            <button key={id} style={S.navLink}
              onMouseEnter={e => e.target.style.color = "#1c1917"}
              onMouseLeave={e => e.target.style.color = "#78716c"}
              onClick={() => scrollTo(id)}>{l}</button>
          ))}
        </div>

        {/* CORRECTION 6 : Bouton hamburger mobile */}
        <button
          className="hamburger-btn"
          style={{ ...S.hamburger }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : "#1c1917", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : "#1c1917", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "22px", height: "2px", background: menuOpen ? "#6366f1" : "#1c1917", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(([l, id]) => (
          <button key={id} onClick={() => scrollTo(id)}>{l}</button>
        ))}
        <button className="mobile-cta" onClick={() => scrollTo("contact")}>Engagez-moi</button>
      </div>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "100px 6vw 60px",
        gap: "60px",
        maxWidth: "1200px",
        margin: "0 auto",
      }} className="hero-grid">
        {/* Left */}
        <div>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#ede9fe", color: "#6366f1",
              padding: "6px 16px", borderRadius: "100px",
              fontSize: "13px", fontWeight: 600, marginBottom: "28px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              Disponible pour des projets
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: "20px",
              color: "#1c1917",
            }}>
              Développeuse<br />
              <span style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Full Stack</span><br />
              Web
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p style={{
              fontSize: "16px", color: "#78716c", lineHeight: 1.8,
              maxWidth: "480px", marginBottom: "36px",
            }}>
              Passionnée par la création d'interfaces web modernes, performantes et intuitives.
              Je transforme des idées en applications web élégantes.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-buttons" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} style={{
                background: "#1c1917", color: "#fff", border: "none",
                borderRadius: "10px", padding: "14px 28px",
                fontSize: "14px", fontWeight: 700, cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "transform 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Voir mes projets →
              </button>

              <a
                href="/cv.pdf"
                download="CV_ANDRIATAHINA_Fabiolah.pdf"
                style={{
                  display: "inline-block",
                  background: "transparent", color: "#1c1917",
                  border: "1.5px solid #e7e5e4",
                  borderRadius: "10px", padding: "14px 28px",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e7e5e4"}
              >
                ⬇ Télécharger CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="hero-stats" style={{ display: "flex", gap: "32px", marginTop: "48px" }}>
              {[["3+", "Projets"], ["Full", "Stack"], ["Madagascar", "Localisation"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#1c1917" }}>{v}</div>
                  <div style={{ fontSize: "12px", color: "#a8a29e", marginTop: "2px" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — Photo */}
        <Reveal delay={200}>
          <div className="hero-photo" style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "-20px", right: "-20px",
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
              borderRadius: "24px",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "3/4",
              background: "#e7e5e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid #fff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}>
              <img src="image.jpeg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Fabiolah" />
            </div>
            <div style={{
              position: "absolute",
              bottom: "24px",
              left: "-20px",
              background: "#fff",
              borderRadius: "14px",
              padding: "12px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>👩‍💻</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#1c1917" }}>ANDRIATAHINA Fabiolah</div>
                <div style={{ fontSize: "11px", color: "#78716c" }}>Développeuse Full Stack</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 6vw", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "60px" }}>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px" }}>
                Mes Projets 
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <div
                  className="projects-grid-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    alignItems: "center",
                    gap: "32px",
                    background: "#fafaf9",
                    border: "1.5px solid #e7e5e4",
                    borderRadius: "16px",
                    padding: "28px 32px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.accent;
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "translateX(6px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#e7e5e4";
                    e.currentTarget.style.background = "#fafaf9";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div style={{
                    fontSize: "13px", fontWeight: 800, fontFamily: "monospace",
                    color: p.accent, opacity: 0.5,
                  }}>{p.number}</div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "22px" }}>{p.icon}</span>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1c1917", margin: 0 }}>{p.title}</h3>
                      <span style={{
                        fontSize: "11px", fontWeight: 600, color: p.accent,
                        background: p.accent + "18",
                        padding: "3px 10px", borderRadius: "100px",
                      }}>{p.category}</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#78716c", margin: "0 0 12px", lineHeight: 1.6 }}>{p.description}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tech.map(t => (
                        <span key={t} style={{
                          fontSize: "11px", fontWeight: 600, color: "#57534e",
                          background: "#f5f5f4", border: "1px solid #e7e5e4",
                          padding: "3px 10px", borderRadius: "6px",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <a className="project-arrow" href={p.link} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "44px", height: "44px",
                    background: "#f5f5f4", border: "1.5px solid #e7e5e4",
                    borderRadius: "10px", textDecoration: "none",
                    fontSize: "18px", flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = p.accent; e.currentTarget.style.borderColor = p.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#f5f5f4"; e.currentTarget.style.borderColor = "#e7e5e4"; }}
                  >
                    ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 6vw", background: "#fafaf9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px" }}>
              Mes compétences techniques
            </h2>
          </Reveal>

          {/* CORRECTION 4 : MongoDB et PostgreSQL ajoutés dans skills en haut */}
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {Object.entries(skills).map(([category, items], ci) => (
              <Reveal key={category} delay={ci * 80}>
                <div style={{
                  background: "#fff",
                  border: "1.5px solid #e7e5e4",
                  borderRadius: "16px",
                  padding: "24px",
                }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                    {category}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {items.map(skill => (
                      <span key={skill} style={{
                        fontSize: "13px", fontWeight: 600, color: "#1c1917",
                        background: "#f5f5f4",
                        border: "1.5px solid #e7e5e4",
                        padding: "6px 14px", borderRadius: "8px",
                        transition: "all 0.2s",
                        cursor: "default",
                      }}
                        onMouseEnter={e => {
                          e.target.style.background = "#ede9fe";
                          e.target.style.borderColor = "#6366f1";
                          e.target.style.color = "#6366f1";
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = "#f5f5f4";
                          e.target.style.borderColor = "#e7e5e4";
                          e.target.style.color = "#1c1917";
                        }}
                      >
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

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 6vw", background: "#fff" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Reveal>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>
              Travaillons ensemble
            </span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "8px" }}>
              Me contacter
            </h2>
            <p style={{ fontSize: "16px", color: "#78716c", marginBottom: "40px", lineHeight: 1.7 }}>
              Disponible pour des opportunités, collaborations ou simplement pour échanger.
            </p>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div style={{
                background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                borderRadius: "16px", padding: "32px", textAlign: "center",
              }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#15803d" }}>Message envoyé !</div>
                <div style={{ fontSize: "14px", color: "#16a34a", marginTop: "6px" }}>Je vous répondrai dans les plus brefs délais.</div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#57534e", display: "block", marginBottom: "6px" }}>Nom</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      style={{
                        width: "100%", padding: "12px 16px",
                        fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                        border: "1.5px solid #e7e5e4", borderRadius: "10px",
                        background: "#fafaf9", color: "#1c1917",
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "#6366f1"}
                      onBlur={e => e.target.style.borderColor = "#e7e5e4"}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#57534e", display: "block", marginBottom: "6px" }}>Email</label>
                    <input
                      required type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@email.com"
                      style={{
                        width: "100%", padding: "12px 16px",
                        fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                        border: "1.5px solid #e7e5e4", borderRadius: "10px",
                        background: "#fafaf9", color: "#1c1917",
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "#6366f1"}
                      onBlur={e => e.target.style.borderColor = "#e7e5e4"}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#57534e", display: "block", marginBottom: "6px" }}>Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet ou votre message..."
                    style={{
                      width: "100%", padding: "12px 16px",
                      fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                      border: "1.5px solid #e7e5e4", borderRadius: "10px",
                      background: "#fafaf9", color: "#1c1917",
                      outline: "none", resize: "vertical", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#6366f1"}
                    onBlur={e => e.target.style.borderColor = "#e7e5e4"}
                  />
                </div>

                {error && (
                  <div style={{
                    background: "#fef2f2", border: "1px solid #fecaca",
                    borderRadius: "8px", padding: "12px 16px",
                    fontSize: "14px", color: "#dc2626",
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background: sending ? "#a8a29e" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff", border: "none",
                    borderRadius: "10px", padding: "14px 32px",
                    fontSize: "15px", fontWeight: 700,
                    cursor: sending ? "not-allowed" : "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "opacity 0.2s, transform 0.1s",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  {sending ? "Envoi en cours..." : "Envoyer le message →"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #e7e5e4",
        padding: "24px 6vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fafaf9",
      }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#1c1917" }}>
            Fabiolah<span style={{ color: "#6366f1" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://github.com/andriatahinaFabiolah" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "#78716c", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = "#1c1917"}
              onMouseLeave={e => e.currentTarget.style.color = "#78716c"}
            >GitHub</a>
            <a href="mailto:andriatahinafabiolah@gmail.com"
              style={{ fontSize: "13px", color: "#78716c", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = "#1c1917"}
              onMouseLeave={e => e.currentTarget.style.color = "#78716c"}
            >Email</a>
          </div>
          <span style={{ fontSize: "12px", color: "#a8a29e" }}>© 2026 ANDRIATAHINA Fabiolah</span>
        </div>
      </footer>
    </div>
  );
}
