const DEV_FALLBACK_SECRET = "dev-secret-change-me";

let cached: Uint8Array | null = null;

/**
 * JWT signing key. Production must set AUTH_SECRET; the dev fallback is only
 * allowed outside production so a missing env var can never yield a forgeable key.
 */
export function getAuthSecret(): Uint8Array {
  if (cached) return cached;
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET is not set");
    }
    cached = new TextEncoder().encode(DEV_FALLBACK_SECRET);
    return cached;
  }
  cached = new TextEncoder().encode(secret);
  return cached;
}
