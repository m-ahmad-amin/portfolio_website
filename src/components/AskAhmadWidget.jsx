import { useEffect, useRef, useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";

const STARTER_PROMPTS = [
  "What projects has Ahmad built?",
  "Tell me about Ahmad's experience",
  "What tech stack does Ahmad use?",
];

function createMessage(role, content) {
  return { id: crypto.randomUUID(), role, content };
}

export default function AskAhmadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    createMessage(
      "assistant",
      "Hi! Ask me anything about Ahmad, his professional experience, research experience, projects, skills, or background."
    ),
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const payload = nextMessages
        .filter((message) => message.role === "user" || message.role === "assistant")
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.reply),
      ]);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to get a response right now.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 font-poppins flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-[min(92vw,360px)] rounded-2xl border border-[#30363d] bg-[#161b22] shadow-2xl shadow-black/40 animate-fade-up overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3">
            <div>
              <p className="text-white text-sm font-semibold">Ask about Ahmad</p>
              <p className="text-[#7d8590] text-[11px]">Powered by Groq</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#7d8590] hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          <div className="h-[320px] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#00f0ff] text-[#0D1117] px-3 py-2 text-sm leading-relaxed"
                      : "max-w-[85%] rounded-2xl rounded-bl-md bg-[#21262d] text-[#e6edf3] px-3 py-2 text-sm leading-relaxed"
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-[#21262d] px-3 py-2 text-sm text-[#7d8590]">
                  Thinking...
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs px-1">{error}</p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-[#30363d] px-3 py-1 text-[11px] text-[#c9d1d9] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-[#30363d] px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Ahmad..."
              maxLength={500}
              className="flex-1 rounded-xl bg-[#0D1117] border border-[#30363d] px-3 py-2 text-sm text-white placeholder:text-[#7d8590] outline-none focus:border-[#00f0ff]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-[#00f0ff] p-2.5 text-[#0D1117] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
              aria-label="Send message"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="ml-auto flex items-center gap-2 rounded-full bg-[#00f0ff] px-4 py-3 text-[#0D1117] text-sm font-semibold shadow-lg shadow-[#00f0ff]/20 hover:brightness-110 transition-all"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        <span>{isOpen ? "Close" : "Ask about Ahmad"}</span>
      </button>
    </div>
  );
}
