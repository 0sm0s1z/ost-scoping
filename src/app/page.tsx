"use client";

import { Header } from "@/components/Header";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <>
      <Header />
      <div className="flex flex-col w-full max-w-md pt-24 pb-4 mx-auto stretch">
       {"Welcome to the Ellison Mineral Company's Cybersecurity Scoping Chat. Use the input field below to communicate with our team and structure a scope of work for our upcoming cybersecurity engagement."}
      </div>
      <hr className="border-[#F89C27] w-full max-w-md mx-auto stretch" />
      <div className="flex flex-col w-full max-w-md py-8 mx-auto stretch gap-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "Security Tester: " : "Ellison Mineral: "}
            <hr className="py-2 border-[#F89C27]/50"/>
            {m.toolInvocations ? (
              <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
            ) : (
              <p>{m.content}</p>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed text-gray-700 bottom-0 w-full max-w-md p-2 mb-8 shadow-xl border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 rounded-lg border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}
