import { describe, expect, it } from "vitest";

import {
  FORBIDDEN_TOPICS,
  PERSONAS,
  RULES_OF_ENGAGEMENT,
  buildSystemPrompt,
} from "./canon";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt();

  it("includes authorized CIDR and five enclaves", () => {
    expect(prompt).toContain("10.0.0.0/16");
    expect(prompt).toContain("10.0.0.0/24");
    expect(prompt).toContain("10.0.10.0/24");
    expect(prompt).toContain("10.0.20.0/24");
    expect(prompt).toContain("10.0.30.0/24");
    expect(prompt).toContain("10.0.50.0/24");
  });

  it("includes dual forests and all personas", () => {
    expect(prompt).toContain("ellingson.com");
    expect(prompt).toContain("gibson.local");
    expect(prompt).toContain("Eugene Belford");
    expect(prompt).toContain("Dade Murphy");
    expect(prompt).toContain("Kate Libby");
    expect(prompt).toContain("Paul Cook");
    expect(prompt).toMatch(/Chief Information Security Officer/);
    expect(prompt).toMatch(/Senior Security Engineer/);
  });

  it("includes Sirius and inventory uncertainty", () => {
    expect(prompt).toMatch(/Sirius/i);
    expect(prompt).toMatch(/CMDB/i);
    expect(prompt).toMatch(/inventory/i);
  });

  it("includes forbidden topics in the prompt", () => {
    expect(prompt).toMatch(/Proxmox/i);
    expect(prompt).toContain("192.168.123");
    expect(prompt).toMatch(/Vault/i);
  });

  it("requires CISO approval for social engineering", () => {
    expect(prompt).toMatch(/social engineering/i);
    expect(prompt).toMatch(/CISO|Belford/i);
  });
});

describe("FORBIDDEN_TOPICS", () => {
  it("is non-empty and covers key operator secrets", () => {
    expect(FORBIDDEN_TOPICS.length).toBeGreaterThan(0);
    const joined = FORBIDDEN_TOPICS.join("\n");
    expect(joined).toMatch(/Proxmox/i);
    expect(joined).toContain("192.168.123");
    expect(joined).toMatch(/Vault/i);
    expect(joined).toMatch(/Headscale|Tailscale/i);
    expect(joined).toMatch(/vulnerabilit/i);
  });
});

describe("RULES_OF_ENGAGEMENT", () => {
  it("is non-empty and includes core constraints", () => {
    expect(RULES_OF_ENGAGEMENT.length).toBeGreaterThan(0);
    const joined = RULES_OF_ENGAGEMENT.join("\n");
    expect(joined).toContain("10.0.0.0/16");
    expect(joined).toContain("192.168.123.0/24");
    expect(joined).toMatch(/Denial-of-service|DoS/i);
    expect(joined).toMatch(/Social engineering/i);
    expect(joined).toMatch(/CISO/i);
    expect(joined).toMatch(/Sirius/i);
  });
});

describe("PERSONAS", () => {
  it("maps expected roles", () => {
    expect(PERSONAS.belford.title).toMatch(/Chief Information Security Officer/i);
    expect(PERSONAS.murphy.title).toMatch(/Senior Security Engineer/i);
    expect(PERSONAS.libby.title).toMatch(/Application/i);
    expect(PERSONAS.cook.title).toMatch(/Operations/i);
  });
});
