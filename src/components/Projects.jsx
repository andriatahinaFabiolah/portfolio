import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { projects } from "../data/projects";

export function Projects({ c, dark }) {
  const [slideIndices,   setSlideIndices]   = useState(projects.map(() => 0));
  const [carouselPaused, setCarouselPaused] = useState(false);

  const goNext = (pi) => setSlideIndices(prev => prev.map((s, i) => i === pi ? (s + 1) % projects[pi].images.length : s));
  const goPrev = (pi) => setSlideIndices(prev => prev.map((s, i) => i === pi ? (s - 1 + projects[pi].images.length) % projects[pi].images.length : s));
  const goTo   = (pi, di) => setSlideIndices(prev => prev.map((s, i) => i === pi ? di : s));

  useEffect(() => {
    if (carouselPaused) return;
    const interval = setInterval(() => {
      setSlideIndices(prev => prev.map((s, i) => (s + 1) % projects[i].images.length));
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselPaused]);

  return (
    <section id="projects" style={{ padding: "100px 6vw", background: c.bg }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>Ce que j'ai construit</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", marginBottom: "48px", color: c.text }}>Mes Projets</h2>
        </Reveal>

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {projects.map((p, pi) => (
            <Reveal key={p.id} delay={pi * 100}>
              <div style={{ background: c.bgAlt, border: `1.5px solid ${c.border}`, borderRadius: "16px", overflow: "hidden", transition: "all 0.3s ease", height: "100%", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => { setCarouselPaused(true); e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${p.accent}22`; }}
                onMouseLeave={e => { setCarouselPaused(false); e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>

                {/* Carousel */}
                <div style={{ position: "relative", overflow: "hidden", height: "200px", background: "#0f172a", flexShrink: 0 }}>
                  <img src={p.images[slideIndices[pi]]} alt={`${p.title} - vue ${slideIndices[pi] + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "opacity 0.3s ease", display: "block" }} />

                  {p.images.length > 1 && (<>
                    <button className="carousel-btn" onClick={e => { e.stopPropagation(); goPrev(pi); }} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.75, transition: "opacity 0.2s" }}>←</button>
                    <button className="carousel-btn" onClick={e => { e.stopPropagation(); goNext(pi); }} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.75, transition: "opacity 0.2s" }}>→</button>
                  </>)}

                  {p.images.length > 1 && (
                    <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", alignItems: "center" }}>
                      {p.images.map((_, di) => (
                        <button key={di} onClick={e => { e.stopPropagation(); goTo(pi, di); }} style={{ width: di === slideIndices[pi] ? "18px" : "6px", height: "6px", borderRadius: "3px", background: di === slideIndices[pi] ? p.accent : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
                      ))}
                    </div>
                  )}

                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", top: "10px", right: "10px", width: "32px", height: "32px", borderRadius: "8px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = p.accent}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}>↗</a>
                </div>

                {/* Contenu */}
                <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "18px" }}>{p.icon}</span>
                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: c.text, margin: 0 }}>{p.title}</h3>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: p.accent, background: p.accent + "18", padding: "3px 10px", borderRadius: "100px" }}>{p.category}</span>
                  </div>
                  {p.badge && <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, color: "#16a34a", background: "#dcfce7", padding: "3px 10px", borderRadius: "100px", marginBottom: "8px", alignSelf: "flex-start" }}>✓ {p.badge}</span>}
                  <p style={{ fontSize: "13px", color: c.textMuted, margin: "0 0 14px", lineHeight: 1.6, flex: 1 }}>{p.description}</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {p.tech.map(t => <span key={t} style={{ fontSize: "11px", fontWeight: 600, color: c.textMuted, background: dark ? "#334155" : "#f5f5f4", border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: "6px" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
