"use client";

import type { PersonaId } from "@/lib/canon";
import { PERSONA_ORDER, PERSONAS } from "@/lib/canon";
import type { InterviewMessage } from "@/hooks/useInterview";
import { Avatar } from "./Avatar";
import { ComposeBox } from "./ComposeBox";
import { IconMore, IconPhone, IconVideo } from "./icons";
import { MessageThread } from "./MessageThread";

type ConversationPanelProps = {
  messages: InterviewMessage[];
  typingSpeaker: PersonaId | null;
  isBusy: boolean;
  error: string | null;
  onSend: (text: string) => void;
  onReset: () => void;
};

export function ConversationPanel({
  messages,
  typingSpeaker,
  isBusy,
  error,
  onSend,
  onReset,
}: ConversationPanelProps) {
  const participantCount = PERSONA_ORDER.length + 1;

  return (
    <section
      className="t-conversation"
      aria-label="Group conversation: EVA Scoping — Ellingson"
    >
      <div className="t-meeting-strip">
        <div className="t-meeting-strip-left">
          <span className="t-meeting-live-dot" />
          <span className="t-meeting-strip-title">
            EVA Scoping — Ellingson Mineral
          </span>
          <span className="t-meeting-strip-meta">
            {participantCount} participants · In progress
          </span>
        </div>
        <div className="t-meeting-strip-actions t-inert" aria-hidden>
          <span className="t-meeting-strip-btn">
            <IconPhone /> Join audio
          </span>
          <span className="t-meeting-strip-btn t-meeting-strip-btn-primary">
            <IconVideo /> Camera off
          </span>
        </div>
      </div>

      <header className="t-conv-header">
        <div className="t-conv-header-left">
          <div className="t-group-avatars" aria-hidden>
            {PERSONA_ORDER.slice(0, 3).map((id) => (
              <Avatar
                key={id}
                name={PERSONAS[id].name}
                initials={PERSONAS[id].initials}
                variant={id}
                size="sm"
                className="t-group-avatar"
              />
            ))}
          </div>
          <div>
            <h1>EVA Scoping — Ellingson</h1>
            <p>
              {PERSONA_ORDER.map((id) => PERSONAS[id].name.split(" ")[0]).join(
                ", ",
              )}{" "}
              and you
            </p>
          </div>
        </div>

        <div className="t-conv-header-actions">
          <button
            type="button"
            className="t-header-icon-btn t-header-reset"
            onClick={onReset}
            title="Restart interview"
            aria-label="Restart interview"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path d="M10 3a7 7 0 105.6 2.8l1.2-1.2A.75.75 0 0018 4.07V1.75a.75.75 0 00-1.28-.53l-.94.94A8.5 8.5 0 1018.5 10a.75.75 0 00-1.5 0A7 7 0 1110 3z" />
            </svg>
            <span className="t-header-reset-label">Restart</span>
          </button>
          <span className="t-header-divider" />
          <span className="t-inert" aria-hidden>
            <span className="t-header-icon-btn">
              <IconVideo />
            </span>
          </span>
          <span className="t-inert" aria-hidden>
            <span className="t-header-icon-btn">
              <IconMore />
            </span>
          </span>
        </div>
      </header>

      <MessageThread
        messages={messages}
        typingSpeaker={typingSpeaker}
        error={error}
      />

      <ComposeBox isBusy={isBusy} onSend={onSend} />
    </section>
  );
}
