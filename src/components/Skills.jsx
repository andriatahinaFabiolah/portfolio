import { Reveal } from "./Reveal";
import { skills } from "../data/skills";

const categoryIcons = ["🎨", "⚙️", "🗄️", "🛠️"];

export function Skills({ dark, c }) {
  return (
    <section id="skills" style={{ padding: "100px 6vw", background: c.bgAlt }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>Stack technique</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px", color: c.text }}>Compétences</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="skills-grid">
          {Object.entries(skills).map(([category, items], ci) => (
            <Reveal key={category} delay={ci * 80}>
              <div style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "20px", padding: "28px", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: c.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                    {categoryIcons[ci]}
                  </div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: c.text }}>{category}</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {items.map((skill, si) => (
                    <Reveal key={skill.name} delay={si * 40}>
                      <div className="skill-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "16px 12px", borderRadius: "12px", border: `1.5px solid ${c.border}`, background: c.bgAlt, width: "80px", transition: "all 0.25s ease", cursor: "default" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 8px 24px #6366f122"; e.currentTarget.style.background = c.accentBg; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = c.bgAlt; }}>
                        <img src={skill.icon} alt={skill.name} width={36} height={36}
                          style={{ transition: "transform 0.2s", filter: skill.invertOnDark && dark ? "invert(1)" : "none" }} />
                        <span style={{ fontSize: "10px", fontWeight: 600, color: c.textMuted, textAlign: "center", lineHeight: 1.3 }}>{skill.name}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
