import { Reveal } from "./Reveal";
import { formations, experiences } from "../data/parcours";

export function Parcours({ c }) {
  return (
    <section id="parcours" style={{ padding: "100px 6vw", background: c.bgAlt }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>Mon parcours</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px", color: c.text }}>
            Formation & Expériences
          </h2>
        </Reveal>

        <div className="parcours-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>

          {/* Formation */}
          <div>
            <Reveal>
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: c.textHint, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "28px" }}>🎓 Formation</h3>
            </Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "11px", top: "8px", bottom: "8px", width: "2px", background: "linear-gradient(to bottom, #6366f1, #a78bfa)", borderRadius: "2px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {formations.map((f, i) => (
                  <Reveal key={f.degree} delay={i * 80}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: f.current ? f.accent : (c.bgAlt === "#1e293b" ? "#334155" : "#e7e5e4"), border: `3px solid ${f.accent}`, flexShrink: 0, marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                        {f.current && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      <div style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "14px", padding: "16px 20px", flex: 1, transition: "border-color 0.2s, transform 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = f.accent; e.currentTarget.style.transform = "translateX(4px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "15px", fontWeight: 700, color: c.text }}>{f.degree}</span>
                          {f.current && <span style={{ fontSize: "10px", fontWeight: 700, color: "#6366f1", background: "#ede9fe", padding: "2px 8px", borderRadius: "100px" }}>EN COURS</span>}
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
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: c.textHint, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "28px" }}>💼 Expériences</h3>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {experiences.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 100}>
                  <div style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "16px", padding: "20px 24px", transition: "border-color 0.2s, transform 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = exp.accent; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: c.text }}>{exp.role}</div>
                        <div style={{ fontSize: "13px", color: exp.accent, fontWeight: 600, marginTop: "2px" }}>{exp.company}</div>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: exp.accent, background: exp.accent + "18", padding: "4px 12px", borderRadius: "100px", whiteSpace: "nowrap" }}>
                        Stage · {exp.period}
                      </span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {exp.tasks.map(task => <li key={task} style={{ fontSize: "13px", color: c.textMuted, lineHeight: 1.6 }}>{task}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
