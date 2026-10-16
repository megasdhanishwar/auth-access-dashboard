import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, LockKeyhole, ArrowRight } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { createId, getUsers, saveSession, saveUsers } from "../utils/storage";

export default function Login({ onLogin, notify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signInWithDemo() {
    setErrors({});
    setLoading(true);
    const demoEmail = "demo@gmail.com";
    const demoPassword = "Demo@123";
    const users = getUsers();
    let demoUser = users.find((item) => item.email.toLowerCase() === demoEmail);
    if (!demoUser) {
      demoUser = {
        id: createId(),
        name: "Demo User",
        email: demoEmail,
        password: demoPassword,
        role: "Administrator",
        joined: new Date().toISOString(),
        phone: "+1 (555) 010-2026",
        location: "New York, USA",
        bio: "Exploring the StacklyAuth user access dashboard.",
      };
      saveUsers([...users, demoUser]);
    } else if (demoUser.password !== demoPassword) {
      demoUser = { ...demoUser, password: demoPassword };
      saveUsers(
        users.map((item) => (item.id === demoUser.id ? demoUser : item)),
      );
    }
    setEmail(demoEmail);
    setPassword(demoPassword);
    setTimeout(() => {
      saveSession(demoUser, true);
      onLogin(demoUser);
      setLoading(false);
      notify("Demo account signed in successfully.", "success");
      navigate("/dashboard");
    }, 350);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      const user = getUsers().find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password,
      );
      setLoading(false);
      if (!user) {
        setErrors({
          form: "Email or password is incorrect. Please try again.",
        });
        return;
      }
      saveSession(user, remember);
      onLogin(user);
      notify("Welcome back! You’re signed in.", "success");
      navigate("/dashboard");
    }, 500);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your details to sign in to your account."
      footer={
        <>
          New to StacklyAuth?{" "}
          <Link to="/register">
            Create an account <ArrowRight size={15} />
          </Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField
          id="login-email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          error={errors.email}
          autoComplete="email"
        />
        <FormField
          id="login-password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={LockKeyhole}
          error={errors.password}
          autoComplete="current-password"
          right={
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="custom-checkbox" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-link">
            Forgot password?
          </Link>
        </div>
        {errors.form && (
          <div className="form-alert">
            <span>!</span>
            {errors.form}
          </div>
        )}
        <button
          className="btn btn-primary btn-full"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" /> Signing in...
            </>
          ) : (
            <>
              Sign in <ArrowRight size={17} />
            </>
          )}
        </button>
        <div className="demo-divider">
          <span>or explore instantly</span>
        </div>
        <button
          className="btn btn-demo btn-full"
          type="button"
          onClick={signInWithDemo}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner demo-spinner" /> Opening demo account...
            </>
          ) : (
            <>
              <span className="demo-avatar">D</span>
              <span className="demo-button-copy">
                <strong>Continue with demo account</strong>
                <small>demo@gmail.com · Demo@123</small>
              </span>
              <ArrowRight size={17} />
            </>
          )}
        </button>
        <div className="secure-note">
          <LockKeyhole size={14} /> Your information is encrypted and secure
        </div>
      </form>
    </AuthLayout>
  );
}
