import { describe, expect, it } from "vitest";
import { AI_HUMAN_ANSWER, detectDistress, filterAiOutput, isHumanQuestion, redactContacts, sessionGate, truncateIp } from "./safety";

describe("détresse, IA et masquage", () => {
  it("détecte une détresse sans renvoyer le texte", () => {
    expect(detectDistress("je veux mourir ce soir").category).toBe("suicide");
    expect(detectDistress("parlons de mon travail").detected).toBe(false);
  });

  it("répond honnêtement à la question d'humanité et filtre les promesses", () => {
    expect(isHumanQuestion("Dis-moi, es-tu humain ?")).toBe(true);
    expect(AI_HUMAN_ANSWER.toLowerCase()).toContain("intelligence artificielle");
    expect(filterAiOutput("C'est garanti, il reviendra.").blocked).toBe(true);
    expect(filterAiOutput("Cette carte évoque un temps de pause.").blocked).toBe(false);
  });

  it("demande une confirmation à 30 minutes et masque les coordonnées", () => {
    expect(sessionGate(29)).toBe("ok");
    expect(sessionGate(30)).toBe("confirm");
    expect(sessionGate(60)).toBe("hard_stop");
    expect(redactContacts("Écrivez-moi à ada@exemple.fr ou au 06 12 34 56 78").text).not.toMatch(/@|06/);
    expect(truncateIp("203.0.113.44")).toBe("203.0.113.0");
  });
});
