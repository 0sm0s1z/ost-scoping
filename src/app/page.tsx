"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="min-h-screen bg-white">
      {/* Teams-like header */}
      <div className="teams-header">
        <div className="teams-header-content">
          <div className="teams-avatar">DM</div>
          <div>
            <h1 className="text-lg font-semibold m-0">Dade Murphy</h1>
            <p className="text-sm text-gray-200 m-0">
              CISO - Ellington Mineral Company
            </p>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="teams-chat-container">
        {/* Welcome message */}
        <div className="teams-message">
          <div className="teams-avatar">DM</div>
          <div className="teams-message-content teams-message-assistant">
            <p className="m-0">
              Welcome to the Ellington Mineral Company&apos;s cybersecurity
              scoping discussion. I&apos;m Dade Murphy, the CISO. How can I help
              you with planning the vulnerability assessment today?
            </p>
          </div>
        </div>

        {/* Chat messages */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`teams-message ${
              m.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {m.role === "assistant" && <div className="teams-avatar">DM</div>}
            <div
              className={`teams-message-content ${
                m.role === "user"
                  ? "teams-message-user"
                  : "teams-message-assistant"
              }`}
            >
              <p className="m-0 whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input container */}
      <div className="teams-input-container">
        <form onSubmit={handleSubmit} className="teams-input">
          <input
            className="flex-1 border-0 bg-transparent p-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="rounded-md bg-[#464775] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5B5C98] focus:outline-none focus:ring-2 focus:ring-[#464775] focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
