"use client";

import { PERSONA_ORDER, PERSONAS, type PersonaId } from "@/lib/canon";
import type { InterviewMessage } from "@/hooks/useInterview";
import { Avatar } from "./Avatar";
import { IconSearch } from "./icons";

type ChatListPanelProps = {
  lastMessage?: InterviewMessage;
  onSelectPersona: (id: PersonaId) => void;
};

function previewFor(message?: InterviewMessage): string {
  if (!message) return "Scoping interview";
  const author =
    message.role === "user"
      ? "You"
      : message.speakerId
        ? PERSONAS[message.speakerId].name.split(" ")[0]
        : "Team";
  return `${author}: ${message.text}`;
}

export function ChatListPanel({
  lastMessage,
  onSelectPersona,
}: ChatListPanelProps) {
  return (
    <aside className="t-chat-list-panel" aria-label="Chats">
      <header className="t-chat-list-header">
        <div className="t-chat-list-title-row">
          <div className="t-chat-list-title-btn">
            <h2>Chat</h2>
          </div>
        </div>

        <div className="t-global-search t-inert" aria-hidden>
          <IconSearch />
          <input type="search" placeholder="Search (⌘ E)" readOnly tabIndex={-1} />
        </div>
      </header>

      <div className="t-chat-list-scroll">
        <p className="t-chat-list-section">Recent</p>
        <ul className="t-chat-list">
          <li>
            <div
              className="t-chat-list-item t-chat-list-item-active"
              aria-current="true"
            >
              <Avatar
                name="EVA Scoping — Ellingson"
                initials="EV"
                variant="neutral"
                size="md"
              />
              <div className="t-chat-list-item-body">
                <div className="t-chat-list-item-top">
                  <span className="t-chat-list-item-name">
                    EVA Scoping — Ellingson
                  </span>
                  <span className="t-chat-list-item-time">Now</span>
                </div>
                <p className="t-chat-list-item-preview">
                  {previewFor(lastMessage)}
                </p>
              </div>
            </div>
          </li>
        </ul>

        <p className="t-chat-list-section">In this chat</p>
        <ul className="t-chat-list">
          {PERSONA_ORDER.map((id) => {
            const p = PERSONAS[id];
            return (
              <li key={id}>
                <button
                  type="button"
                  className="t-chat-list-item"
                  onClick={() => onSelectPersona(id)}
                  aria-label={`View profile: ${p.name}, ${p.title}`}
                >
                  <Avatar
                    name={p.name}
                    initials={p.initials}
                    variant={id}
                    size="md"
                    presence={p.presence}
                  />
                  <div className="t-chat-list-item-body">
                    <div className="t-chat-list-item-top">
                      <span className="t-chat-list-item-name">{p.name}</span>
                    </div>
                    <p className="t-chat-list-item-preview">{p.title}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
