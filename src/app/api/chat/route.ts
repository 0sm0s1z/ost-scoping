import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

import { buildSystemPrompt, PERSONAS, type PersonaId } from "@/lib/canon";

export const maxDuration = 30;

const MODEL = process.env.OPENAI_MODEL ?? "gpt-5-mini";

/** Request/response contract shared with the useInterview hook. */
const incomingMessageSchema = z.object({
  role: z.enum(["user", "persona"]),
  speakerId: z.enum(["belford", "murphy", "libby", "cook"]).optional(),
  text: z.string().min(1).max(2000),
});

const requestSchema = z.object({
  messages: z.array(incomingMessageSchema).min(1).max(80),
});

const replySchema = z.object({
  messages: z
    .array(
      z.object({
        speakerId: z
          .enum(["belford", "murphy", "libby", "cook"])
          .describe("Which Ellingson team member is speaking."),
        text: z
          .string()
          .describe(
            "That team member's chat message: short, human, Teams-style plain text.",
          ),
      }),
    )
    .min(1)
    .max(2)
    .describe("One message per speaker, at most two speakers per turn."),
});

export type InterviewReply = z.infer<typeof replySchema>;

/**
 * Best-effort per-instance rate limit. Serverless instances each get their
 * own bucket, which is acceptable for a classroom lab — it exists to stop a
 * single client from hammering the model, not as a billing control.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 20 };
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= windowStart)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

function clientKey(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous"
  );
}

const MAX_HISTORY = 40;

export async function POST(req: Request) {
  if (rateLimited(clientKey(req))) {
    return Response.json(
      { error: "Slow down a little — the team can only type so fast." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Keep the recent window; the canon lives in the system prompt, so older
  // turns can be dropped without losing environment facts.
  const history = parsed.data.messages.slice(-MAX_HISTORY);

  const modelMessages = history.map((m) =>
    m.role === "user"
      ? { role: "user" as const, content: m.text }
      : {
          role: "assistant" as const,
          content: `${m.speakerId ? PERSONAS[m.speakerId as PersonaId].name : "Team"}: ${m.text}`,
        },
  );

  try {
    const { object } = await generateObject({
      model: openai(MODEL),
      schema: replySchema,
      system: buildSystemPrompt(),
      messages: modelMessages,
    });

    return Response.json(object);
  } catch (err) {
    console.error("chat route error:", err);
    return Response.json(
      {
        error:
          "The Ellingson team stepped away from their desks. Try again in a moment.",
      },
      { status: 502 },
    );
  }
}
