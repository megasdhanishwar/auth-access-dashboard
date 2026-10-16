import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UserRound,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import FormField from "../components/FormField";

export default function EditProfile({ user, onUpdate, notify }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.phone && !/^[+\d\s()-]{7,20}$/.test(form.phone))
      next.phone = "Enter a valid phone number.";
    if (form.bio.length > 180)
      next.bio = "Bio must be 180 characters or fewer.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      onUpdate({
        ...user,
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      });
      setLoading(false);
      notify("Profile updated successfully.", "success");
      navigate("/profile");
    }, 400);
  }

  return (
    <div className="inner-page narrow-page">
      <div className="page-intro">
        <div>
          <span className="section-eyebrow">YOUR ACCOUNT</span>
          <h2>Edit profile</h2>
          <p>Make sure your personal details are up to date.</p>
        </div>
        <Link to="/profile" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to profile
        </Link>
      </div>
      <section className="panel edit-panel">
        <div className="form-section-heading">
          <div className="form-section-icon">
            <UserRound size={19} />
          </div>
          <div>
            <h3>Personal details</h3>
            <p>Update your name and contact information.</p>
          </div>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="edit-form-grid">
            <FormField
              id="edit-name"
              label="Full name"
              value={form.name}
              onChange={update("name")}
              placeholder="Your full name"
              icon={UserRound}
              error={errors.name}
              autoComplete="name"
            />
            <FormField
              id="edit-email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email}
              autoComplete="email"
            />
            <FormField
              id="edit-phone"
              label="Phone number"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+91 98765 43210"
              icon={Phone}
              error={errors.phone}
              autoComplete="tel"
            />
            <FormField
              id="edit-location"
              label="Location"
              value={form.location}
              onChange={update("location")}
              placeholder="City, Country"
              icon={MapPin}
              autoComplete="address-level2"
            />
          </div>
          <div className="form-field bio-field">
            <label htmlFor="edit-bio">About me</label>
            <div className="textarea-wrap">
              <FileText size={18} />
              <textarea
                id="edit-bio"
                value={form.bio}
                onChange={update("bio")}
                placeholder="A little about yourself..."
                rows="4"
                maxLength="180"
              />
            </div>
            <div className="bio-footer">
              {errors.bio ? (
                <span className="error-message">{errors.bio}</span>
              ) : (
                <span>Share a short introduction.</span>
              )}
              <span>{form.bio.length}/180</span>
            </div>
          </div>
          <div className="form-divider" />
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
                  <span className="spinner" /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> Save changes
                </>
              )}
            </button>
          </div>
        </form>
      </section>
      <div className="privacy-note">
        <ShieldCheck size={17} />
        <span>
          Your information is stored locally in this demo and is not sent to a
          server.
        </span>
      </div>
    </div>
  );
}
