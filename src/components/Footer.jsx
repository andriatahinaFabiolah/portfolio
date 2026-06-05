export function Footer({ c }) {
  return (
    <footer style={{ borderTop: `1px solid ${c.border}`, padding: "24px 6vw", background: c.bg }}>
      <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: c.text }}>
          Fabiolah<span style={{ color: "#6366f1" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="https://github.com/andriatahinaFabiolah" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "13px", color: c.textMuted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = c.text}
            onMouseLeave={e => e.currentTarget.style.color = c.textMuted}>GitHub</a>
          {/* TODO: Remplace ce span par <a href="https://linkedin.com/in/TON-PROFIL"> quand ton LinkedIn est créé */}
          <span style={{ fontSize: "13px", color: c.textHint, fontWeight: 500, opacity: 0.4 }} title="LinkedIn — bientôt disponible">LinkedIn</span>
          <a href="mailto:andriatahinafabiolah@gmail.com"
            style={{ fontSize: "13px", color: c.textMuted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = c.text}
            onMouseLeave={e => e.currentTarget.style.color = c.textMuted}>Email</a>
        </div>
        <span style={{ fontSize: "12px", color: c.textHint }}>© 2026 ANDRIATAHINA Fabiolah</span>
      </div>
    </footer>
  );
}
