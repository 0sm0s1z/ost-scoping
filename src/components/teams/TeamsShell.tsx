"use client";

import { useState } from "react";

import type { PersonaId } from "@/lib/canon";
import { useInterview } from "@/hooks/useInterview";
import { AppRail } from "./AppRail";
import { ChatListPanel } from "./ChatListPanel";
import { ConversationPanel } from "./ConversationPanel";
import { RightPanel } from "./RightPanel";
import { TitleBar } from "./TitleBar";

export function TeamsShell() {
  const interview = useInterview();
  const [selectedPersona, setSelectedPersona] = useState<PersonaId | null>(
    null,
  );

  return (
    <div className="t-shell">
      <TitleBar />
      <div className="t-workspace">
        <AppRail />
        <ChatListPanel
          lastMessage={interview.messages[interview.messages.length - 1]}
          onSelectPersona={setSelectedPersona}
        />
        <ConversationPanel
          messages={interview.messages}
          typingSpeaker={interview.typingSpeaker}
          isBusy={interview.isBusy}
          error={interview.error}
          onSend={interview.sendMessage}
          onReset={interview.resetConversation}
        />
        <RightPanel
          selectedPersona={selectedPersona}
          onSelectPersona={setSelectedPersona}
        />
      </div>
    </div>
  );
}
