const SESSION_HINT_KEY = "daykeep_has_session";

export const setSessionHint = () => {
  localStorage.setItem(SESSION_HINT_KEY, "true");
};

export const clearSessionHint = () => {
  localStorage.removeItem(SESSION_HINT_KEY);
};

export const hasSessionHint = () => {
  return localStorage.getItem(SESSION_HINT_KEY) === "true";
};