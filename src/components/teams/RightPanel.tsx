"use client";

import { useEffect, useState } from "react";

import { ORG, PERSONA_ORDER, PERSONAS, type PersonaId } from "@/lib/canon";
import { Avatar } from "./Avatar";
import { IconShield } from "./icons";

const tabs = ["Participants", "Interview goals"] as const;
type Tab = (typeof tabs)[number];

/**
 * Coaching prompts only — what a good scoping interview should establish.
 * Deliberately contains none of the environment answers.
 */
const INTERVIEW_GOALS = [
  "What decision will this assessment support, and who is the sponsor?",
  "What is the authorized network scope, and what is explicitly out of scope?",
  "How is the environment segmented, and what lives in each segment?",
  "Which systems are public-facing versus internal-only?",
  "Who owns which systems — and how reliable is the inventory?",
  "What is fragile, legacy, or business-critical enough to need special handling?",
  "Authenticated or unauthenticated scanning — and with what tooling?",
  "What methods are prohibited, and what requires written pre-approval?",
  "What testing windows, escalation contacts, and data-handling rules apply?",
] as const;

type RightPanelProps = {
  selectedPersona: PersonaId | null;
  onSelectPersona: (id: PersonaId | null) => void;
};

export function RightPanel({
  selectedPersona,
  onSelectPersona,
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Participants");

  useEffect(() => {
    if (selectedPersona) setActiveTab("Participants");
  }, [selectedPersona]);

  const persona = selectedPersona ? PERSONAS[selectedPersona] : null;

  return (
    <aside className="t-right-panel" aria-label="Conversation details">
      <div className="t-right-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            className={`t-right-tab ${activeTab === tab ? "t-right-tab-active" : ""}`}
            aria-selected={activeTab === tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab !== "Participants") onSelectPersona(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="t-right-scroll">
        {activeTab === "Participants" && persona && (
          <div className="t-profile-card">
            <button
              type="button"
              className="t-back-link"
              onClick={() => onSelectPersona(null)}
            >
              ← All participants
            </button>
            <Avatar
              name={persona.name}
              initials={persona.initials}
              variant={persona.id}
              size="lg"
              presence={persona.presence}
            />
            <h3>{persona.name}</h3>
            <p className="t-profile-role">{persona.title}</p>
            <p className="t-profile-org">{ORG.name}</p>

            <dl className="t-profile-facts">
              <div>
                <dt>Ask them about</dt>
                <dd>
                  <ul className="t-profile-owns">
                    {persona.owns.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="t-profile-lab-banner">
              <IconShield className="h-4 w-4 shrink-0" />
              <div>
                <strong>OST lab persona</strong>
                <p>AI-simulated stakeholder for the scoping exercise.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Participants" && !persona && (
          <div className="t-participants-card">
            <h3>Ellingson team</h3>
            <ul className="t-participants-list">
              {PERSONA_ORDER.map((id) => {
                const p = PERSONAS[id];
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className="t-participant-row"
                      onClick={() => onSelectPersona(id)}
                    >
                      <Avatar
                        name={p.name}
                        initials={p.initials}
                        variant={id}
                        size="sm"
                        presence={p.presence}
                      />
                      <span className="t-participant-meta">
                        <span className="t-participant-name">{p.name}</span>
                        <span className="t-participant-role">{p.title}</span>
                        <span className="t-participant-blurb">{p.blurb}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="t-participants-note">
              Different people own different parts of the environment. Direct
              your questions accordingly — they will redirect you if you ask
              the wrong person.
            </p>
          </div>
        )}

        {activeTab === "Interview goals" && (
          <div className="t-goals-card">
            <h3>What a complete scoping interview establishes</h3>
            <ol className="t-goals-list">
              {INTERVIEW_GOALS.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ol>
            <p className="t-goals-note">
              These are prompts, not answers — the details come from the team.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
