const DEFAULT_SITE_URL = "http://localhost:3000";

/**
 * Resolves the site URL from NEXT_PUBLIC_SITE_URL, falling back to
 * http://localhost:3000 when the variable is unset or empty.
 */
export function resolveSiteUrl(
  env: Record<string, string | undefined> = process.env
): string {
  const url = env.NEXT_PUBLIC_SITE_URL;
  return url && url.trim() !== "" ? url : DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();