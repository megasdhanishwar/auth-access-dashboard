import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Check,
  Save,
} from "lucide-react";
import FormField from "../components/FormField";

export default function ChangePassword({ user, onUpdate, notify }) {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const rules = [
    { label: "At least 8 characters", valid: form.next.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(form.next) },
    { label: "One number", valid: /\d/.test(form.next) },
  ];

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (form.current !== user?.password)
      next.current = "Your current password is incorrect.";
    if (rules.some((rule) => !rule.valid))
      next.next = "Password does not meet the requirements.";
    if (form.next === form.current)
      next.next = "Choose a password different from your current one.";
    if (form.confirm !== form.next) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      onUpdate({ ...user, password: form.next });
      setLoading(false);
      notify("Password changed successfully.", "success");
      navigate("/profile");
    }, 450);
  }

  const visibilityButton = (key) => (
    <button
      type="button"
      className="password-toggle"
      onClick={() =>
        setShow((current) => ({ ...current, [key]: !current[key] }))
      }
      aria-label={`Toggle ${key} password visibility`}
    >
      {show[key] ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <div className="inner-page narrow-page">
      <div className="page-intro">
        <div>
          <span className="section-eyebrow">ACCOUNT SECURITY</span>
          <h2>Change password</h2>
          <p>Choose a strong password to keep your account protected.</p>
        </div>
        <Link to="/profile" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>
      <section className="panel edit-panel">
        <div className="form-section-heading">
          <div className="form-section-icon">
            <LockKeyhole size={19} />
          </div>
          <div>
            <h3>Update your password</h3>
            <p>Enter your current password, then choose a new one.</p>
          </div>
        </div>
        <form className="password-change-form" onSubmit={submit} noValidate>
          <FormField
            id="current-password"
            label="Current password"
            type={show.current ? "text" : "password"}
            placeholder="Enter current password"
            value={form.current}
            onChange={set("current")}
            icon={LockKeyhole}
            error={errors.current}
            autoComplete="current-password"
            right={visibilityButton("current")}
          />
          <div className="form-divider" />
          <FormField
            id="new-password"
            label="New password"
            type={show.next ? "text" : "password"}
            placeholder="Create a new password"
            value={form.next}
            onChange={set("next")}
            icon={LockKeyhole}
            error={errors.next}
            autoComplete="new-password"
            right={visibilityButton("next")}
          />
          <div className="password-rules">
            {rules.map((rule) => (
              <span key={rule.label} className={rule.valid ? "rule-valid" : ""}>
                <Check size={13} />
                {rule.label}
              </span>
            ))}
          </div>
          <FormField
            id="confirm-new-password"
            label="Confirm new password"
            type={show.confirm ? "text" : "password"}
            placeholder="Re-enter new password"
            value={form.confirm}
            onChange={set("confirm")}
            icon={LockKeyhole}
            error={errors.confirm}
            autoComplete="new-password"
            right={visibilityButton("confirm")}
          />
          <div className="form-actions">
            <Link to="/profile" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Updating...
                </>
              ) : (
                <>
                  <Save size={16} /> Update password
                </>
              )}
            </button>
          </div>
        </form>
      </section>
      <div className="security-guidance">
        <ShieldCheck size={21} />
        <div>
          <strong>Tips for a secure password</strong>
          <p>
            Use a unique password, avoid personal details, and never share it
            with anyone. This demo stores credentials in your browser only; do
            not use a real password.
          </p>
        </div>
      </div>
    </div>
  );
}
