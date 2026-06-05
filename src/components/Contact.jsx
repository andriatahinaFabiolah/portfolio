import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Reveal } from "./Reveal";
import { contactInfo } from "../data/parcours";

export function Contact({ c }) {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState(null);
  const formRef = useRef(null);

  const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault(); setSending(true); setError(null);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { name: form.name, email: form.email, message: form.message }, EMAILJS_PUBLIC_KEY);
      setSent(true); setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch { setError("Une erreur est survenue. Veuillez réessayer."); }
    finally { setSending(false); }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', sans-serif", border: `1.5px solid ${c.border}`, borderRadius: "10px", background: c.inputBg, color: c.text, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <section id="contact" style={{ padding: "100px 6vw", background: c.bg }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>Travaillons ensemble</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", color: c.text }}>Me contacter</h2>
        </Reveal>

        <div className="contact-grid-outer" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "64px", marginTop: "48px", alignItems: "start" }}>

          {/* Infos */}
          <Reveal delay={100}>
            <div>
              <p style={{ fontSize: "15px", color: c.textMuted, lineHeight: 1.8, marginBottom: "36px" }}>
                Disponible pour un stage, une alternance ou une mission freelance. N'hésitez pas à me contacter !
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {contactInfo.map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", borderRadius: "14px", border: `1.5px solid ${c.border}`, background: c.bgAlt, transition: "border-color 0.2s, transform 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: c.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "11px", color: c.textHint, fontWeight: 500, marginBottom: "2px" }}>{item.label}</div>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: "13px", fontWeight: 600, color: c.text, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#6366f1"} onMouseLeave={e => e.currentTarget.style.color = c.text}>{item.value}</a>
                        : <div style={{ fontSize: "13px", fontWeight: 600, color: c.text }}>{item.value}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "8px", background: c.accentBg, color: c.accentText, padding: "10px 18px", borderRadius: "100px", fontSize: "13px", fontWeight: 600 }}>
                <span className="pulse-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
                Disponible maintenant
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={200}>
            {sent ? (
              <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#15803d" }}>Message envoyé !</div>
                <div style={{ fontSize: "14px", color: "#16a34a", marginTop: "6px" }}>Je vous répondrai dans les plus brefs délais.</div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, display: "block", marginBottom: "6px" }}>Nom</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Votre nom" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = c.border} />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, display: "block", marginBottom: "6px" }}>Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = c.border} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: c.textMuted, display: "block", marginBottom: "6px" }}>Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Décrivez votre projet ou votre message..." style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#6366f1"} onBlur={e => e.target.style.borderColor = c.border} />
                </div>
                {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", color: "#dc2626" }}>⚠️ {error}</div>}
                <button type="submit" disabled={sending} style={{ background: sending ? "#a8a29e" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "opacity 0.2s", alignSelf: "flex-start" }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  {sending ? "Envoi en cours..." : "Envoyer le message →"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
