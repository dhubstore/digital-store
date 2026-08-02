/* =========================================================
   auth.js — lightweight demo account modal
   Stores a display name in localStorage; no backend involved.
   ========================================================= */

const AUTH_STORAGE_KEY = "dhub_user";

/** Read the signed-in user, if any. */
function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  renderAuthState();
}

function signOut() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  renderAuthState();
  showToast("Signed out");
}

function openAuth() {
  document.getElementById("authOverlay")?.classList.add("active");
}
function closeAuth() {
  document.getElementById("authOverlay")?.classList.remove("active");
}

/** Swap between the sign-in form and the signed-in summary. */
function renderAuthState() {
  const user = getUser();
  const form = document.getElementById("authForm");
  const profile = document.getElementById("authProfile");
  const title = document.getElementById("authTitle");
  const nameEl = document.getElementById("authProfileName");

  if (!form || !profile) return;

  form.hidden = Boolean(user);
  profile.hidden = !user;
  if (title) title.textContent = user ? "Your account" : "Sign in";
  if (nameEl && user) nameEl.textContent = user.name;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("authBtn")?.addEventListener("click", openAuth);
  document.getElementById("closeAuth")?.addEventListener("click", closeAuth);
  document.getElementById("authOverlay")?.addEventListener("click", (event) => {
    if (event.target.id === "authOverlay") closeAuth();
  });

  document.getElementById("authForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("authName").value.trim();
    const email = document.getElementById("authEmail").value.trim();
    if (!name || !email) return;
    setUser({ name, email });
    showToast(`Welcome, ${name}!`);
    closeAuth();
  });

  document.getElementById("logoutBtn")?.addEventListener("click", signOut);

  renderAuthState();
});
