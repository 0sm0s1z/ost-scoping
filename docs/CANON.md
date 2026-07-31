# Ellingson Scoping Lab — Canon & Quiz Matrix

Student-safe source of truth for the Teams scoping interview. Implementation lives in `src/lib/canon.ts` (`buildSystemPrompt()`, personas, enclaves, RoE, forbidden topics).

## Lab role override

This interview **intentionally diverges** from `ellingson-range/data/identities.yaml` for pedagogy:

| Id | Name | Lab role |
| --- | --- | --- |
| `murphy` | Dade Murphy | **CISO** — authorizes RoE / social-eng / destructive; primary Ellingson security contact; owns scope, Sirius, forests when asked precisely |
| `belford` | Eugene Belford | **Independent consultant (computer fraud)** — external advisor in the thread; process/SOW voice; does **not** authorize Ellingson systems; often vague or slightly wrong about the range |
| `libby` | Kate Libby | Principal Application Engineer — DMZ + services apps |
| `cook` | Paul Cook | IT Operations Manager — endpoints, windows, messy CMDB |

Do not “fix” this back to the range identity titles without an explicit product decision.

## Disclosure rules

- Progressive disclosure: vague asks get hedges or clarifying questions — never a five-enclave / full-RoE dump.
- Precise asks get one narrow fact from the owner.
- One speaker by default (1–3 short sentences). No markdown bullet dumps.
- Perform inventory confusion (Cook vs DNS/CMDB; Eugene unreliable on internals).
- Only Dade (CISO) can authorize social engineering or destructive testing.
- Never reveal forbidden topics (below).

## Enclaves (authorized range `10.0.0.0/16`)

| Enclave | CIDR | Notes |
| --- | --- | --- |
| Transit / infrastructure | `10.0.0.0/24` | RANGE-GW |
| IT / identity | `10.0.10.0/24` | DCs, Sirius |
| User endpoints | `10.0.20.0/24` | Workstations |
| Internal services | `10.0.30.0/24` | Internal / legacy apps |
| DMZ / public-facing | `10.0.50.0/24` | Internet-facing apps |

## Forbidden topics (never disclose)

- Proxmox / `192.168.123.x` management
- VM IDs, SDN / VNI, range construction
- Headscale / Tailscale admin, ACL tags, pre-auth keys
- Vault, credentials, secrets
- Firewall / isolation internals
- Complete vulnerability / CVE / finding lists
- Lab platform / hosting details

## Quiz-to-fact matrix

| Quiz topic | Fact students should elicit | Persona who owns the answer |
| --- | --- | --- |
| Roles | Dade=CISO; Eugene=external computer-fraud consultant; Kate=apps; Paul=ops | Roster + self-intro; Dade for authorization |
| Authorized CIDR | `10.0.0.0/16` | Murphy |
| Five enclaves + CIDRs | Transit/IT/users/services/DMZ | Murphy (only when asked precisely) |
| Dual forests | `ellingson.com` ↔ `gibson.local` | Murphy |
| DMZ vs services | Public vs internal apps | Murphy (network); Libby (apps) |
| Sirius | In-range vuln scanner (auth + unauth) | Murphy |
| Inventory / CMDB | Incomplete / DNS mismatch | Cook (with friction) |
| Prohibited methods | Non-destructive; social eng / destructive need CISO (Dade) approval | Murphy |

## Source of truth

| Concern | Location |
| --- | --- |
| Runtime canon + prompt | `src/lib/canon.ts` |
| Chat API | `src/app/api/chat/route.ts` |
| Teams UI | `src/components/teams/` |
| This matrix | `docs/CANON.md` |
