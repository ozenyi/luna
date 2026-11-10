import { PrismaClient, Role } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();
const adminEmail = process.env.LUNA_ADMIN_EMAIL || "admin@luna.test";
const adminPassword = process.env.LUNA_ADMIN_PASSWORD || "Luna-demo-2026";
const voyantEmail = process.env.LUNA_VOYANT_EMAIL || "voyant@luna.test";
const voyantPassword = process.env.LUNA_VOYANT_PASSWORD || "Luna-demo-2026";
const clientEmail = process.env.LUNA_CLIENT_EMAIL || "client@luna.test";
const clientPassword = process.env.LUNA_CLIENT_PASSWORD || "Luna-demo-2026";

async function main() {
  const hash = (password: string) => argon2.hash(password, { type: argon2.argon2id });
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail, passwordHash: await hash(adminPassword), role: Role.ADMIN,
      firstName: "Camille", lastName: "Morel", pseudonym: "Camille", referralCode: "LUNAADMIN",
      totpSecret: process.env.SEED_ADMIN_TOTP_SECRET || "JBSWY3DPEHPK3PXP", totpEnabled: true,
    },
  });
  const guideUser = await prisma.user.upsert({
    where: { email: voyantEmail },
    update: {},
    create: {
      email: voyantEmail, passwordHash: await hash(voyantPassword), role: Role.VOYANT,
      firstName: "Marc", lastName: "Démo", pseudonym: "Marc", referralCode: "LUNAMARC",
    },
  });
  await prisma.guide.upsert({
    where: { slug: "marc" },
    update: {},
    create: {
      userId: guideUser.id, slug: "marc", displayName: "Marc", kind: "HUMAN", fictitious: true,
      country: "FR", chatRateCents: 150, callRateCents: 150, videoRateCents: 150, availableNow: false,
    },
  });
  await prisma.user.upsert({
    where: { email: clientEmail },
    update: {},
    create: {
      email: clientEmail, passwordHash: await hash(clientPassword), role: Role.CLIENT,
      firstName: "Inès", lastName: "Martin", pseudonym: "Inès", referralCode: "LUNAINE",
      wallet: { create: { balanceCents: 0 } },
    },
  });
}

main().finally(() => prisma.$disconnect());
