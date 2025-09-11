export const AUTH_KEY = "sai_auth_verified";

export function isVerified(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function setVerified(value: boolean) {
  try {
    localStorage.setItem(AUTH_KEY, value ? "true" : "false");
  } catch {}
}
