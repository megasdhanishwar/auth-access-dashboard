import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import {
  clearResetEmail,
  getResetEmail,
  getUsers,
  saveUsers,
} from "../utils/storage";

export default function ResetPassword({ notify }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = getResetEmail();
  const valid =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!email) next.form = "Your reset session has expired. Start again.";
    if (!valid)
      next.password =
        "Use at least 8 characters, one uppercase letter and one number.";
    if (password !== confirm) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      const users = getUsers().map((user) =>
        user.email.toLowerCase() === email.toLowerCase()
          ? { ...user, password }
          : user,
      );
      saveUsers(users);
      clearResetEmail();
      setLoading(false);
      notify("Password reset successfully. Please sign in.", "success");
      navigate("/login");
    }, 450);
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven’t used before."
      footer={
        <Link to="/login">
          <ArrowLeft size={15} /> Back to sign in
        </Link>
      }
    >
      {!email ? (
        <div className="form-alert">
          <span>!</span>Your reset session has expired.{" "}
          <Link to="/forgot-password">Start again</Link>.
        </div>
      ) : (
        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="reset-email-pill">
            Resetting password for <strong>{email}</strong>
          </div>
          <FormField
            id="reset-password"
            label="New password"
            type={show ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={LockKeyhole}
            error={errors.password}
            autoComplete="new-password"
            right={
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShow(!show)}
                aria-label="Toggle password visibility"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          <div className="password-rules">
            <span className={password.length >= 8 ? "rule-valid" : ""}>
              <Check size={13} />
              At least 8 characters
            </span>
            <span className={/[A-Z]/.test(password) ? "rule-valid" : ""}>
              <Check size={13} />
              One uppercase letter
            </span>
            <span className={/\d/.test(password) ? "rule-valid" : ""}>
              <Check size={13} />
              One number
            </span>
          </div>
          <FormField
            id="reset-confirm"
            label="Confirm new password"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
                <span className="spinner" /> Updating...
              </>
            ) : (
              <>
                Reset password <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
