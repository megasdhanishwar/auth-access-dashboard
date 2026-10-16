import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { getUsers, setResetEmail } from "../utils/storage";

export default function ForgotPassword({ notify }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      const exists = getUsers().some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (exists) {
        setResetEmail(email.trim().toLowerCase());
        setSent(true);
      } else {
        setError("No account found with this email address.");
      }
      setLoading(false);
    }, 450);
  }

  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Forgot password?"}
      subtitle={
        sent
          ? "We’ve prepared the next step for your password reset."
          : "No worries. Enter your email and we’ll help you get back in."
      }
      footer={
        <Link to="/login">
          <ArrowLeft size={15} /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="success-panel">
          <div className="success-icon">
            <CheckCircle2 size={28} />
          </div>
          <h3>Reset request ready</h3>
          <p>
            If an account exists for <strong>{email}</strong>, it can be reset
            using the secure demo flow.
          </p>
          <button
            className="btn btn-primary btn-full"
            onClick={() => navigate("/reset-password")}
          >
            Continue to reset password <ArrowRight size={16} />
          </button>
          <button
            className="text-button"
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
          >
            Try another email
          </button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={submit} noValidate>
          <FormField
            id="forgot-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            error={error}
            autoComplete="email"
          />
          <button
            className="btn btn-primary btn-full"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" /> Checking account...
              </>
            ) : (
              <>
                Continue <ArrowRight size={17} />
              </>
            )}
          </button>
          <div className="info-note">
            <span>i</span> For this frontend demo, the reset flow is simulated
            locally. No email is sent.
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
