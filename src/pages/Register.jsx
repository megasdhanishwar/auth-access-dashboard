import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  ArrowRight,
  Check,
} from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { createId, getUsers, saveUsers, saveSession } from "../utils/storage";

export default function Register({ onLogin, notify }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const rules = [
    { label: "At least 8 characters", valid: form.password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(form.password) },
    { label: "One number", valid: /\d/.test(form.password) },
  ];

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (rules.some((rule) => !rule.valid))
      next.password = "Your password doesn’t meet the requirements.";
    if (form.confirm !== form.password)
      next.confirm = "Passwords do not match.";
    if (!agree) next.agree = "Please accept the terms to continue.";
    if (
      getUsers().some(
        (user) => user.email.toLowerCase() === form.email.trim().toLowerCase(),
      )
    )
      next.email = "An account with this email already exists.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: createId(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: "Member",
        joined: new Date().toISOString(),
        phone: "",
        location: "",
        bio: "",
      };
      saveUsers([...getUsers(), user]);
      saveSession(user, true);
      onLogin(user);
      notify("Your account has been created.", "success");
      navigate("/dashboard");
      setLoading(false);
    }, 450);
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get started with a secure, personal workspace."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login">
            Sign in <ArrowRight size={15} />
          </Link>
        </>
      }
    >
      <form className="auth-form register-form" onSubmit={submit} noValidate>
        <FormField
          id="register-name"
          label="Full name"
          placeholder="e.g. Alex Morgan"
          value={form.name}
          onChange={set("name")}
          icon={UserRound}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          id="register-email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set("email")}
          icon={Mail}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          id="register-password"
          label="Create password"
          type={showPassword ? "text" : "password"}
          placeholder="Create a strong password"
          value={form.password}
          onChange={set("password")}
          icon={LockKeyhole}
          error={errors.password}
          autoComplete="new-password"
          right={
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
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
          id="register-confirm"
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          placeholder="Re-enter your password"
          value={form.confirm}
          onChange={set("confirm")}
          icon={LockKeyhole}
          error={errors.confirm}
          autoComplete="new-password"
          right={
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <label className="checkbox-label terms-check">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="custom-checkbox" />I agree to the{" "}
          <a href="#terms" onClick={(e) => e.preventDefault()}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </a>
          .
        </label>
        {errors.agree && (
          <span className="field-message error-message">{errors.agree}</span>
        )}
        <button
          className="btn btn-primary btn-full"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" /> Creating account...
            </>
          ) : (
            <>
              Create account <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
