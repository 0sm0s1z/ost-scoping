"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { PersonaId } from "@/lib/canon";

export type InterviewMessage = {
  id: string;
  role: "user" | "persona" | "system";
  speakerId?: PersonaId;
  text: string;
  at: Date;
};

let counter = 0;
function nextId(prefix = "m") {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}

function makeWelcome(): InterviewMessage {
  return {
    id: nextId("welcome"),
    role: "persona",
    speakerId: "murphy",
    text: "Hey — thanks for jumping into the thread. Fire away with whatever you need to get this assessment scoped.",
    at: new Date(),
  };
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
  const [messages, setMessages] = useState<InterviewMessage[]>(() => [
    makeWelcome(),
  ]);
  const [typingSpeaker, setTypingSpeaker] = useState<PersonaId | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);
  const generation = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      abortRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isBusy) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const gen = generation.current;

      const userMessage: InterviewMessage = {
        id: nextId(),
        role: "user",
        text,
        at: new Date(),
      };

      let historyForApi: InterviewMessage[] = [];
      setMessages((prev) => {
        historyForApi = [...prev, userMessage];
        return historyForApi;
      });
      setIsBusy(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: historyForApi
              .filter((m) => m.role === "user" || m.role === "persona")
              .map((m) => ({
                role: m.role === "user" ? "user" : "persona",
                speakerId: m.speakerId,
                text: m.text,
              })),
          }),
        });

        if (gen !== generation.current || controller.signal.aborted) return;

        const data = (await res.json()) as {
          messages?: { speakerId: PersonaId; text: string }[];
          error?: string;
        };

        if (!res.ok || !data.messages?.length) {
          throw new Error(data.error ?? "The team did not respond.");
        }

        for (const reply of data.messages) {
          if (
            !mounted.current ||
            gen !== generation.current ||
            controller.signal.aborted
          ) {
            return;
          }
          setTypingSpeaker(reply.speakerId);
          await sleep(typingDelay(reply.text));
          if (
            !mounted.current ||
            gen !== generation.current ||
            controller.signal.aborted
          ) {
            return;
          }
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
        if (controller.signal.aborted || gen !== generation.current) return;
        if (mounted.current) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong reaching the team.",
          );
        }
      } finally {
        if (
          mounted.current &&
          gen === generation.current &&
          !controller.signal.aborted
        ) {
          setTypingSpeaker(null);
          setIsBusy(false);
        }
      }
    },
    [isBusy],
  );

  const resetConversation = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    generation.current += 1;
    setTypingSpeaker(null);
    setIsBusy(false);
    setError(null);
    setMessages([
      {
        id: nextId("system"),
        role: "system",
        text: "Interview restarted — previous messages cleared.",
        at: new Date(),
      },
      makeWelcome(),
    ]);
  }, []);

  return {
    messages,
    typingSpeaker,
    isBusy,
    error,
    sendMessage,
    resetConversation,
  };
}
