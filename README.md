# Ellingson Scoping Lab (`ost-scoping`)

Microsoft Teams–style scoping interview for the Open Security Training Ellingson range. Students chat with simulated stakeholders (CISO, security engineer, app owner, IT ops) to elicit scope, enclaves, RoE, and inventory caveats — without leaking operator secrets.

## Local setup

```bash
npm install
cp .env.example .env.local
# set OPENAI_API_KEY (required); optionally OPENAI_MODEL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `OPENAI_API_KEY` | Yes | OpenAI API key for the chat route |
| `OPENAI_MODEL` | No | Defaults to `gpt-5-mini` |

See `.env.example` for names only. Never commit `.env.local`.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Deterministic canon unit tests (no OpenAI) |

## Architecture

```
canon.ts  →  buildSystemPrompt()  →  /api/chat (generateObject)  →  Teams UI
```

1. **`src/lib/canon.ts`** — Student-safe ground truth: personas, enclaves, named systems, RoE, inventory caveats, forbidden topics. `buildSystemPrompt()` renders the model instructions from that data.
2. **`src/app/api/chat/route.ts`** — Validates the request (Zod), applies a light rate limit, calls AI SDK 7 `generateObject` with a multi-persona reply schema (1–2 speakers per turn). Default model: `OPENAI_MODEL` or `gpt-5-mini`.
3. **`src/hooks/useInterview.ts`** — Client interview state: non-streaming POST, typing delays, restart.
4. **`src/components/teams/`** — Teams shell UI (multi-persona avatars, right panel without quiz spoilers).

Canon documentation and the quiz-to-fact matrix: [`docs/CANON.md`](docs/CANON.md).

## Deploy on Vercel

1. Import the GitHub repo into Vercel (Next.js detected automatically).
2. Set project env vars: `OPENAI_API_KEY`, optionally `OPENAI_MODEL`.
3. Deploy from the preview branch or `main`. Preview deployments get a unique URL per push.

Serverless note: the in-memory rate limit is per instance (classroom guardrail, not billing control). Ensure the function region can reach the OpenAI API and that `maxDuration` (30s on the chat route) fits your plan.
