import { describe, expect, it } from "vitest";
import { sanitizeText } from "./sanitize";

describe("assainissement", () => {
  it("retire les balises, les caractères de contrôle et coupe la longueur", () => {
    const dirty = "  <script>alert(1)</script>Bonjour\u0000 <b>Luna</b>\n";
    expect(sanitizeText(dirty, 12)).toBe("alert(1)Bonj");
  });
});
