import { useTypewriter } from "../hooks/useTypewriter";
import { Reveal } from "./Reveal";

const ROLES = [
  "Full Stack Developer",
  "React.js Specialist",
  "Node.js Back-end Dev",
  "Disponible · Stage & Alternance",
];

export function Hero({ dark, c }) {
  const role = useTypewriter(ROLES);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="hero-grid" style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      alignItems: "center", padding: "100px 6vw 60px",
      gap: "60px", maxWidth: "1200px", margin: "0 auto",
    }}>
      {/* Blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div className="blob-a" style={{ position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, #6366f120, transparent 70%)", top: "-150px", right: "-100px" }} />
        <div className="blob-b" style={{ position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle, #8b5cf615, transparent 70%)", bottom: "-50px", left: "-80px" }} />
      </div>

      {/* Contenu gauche */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: c.accentBg, color: c.accentText, padding: "6px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, marginBottom: "28px" }}>
            <span className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            Open to work · Stage · Alternance · Freelance
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: "20px", color: c.text }}>
            Développeuse<br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
            <button onClick={() => scrollTo("projects")} style={{ background: c.text, color: c.bg, border: "none", borderRadius: "10px", padding: "14px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Voir mes projets →
            </button>
            <a href="/cv.pdf" download="CV_ANDRIATAHINA_Fabiolah.pdf" style={{ display: "inline-block", background: "transparent", color: c.text, border: `1.5px solid ${c.border}`, borderRadius: "10px", padding: "14px 28px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", textDecoration: "none", transition: "border-color 0.2s" }}
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

      {/* Photo */}
      <Reveal delay={200}>
        <div className="hero-photo" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100%", height: "100%", background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)", borderRadius: "24px", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", border: `4px solid ${dark ? "#1e293b" : "#fff"}`, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
            <img src="image.jpeg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Fabiolah ANDRIATAHINA" />
          </div>
          <div style={{ position: "absolute", bottom: "24px", left: "-20px", background: dark ? "#1e293b" : "#fff", borderRadius: "14px", padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 2, display: "flex", alignItems: "center", gap: "10px", border: `1px solid ${c.border}` }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>👩‍💻</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: c.text }}>ANDRIATAHINA Fabiolah</div>
              <div style={{ fontSize: "11px", color: c.textMuted }}>Master 2 · ENI Madagascar</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
