import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  KeyRound,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const activities = [
  {
    id: 1,
    title: "Successful sign in",
    detail: "Current session · This device",
    time: "Just now",
    icon: CheckCircle2,
    tone: "green",
    status: "Success",
  },
  {
    id: 2,
    title: "Profile information updated",
    detail: "Personal details",
    time: "Yesterday, 4:42 PM",
    icon: UserRound,
    tone: "blue",
    status: "Updated",
  },
  {
    id: 3,
    title: "Password security check",
    detail: "Account security",
    time: "Oct 12, 2026",
    icon: ShieldCheck,
    tone: "purple",
    status: "Secure",
  },
  {
    id: 4,
    title: "New session started",
    detail: "Chrome · Windows",
    time: "Oct 10, 2026",
    icon: KeyRound,
    tone: "orange",
    status: "Success",
  },
];

export default function Dashboard({ user }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All activity");
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () =>
      activities.filter(
        (item) =>
          `${item.title} ${item.detail} ${item.status}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "All activity" || item.status === filter),
      ),
    [query, filter],
  );
  const visible = filtered.slice((page - 1) * 3, page * 3);
  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-page">
      <section className="welcome-row">
        <div>
          <div className="date-label">
            <CalendarDays size={15} /> FRIDAY, OCTOBER 16, 2026
          </div>
          <h2>
            Good to see you, {user?.name?.split(" ")[0] || "there"}{" "}
            <span className="wave">✦</span>
          </h2>
          <p>Here’s what’s happening with your account today.</p>
        </div>
        <Link className="btn btn-primary welcome-action" to="/profile">
          <UserRound size={17} /> View profile
        </Link>
      </section>
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="hero-tag">
            <ShieldCheck size={14} /> ACCOUNT OVERVIEW
          </span>
          <h2>Your account is looking good.</h2>
          <p>
            Your personal information is up to date. Keep your account secure by
            reviewing your security settings regularly.
          </p>
          <Link to="/change-password" className="hero-link">
            Review security settings <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-shield">
            <ShieldCheck size={54} strokeWidth={1.5} />
          </div>
          <div className="art-check">
            <CheckCircle2 size={20} />
          </div>
          <div className="art-spark spark-one">✦</div>
          <div className="art-spark spark-two">✧</div>
        </div>
      </section>
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-icon-blue">
              <UserRound size={19} />
            </span>
            <span className="stat-trend trend-positive">
              <ArrowUpRight size={14} /> Active
            </span>
          </div>
          <div className="stat-label">Account status</div>
          <div className="stat-value">Verified</div>
          <div className="stat-foot">
            <span className="mini-dot green-dot" /> Your account is active
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-icon-purple">
              <ShieldCheck size={19} />
            </span>
            <span className="stat-trend trend-positive">
              <ArrowUpRight size={14} /> Good
            </span>
          </div>
          <div className="stat-label">Security score</div>
          <div className="stat-value">
            92<span className="stat-unit">/100</span>
          </div>
          <div className="score-track">
            <span />
          </div>
          <div className="stat-foot">Looking strong — keep it up</div>
        </article>
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-icon-orange">
              <KeyRound size={19} />
            </span>
            <span className="stat-trend trend-neutral">
              <Clock3 size={14} /> Current
            </span>
          </div>
          <div className="stat-label">Active sessions</div>
          <div className="stat-value">1</div>
          <div className="stat-foot">You’re signed in on this device</div>
        </article>
        <article className="stat-card">
          <div className="stat-top">
            <span className="stat-icon stat-icon-green">
              <Activity size={19} />
            </span>
            <span className="stat-trend trend-down">
              <ArrowDownRight size={14} /> Low
            </span>
          </div>
          <div className="stat-label">Security alerts</div>
          <div className="stat-value">0</div>
          <div className="stat-foot">No unusual activity detected</div>
        </article>
      </section>
      <section className="content-grid">
        <article className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h3>Recent activity</h3>
              <p>Keep track of what’s happening on your account.</p>
            </div>
            <span className="activity-count">{filtered.length} events</span>
          </div>
          <div className="activity-tools">
            <label className="search-box">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search activity..."
                aria-label="Search activity"
              />
              {query && (
                <button
                  className="clear-search"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter activity"
            >
              <option>All activity</option>
              <option>Success</option>
              <option>Updated</option>
              <option>Secure</option>
            </select>
          </div>
          <div className="activity-list">
            {visible.map((item) => {
              const Icon = item.icon;
              return (
                <div className="activity-item" key={item.id}>
                  <div className={`activity-icon activity-${item.tone}`}>
                    <Icon size={18} />
                  </div>
                  <div className="activity-details">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <div className="activity-meta">
                    <span className={`status-pill status-${item.tone}`}>
                      {item.status}
                    </span>
                    <time>{item.time}</time>
                  </div>
                </div>
              );
            })}
            {visible.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <Search size={22} />
                </div>
                <strong>No activity found</strong>
                <p>Try a different search term or filter.</p>
                <button
                  className="text-link"
                  onClick={() => {
                    setQuery("");
                    setFilter("All activity");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          {filtered.length > 3 && (
            <div className="pagination">
              <span>
                Showing {(page - 1) * 3 + 1}–
                {Math.min(page * 3, filtered.length)} of {filtered.length}
              </span>
              <div>
                <button
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <button
                  className="page-btn"
                  disabled={page * 3 >= filtered.length}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </article>
        <div className="right-column">
          <article className="panel profile-card">
            <div className="panel-header">
              <div>
                <h3>Profile overview</h3>
                <p>Your account details at a glance.</p>
              </div>
              <Link
                to="/profile"
                className="panel-icon-link"
                aria-label="Edit profile"
              >
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="profile-summary">
              <div className="avatar avatar-large">{initials}</div>
              <div>
                <strong>{user?.name || "Your name"}</strong>
                <span>{user?.email}</span>
                <span className="member-badge">
                  <span /> {user?.role || "Member"}
                </span>
              </div>
            </div>
            <div className="profile-fields">
              <div>
                <span>Member since</span>
                <strong>
                  {user?.joined
                    ? new Date(user.joined).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Today"}
                </strong>
              </div>
              <div>
                <span>Account type</span>
                <strong>Personal</strong>
              </div>
            </div>
            <Link className="btn btn-secondary btn-full" to="/profile">
              Manage profile <ArrowRight size={16} />
            </Link>
          </article>
          <article className="security-tip">
            <div className="tip-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <strong>A little security goes a long way</strong>
              <p>
                Update your password periodically and never share your login
                details.
              </p>
              <Link to="/change-password">
                Improve account security <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
