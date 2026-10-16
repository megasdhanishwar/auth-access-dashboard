import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Pencil,
} from "lucide-react";

export default function Profile({ user }) {
  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="inner-page">
      <div className="page-intro">
        <div>
          <span className="section-eyebrow">YOUR ACCOUNT</span>
          <h2>Personal profile</h2>
          <p>Manage the information associated with your account.</p>
        </div>
        <Link to="/edit-profile" className="btn btn-primary">
          <Pencil size={16} /> Edit profile
        </Link>
      </div>
      <section className="panel profile-hero-card">
        <div className="profile-cover" />
        <div className="profile-hero-content">
          <div className="avatar avatar-profile">{initials}</div>
          <div className="profile-hero-text">
            <h3>{user?.name || "Your name"}</h3>
            <p>{user?.email}</p>
            <span className="member-badge">
              <span /> {user?.role || "Member"} account
            </span>
          </div>
          <div className="verified-label">
            <ShieldCheck size={16} /> Account active
          </div>
        </div>
      </section>
      <div className="profile-detail-grid">
        <section className="panel detail-panel">
          <div className="panel-header">
            <div>
              <h3>Personal information</h3>
              <p>Your profile details.</p>
            </div>
            <UserRound size={19} className="muted-icon" />
          </div>
          <div className="detail-list">
            <div className="detail-row">
              <span className="detail-icon">
                <UserRound size={17} />
              </span>
              <div>
                <span>Full name</span>
                <strong>{user?.name || "Not provided"}</strong>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <Mail size={17} />
              </span>
              <div>
                <span>Email address</span>
                <strong>{user?.email || "Not provided"}</strong>
              </div>
              <span className="verified-mini">
                <ShieldCheck size={14} /> Verified
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <Phone size={17} />
              </span>
              <div>
                <span>Phone number</span>
                <strong>{user?.phone || "Not added"}</strong>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <MapPin size={17} />
              </span>
              <div>
                <span>Location</span>
                <strong>{user?.location || "Not added"}</strong>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-icon">
                <BriefcaseBusiness size={17} />
              </span>
              <div>
                <span>About me</span>
                <strong>
                  {user?.bio || "Add a short bio to tell us about yourself."}
                </strong>
              </div>
            </div>
          </div>
          <Link to="/edit-profile" className="btn btn-secondary btn-full">
            Update information <ArrowRight size={16} />
          </Link>
        </section>
        <div className="profile-side-stack">
          <section className="panel account-status-card">
            <div className="status-card-heading">
              <span className="stat-icon stat-icon-green">
                <ShieldCheck size={19} />
              </span>
              <span className="status-pill status-green">Active</span>
            </div>
            <h3>Account status</h3>
            <p>Your account is active and ready to use.</p>
            <div className="status-card-line">
              <span>Account type</span>
              <strong>Personal</strong>
            </div>
            <div className="status-card-line">
              <span>Member since</span>
              <strong>
                {user?.joined
                  ? new Date(user.joined).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Today"}
              </strong>
            </div>
          </section>
          <section className="security-mini-card">
            <div className="tip-icon">
              <ShieldCheck size={20} />
            </div>
            <h3>Keep your account secure</h3>
            <p>A strong password helps protect your personal information.</p>
            <Link to="/change-password">
              Change password <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
