import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  ShieldCheck,
  KeyRound,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";
import Brand from "./Brand";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/profile", label: "My profile", icon: UserRound },
  { to: "/change-password", label: "Security", icon: ShieldCheck },
];

export default function DashboardLayout({
  user,
  children,
  onLogout,
  onLogoutRequest,
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const pageTitle = location.pathname.startsWith("/profile")
    ? "My profile"
    : location.pathname.startsWith("/change-password")
      ? "Security settings"
      : "Overview";
  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          className="sidebar-scrim"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Brand />
          <button
            className="icon-button sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "Security" && <span className="nav-badge">2</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <KeyRound size={18} />
            </div>
            <strong>Need a hand?</strong>
            <p>Keep your account safe with a strong password.</p>
            <NavLink to="/change-password" onClick={() => setMobileOpen(false)}>
              Review security <span>→</span>
            </NavLink>
          </div>
          <button className="nav-link logout-link" onClick={onLogoutRequest}>
            <LogOut size={19} />
            <span>Log out</span>
          </button>
          <div className="sidebar-version">
            STACKLYAUTH <span>v1.0.0</span>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>
            <div>
              <div className="breadcrumb">
                Workspace <span>/</span> {pageTitle}
              </div>
              <h1>{pageTitle}</h1>
            </div>
          </div>
          <div className="topbar-right">
            <button
              className="icon-button notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <i />
            </button>
            <div className="topbar-divider" />
            <div className="topbar-user">
              <div className="avatar avatar-small">{initials}</div>
              <div className="topbar-user-text">
                <strong>{user?.name || "User"}</strong>
                <span>Personal account</span>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="app-footer">
          <span>© 2026 StacklyAuth</span>
          <span>
            Security & privacy <b>·</b> Help center
          </span>
        </footer>
      </div>
    </div>
  );
}
