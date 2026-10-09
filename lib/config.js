export const DEFAULT_CLIENT_PASSWORD = 'escrilex123';
export const DEFAULT_SESSION_SECRET = 'raiox-escrilex-contabilidade-access-2026-v1';

export function getAccessConfig() {
  return {
    password: process.env.CLIENT_PASSWORD || DEFAULT_CLIENT_PASSWORD,
    secret: process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET,
  };
}
