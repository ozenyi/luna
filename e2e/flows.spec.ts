import { expect, test, type Page } from "@playwright/test";

const adminEmail = process.env.LUNA_ADMIN_EMAIL || "admin@luna.test";
const adminPassword = process.env.LUNA_ADMIN_PASSWORD || "Luna-demo-2026";
const voyantEmail = process.env.LUNA_VOYANT_EMAIL || "voyant@luna.test";
const voyantPassword = process.env.LUNA_VOYANT_PASSWORD || "Luna-demo-2026";
const clientEmail = process.env.LUNA_CLIENT_EMAIL || "client@luna.test";
const clientPassword = process.env.LUNA_CLIENT_PASSWORD || "Luna-demo-2026";

async function ready(page: Page) {
  await page.addInitScript(({ adminEmail, adminPassword, voyantEmail, voyantPassword, clientEmail, clientPassword }) => {
    localStorage.setItem("luna.v2.cookies", JSON.stringify({ necessary: true, audience: false, ads: false, at: Date.now() }));
    window.__LUNA_TEST_ACCOUNTS__ = {
      admin: { email: adminEmail, password: adminPassword },
      voyant: { email: voyantEmail, password: voyantPassword },
      client: { email: clientEmail, password: clientPassword },
    };
  }, { adminEmail, adminPassword, voyantEmail, voyantPassword, clientEmail, clientPassword });
}

test("inscription, recharge 20 €, chat, visio et remboursement", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await ready(page);
  const email = `flux-${Date.now()}@luna.test`;
  await page.goto("/luna/v2/inscription/");
  await page.getByTestId("signup-form").getByLabel("Prénom", { exact: true }).fill("Léa");
  await page.getByTestId("signup-form").getByLabel("Nom", { exact: true }).fill("Bernard");
  await page.getByTestId("signup-email").fill(email);
  await page.getByTestId("signup-password").fill("Luna-client-2026");
  await page.getByTestId("signup-birth").fill("1991-05-04");
  await page.getByTestId("signup-adult").check();
  await page.getByTestId("signup-cgu").check();
  await page.getByTestId("signup-submit").click();
  await expect(page.getByRole("heading", { name: "Bonjour Léa" })).toBeVisible();

  await page.goto("/luna/v2/tarifs/");
  await page.getByTestId("pack-20").click();
  await page.getByTestId("card-number").fill("4242 4242 4242 4242");
  await page.getByTestId("card-expiry").fill("12/30");
  await page.getByTestId("card-cvc").fill("123");
  await page.getByTestId("card-name").fill("Lea Bernard");
  await page.getByRole("checkbox", { name: /conditions générales de vente/i }).check();
  await page.getByRole("checkbox", { name: /immédiatement/i }).check();
  await page.getByTestId("pay-button").click();
  await expect(page.getByTestId("wallet-balance")).toContainText("22,00");

  await page.goto("/luna/v2/voyants/selene/consulter/");
  await page.getByTestId("start-chat").click();
  await page.getByTestId("sensitive-consent").check();
  await page.getByTestId("sensitive-consent-accept").click();
  const countdown = page.getByTestId("chat-countdown");
  await expect(countdown).toBeVisible();
  const first = await countdown.innerText();
  await page.waitForTimeout(1200);
  await expect(countdown).not.toHaveText(first);
  await page.getByTestId("chat-input").fill("Es-tu humain ?");
  await page.getByTestId("chat-send").click();
  await expect(page.getByText(/intelligence artificielle/i).first()).toBeVisible();
  await page.getByTestId("end-session").click();

  await page.goto("/luna/v2/session/test/");
  await expect(page.getByTestId("video-device-test")).toBeVisible();
  await page.getByRole("button", { name: /Tester la caméra/ }).click();
  await expect(page.getByText(/simulation|détectés/i)).toBeVisible();

  await page.goto("/luna/v2/reserver/marc/");
  await page.getByTestId("booking-slot").first().click();
  await page.getByTestId("booking-confirm").click();
  await expect(page.getByText("Réservation confirmée")).toBeVisible();

  await page.getByTestId("logout").click();
  await page.getByTestId("login-email").fill(adminEmail);
  await page.getByTestId("login-password").fill(adminPassword);
  await page.getByTestId("login-submit").click();
  const otp = await page.getByTestId("demo-otp").innerText();
  await page.getByLabel("Code").fill(otp);
  await page.getByTestId("login-submit").click();
  await page.goto("/luna/v2/admin/litiges/");
  const row = page.getByTestId("dispute-row").filter({ hasText: email });
  await row.getByTestId("admin-refund").click();
  await expect(row).toContainText("Remboursé");
  expect(errors).toEqual([]);
});

test("toutes les URL du sitemap répondent, sans erreur de console ni lien cassé", async ({ page, request }) => {
  test.setTimeout(300_000);
  const sitemap = await request.get("/luna/v2/sitemap.xml");
  const xml = await sitemap.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace("https://ozenyi.github.io", ""));
  expect(locs.length).toBeGreaterThan(50);
  const seen = new Set<string>();
  const broken: string[] = [];
  for (const loc of locs) {
    const errors: string[] = [];
    page.removeAllListeners("pageerror");
    page.removeAllListeners("console");
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto(loc, { waitUntil: "networkidle" });
    expect(response?.status(), loc).toBeLessThan(400);
    await page.waitForTimeout(50);
    const images = await page.locator("img").evaluateAll((nodes) => nodes.map((node) => ({ src: (node as HTMLImageElement).currentSrc || (node as HTMLImageElement).src, ok: (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0 })));
    for (const image of images) if (!image.ok) broken.push(`${loc} image ${image.src}`);
    const hrefs = await page.locator("a[href]").evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));
    for (const href of hrefs) {
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.endsWith("#")) continue;
      const url = new URL(href);
      if (url.origin !== "http://127.0.0.1:4173") continue;
      url.hash = "";
      seen.add(url.pathname + url.search);
    }
    expect(errors, loc).toEqual([]);
  }
  for (const href of seen) {
    const response = await request.get(href);
    if (response.status() >= 400) broken.push(`${href} ${response.status()}`);
  }
  expect(broken).toEqual([]);
});
