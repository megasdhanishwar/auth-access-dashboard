import React from "react";
import { Fingerprint, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import Brand from "./Brand";

export default function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="visual-top">
          <Brand />
        </div>
        <div className="visual-content">
          <div className="eyebrow">
            <Sparkles size={15} /> SIMPLE. SECURE. SEAMLESS.
          </div>
          <h1>
            Your workspace,
            <br />
            under <span>your control.</span>
          </h1>
          <p>
            One secure place to manage your profile, protect your account, and
            stay in control of your digital identity.
          </p>
          <div className="security-card">
            <div className="security-card-icon">
              <ShieldCheck size={23} />
            </div>
            <div>
              <strong>Security you can trust</strong>
              <span>Your account is protected at every step.</span>
            </div>
            <span className="status-dot" />
          </div>
          <div className="visual-feature-row">
            <div>
              <Fingerprint size={18} />
              <span>Identity first</span>
            </div>
            <div>
              <LockKeyhole size={18} />
              <span>Private by design</span>
            </div>
          </div>
        </div>
        <div className="visual-footer">
          © 2026 StacklyAuth, Inc. <span>Built for peace of mind.</span>
        </div>
      </section>
      <section className="auth-panel">
        <div className="mobile-brand">
          <Brand />
        </div>
        <div className="auth-form-container">
          <div className="auth-heading">
            <span className="auth-kicker">WELCOME TO STACKLYAUTH</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {children}
          {footer && <div className="auth-bottom">{footer}</div>}
        </div>
        <div className="auth-panel-footer">
          Protected by StacklyAuth <span>•</span> Privacy-first access
        </div>
      </section>
    </main>
  );
}
