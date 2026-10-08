import test from "node:test";
import assert from "node:assert/strict";
import { getVerifiedDownload, type DownloadRecord } from "../src/lib/downloads.ts";

const fixture: DownloadRecord = {
  audience: "user", platform: "android",
  url: "https://play.google.com/store/apps/details?id=example.test.imove",
  verification: { audience: "user", source: "https://play.google.com/store/apps/details?id=example.test.imove", checkedAt: "2026-10-08", appName: "TH79 iMove User" },
};
test("unverified store URLs never become download links", () => {
  assert.equal(getVerifiedDownload({ ...fixture, verification: null }), null);
});
test("a record for another audience cannot activate a download", () => {
  assert.equal(getVerifiedDownload({ ...fixture, audience: "driver" }), null);
});
test("reject impersonation, insecure schemes, generic stores and platform mismatch", () => {
  for (const url of ["https://play.google.com.evil.test/store/apps/details?id=x", "http://play.google.com/store/apps/details?id=x", "https://play.google.com/store/apps", "javascript:alert(1)", "https://apps.apple.com/vn/app/test/id123456789"]) {
    assert.equal(getVerifiedDownload({ ...fixture, url }), null, url);
  }
});
test("verified exact store URLs are enabled, with matching evidence", () => {
  assert.equal(getVerifiedDownload(fixture), fixture.url);
  const url = "https://apps.apple.com/vn/app/test/id123456789";
  assert.equal(getVerifiedDownload({ ...fixture, platform: "ios", url, verification: { ...fixture.verification!, source: url } }), url);
});
test("null URL and mismatched evidence are unavailable", () => {
  assert.equal(getVerifiedDownload({ ...fixture, url: null }), null);
  assert.equal(getVerifiedDownload({ ...fixture, verification: { ...fixture.verification!, source: "https://example.com" } }), null);
});
