const USERS_KEY = "stacklyauth_users";
const SESSION_KEY = "stacklyauth_session";
const RESET_KEY = "stacklyauth_reset_email";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function saveSession(user, remember = false) {
  const session = { userId: user.id, remember, createdAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return getUsers().find((user) => user.id === session.userId) || null;
}

export function setResetEmail(email) {
  localStorage.setItem(RESET_KEY, email);
}

export function getResetEmail() {
  return localStorage.getItem(RESET_KEY) || "";
}

export function clearResetEmail() {
  localStorage.removeItem(RESET_KEY);
}

export function createId() {
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}