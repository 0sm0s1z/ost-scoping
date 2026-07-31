"use client";

import { useEffect, useRef } from "react";

import { PERSONAS, type PersonaId } from "@/lib/canon";
import type { InterviewMessage } from "@/hooks/useInterview";
import { Avatar } from "./Avatar";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="t-system-message">
      <div className="t-system-message-inner">{children}</div>
    </div>
  );
}

function ChatMessage({
  message,
  showHeader,
}: {
  message: InterviewMessage;
  showHeader: boolean;
}) {
  const isUser = message.role === "user";
  const persona = message.speakerId ? PERSONAS[message.speakerId] : null;
  const authorName = isUser ? "You" : (persona?.name ?? "Ellingson team");
  const timestamp = formatTime(message.at);

  return (
    <article
      className={`t-msg ${isUser ? "t-msg-user" : "t-msg-other"} t-msg-animate`}
    >
      {!isUser && (
        <div className="t-msg-avatar-col">
          {showHeader && persona ? (
            <Avatar
              name={persona.name}
              initials={persona.initials}
              variant={persona.id}
              size="md"
              presence={persona.presence}
            />
          ) : (
            <div className="t-avatar-spacer" />
          )}
        </div>
      )}

      <div className="t-msg-body">
        {!isUser && showHeader && (
          <header className="t-msg-header">
            <span className="t-msg-author">{authorName}</span>
            {persona && (
              <span className="t-msg-role">{persona.title}</span>
            )}
            <time dateTime={message.at.toISOString()}>{timestamp}</time>
          </header>
        )}
        {isUser && (
          <header className="t-msg-header t-msg-header-user">
            <time dateTime={message.at.toISOString()}>{timestamp}</time>
            <span className="t-msg-author">You</span>
          </header>
        )}

        <div
          className={`t-msg-bubble ${
            isUser ? "t-msg-bubble-user" : "t-msg-bubble-other"
          }`}
        >
          <p>{message.text}</p>
        </div>
      </div>

      {isUser && (
        <div className="t-msg-avatar-col">
          <Avatar name="You" initials="ME" variant="user" size="md" />
        </div>
      )}
    </article>
  );
}

function TypingIndicator({ speakerId }: { speakerId: PersonaId }) {
  const persona = PERSONAS[speakerId];
  return (
    <article className="t-msg t-msg-other t-msg-animate" aria-live="polite">
      <div className="t-msg-avatar-col">
        <Avatar
          name={persona.name}
          initials={persona.initials}
          variant={persona.id}
          size="md"
          presence={persona.presence}
        />
      </div>
      <div className="t-msg-body">
        <header className="t-msg-header">
          <span className="t-msg-author">{persona.name}</span>
          <span className="t-typing-label">is typing…</span>
        </header>
        <div className="t-msg-bubble t-msg-bubble-other t-typing-bubble">
          <span />
          <span />
          <span />
        </div>
      </div>
    </article>
  );
}

type MessageThreadProps = {
  messages: InterviewMessage[];
  typingSpeaker: PersonaId | null;
  error: string | null;
};

export function MessageThread({
  messages,
  typingSpeaker,
  error,
}: MessageThreadProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }, [messages, typingSpeaker]);

  return (
    <div className="t-thread">
      <div className="t-thread-inner">
        <SystemMessage>
          <strong>Group chat started</strong> — EVA Scoping · Ellingson Mineral
          Company
          <br />
          <span className="t-system-meta">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            · Lab simulation — participants are AI-played
          </span>
        </SystemMessage>

        <div className="t-date-pill">
          <span>Today</span>
        </div>

        {messages.map((m, index) => {
          if (m.role === "system") {
            return (
              <SystemMessage key={m.id}>
                <strong>{m.text}</strong>
              </SystemMessage>
            );
          }

          const prev = [...messages.slice(0, index)]
            .reverse()
            .find((x) => x.role !== "system");
          const showHeader =
            m.role === "persona" &&
            (index === 0 ||
              prev?.role !== "persona" ||
              prev?.speakerId !== m.speakerId);

          return <ChatMessage key={m.id} message={m} showHeader={showHeader} />;
        })}

        {typingSpeaker && <TypingIndicator speakerId={typingSpeaker} />}

        {error && (
          <div className="t-error-banner" role="alert">
            {error}
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
