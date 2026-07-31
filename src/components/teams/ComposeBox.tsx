"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";

import { IconSend } from "./icons";

const MAX_LENGTH = 2000;

type ComposeBoxProps = {
  isBusy: boolean;
  onSend: (text: string) => void;
};

export function ComposeBox({ isBusy, onSend }: ComposeBoxProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = input.trim().length > 0 && !isBusy;

  const submit = () => {
    if (!canSend) return;
    onSend(input);
    setInput("");
    textareaRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <footer className="t-compose">
      <form className="t-compose-card" onSubmit={handleSubmit}>
        <div className="t-compose-top">
          <textarea
            ref={textareaRef}
            className="t-compose-input"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_LENGTH))}
            onKeyDown={handleKeyDown}
            placeholder="Ask the Ellingson team a scoping question"
            rows={1}
            maxLength={MAX_LENGTH}
            aria-label="Message the Ellingson team"
          />
        </div>

        <div className="t-compose-bottom">
          <p className="t-compose-hint">
            {isBusy
              ? "The team is replying…"
              : "Enter to send · Shift+Enter for a new line"}
          </p>

          <div className="t-compose-send-group">
            <button
              type="submit"
              className="t-compose-send"
              disabled={!canSend}
              aria-label="Send message"
            >
              <IconSend />
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
}
