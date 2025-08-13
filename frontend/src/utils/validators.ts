// validators.ts
export function isValidPseudo(name: string) {
  return /^[A-Za-z0-9_-]{3,30}$/.test(name);
}
export function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
