export function setTokens(accessToken: string, refreshToken: string) {
  document.cookie = `admin_access_token=${accessToken}; path=/admin; SameSite=Lax`;
  document.cookie = `admin_refresh_token=${refreshToken}; path=/admin; SameSite=Lax`;
}

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )admin_access_token=([^;]*)/);
  return match ? match[1] : null;
}

export function clearTokens() {
  document.cookie = "admin_access_token=; path=/admin; max-age=0";
  document.cookie = "admin_refresh_token=; path=/admin; max-age=0";
}
