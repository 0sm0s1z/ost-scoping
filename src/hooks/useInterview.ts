"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { PersonaId } from "@/lib/canon";

export type InterviewMessage = {
  id: string;
  role: "user" | "persona";
  speakerId?: PersonaId;
  text: string;
  at: Date;
};

const WELCOME: InterviewMessage = {
  id: "welcome",
  role: "persona",
  speakerId: "murphy",
  text: "Hey — thanks for jumping in. I'm Dade, senior security engineer here at Ellingson, and I'll be your main technical contact for the assessment. Eugene (our CISO), Kate from applications, and Paul from IT ops are in this chat too. Ask us whatever you need to scope the engagement.",
  at: new Date(),
};

let counter = 0;
function nextId() {
  counter += 1;
  return `m-${Date.now()}-${counter}`;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Typing-indicator delay before a persona message lands. */
function typingDelay(text: string): number {
  if (prefersReducedMotion()) return 0;
  return Math.min(500 + text.length * 8, 2200);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useInterview() {
  const [messages, setMessages] = useState<InterviewMessage[]>([WELCOME]);
  const [typingSpeaker, setTypingSpeaker] = useState<PersonaId | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isBusy) return;

      const userMessage: InterviewMessage = {
        id: nextId(),
        role: "user",
        text,
        at: new Date(),
      };
      const history = [...messages, userMessage];

      setMessages(history);
      setIsBusy(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({
              role: m.role,
              speakerId: m.speakerId,
              text: m.text,
            })),
          }),
        });

        const data = (await res.json()) as {
          messages?: { speakerId: PersonaId; text: string }[];
          error?: string;
        };

        if (!res.ok || !data.messages?.length) {
          throw new Error(data.error ?? "The team did not respond.");
        }

        for (const reply of data.messages) {
          if (!mounted.current) return;
          setTypingSpeaker(reply.speakerId);
          await sleep(typingDelay(reply.text));
          if (!mounted.current) return;
          setTypingSpeaker(null);
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              role: "persona",
              speakerId: reply.speakerId,
              text: reply.text,
              at: new Date(),
            },
          ]);
        }
      } catch (err) {
        if (mounted.current) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong reaching the team.",
          );
        }
      } finally {
        if (mounted.current) {
          setTypingSpeaker(null);
          setIsBusy(false);
        }
      }
    },
    [messages, isBusy],
  );

  const resetConversation = useCallback(() => {
    setMessages([{ ...WELCOME, at: new Date() }]);
    setError(null);
    setTypingSpeaker(null);
    setIsBusy(false);
  }, []);

  return { messages, typingSpeaker, isBusy, error, sendMessage, resetConversation };
}
