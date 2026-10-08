export type Audience = "user" | "driver" | "merchant";
export type Platform = "ios" | "android";
export type DownloadRecord = {
  audience: Audience;
  platform: Platform;
  url: string | null;
  verification: { audience: Audience; source: string; checkedAt: string; appName: string } | null;
};
export function getVerifiedDownload(record: DownloadRecord): string | null {
  const { url, verification, audience, platform } = record;
  if (!url || !verification || verification.audience !== audience || verification.source !== url || !/^TH79 iMove\b/i.test(verification.appName) || !/^\d{4}-\d{2}-\d{2}$/.test(verification.checkedAt)) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.port || parsed.hash) return null;
    if (platform === "android" && parsed.hostname === "play.google.com" && parsed.pathname === "/store/apps/details" && /^[a-zA-Z][\w]*(\.[\w]+)+$/.test(parsed.searchParams.get("id") ?? "")) return url;
    if (platform === "ios" && parsed.hostname === "apps.apple.com" && /^\/(?:[a-z]{2}\/)?app\/(?:[^/]+\/)?id\d{6,}$/.test(parsed.pathname)) return url;
  } catch { return null; }
  return null;
}

// Add store URLs only after a human has confirmed the TH79 publisher, app identity and role.
// Verification.source must be the exact store listing; never use search or generic store URLs.
export const downloads: DownloadRecord[] = (["user", "driver", "merchant"] as const).flatMap(
  (audience) => (["ios", "android"] as const).map((platform) => ({ audience, platform, url: null, verification: null })),
);
