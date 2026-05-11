"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PortfolioAssistant.module.css";

const starterQuestions = [
  "What kind of design work does Nima do?",
  "What AI tools and workflows does he use?"
];

const initialMessages = [
  {
    role: "assistant",
    content:
      "Hi, I can answer questions about Nima's design leadership, projects, software skills, and AI-assisted creative workflows."
  }
];

export default function PortfolioAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const canSubmit = useMemo(
    () => question.trim().length > 0 && !isLoading,
    [question, isLoading]
  );

  // Keep the client simple: it sends only the visitor question to the secure API route.
  async function askAssistant(nextQuestion = question) {
    const cleanQuestion = nextQuestion.trim();

    if (!cleanQuestion || isLoading) {
      return;
    }

    const userMessage = { role: "user", content: cleanQuestion };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: cleanQuestion })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The assistant could not answer right now.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.answer }
      ]);
    } catch (requestError) {
      setError(requestError.message);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "Sorry, I could not reach the portfolio assistant. Please try again in a moment."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  // The form and starter buttons share the same request flow for consistent states.
  function handleSubmit(event) {
    event.preventDefault();
    askAssistant();
  }

  function resetChat() {
    setMessages(initialMessages);
    setQuestion("");
    setError("");
    setIsLoading(false);
  }

  const visibleMessages = messages.slice(1);
  const hasConversation = visibleMessages.length > 0 || isLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [messages, isLoading]);

  return (
    <section className={styles.assistantSection} aria-labelledby="portfolio-assistant-title">
      <div className={styles.homeShell}>
        <h2 id="portfolio-assistant-title">NimaGPT</h2>
        <p className={styles.intro}>
          Ask about Nima&apos;s design leadership, creative operations, AI workflows,
          software capabilities, and portfolio projects.
        </p>

        {!hasConversation ? (
          <div className={styles.promptPanel}>
            <form className={styles.inputRow} onSubmit={handleSubmit}>
              <label className={styles.inputLabel} htmlFor="portfolio-assistant-question">
                Ask a question
              </label>
              <input
                id="portfolio-assistant-question"
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about Nima's skills, projects, leadership, or AI workflows..."
                type="text"
                value={question}
              />
              <button disabled={!canSubmit} type="submit" aria-label="Ask assistant">
                Ask
              </button>
            </form>

            <div className={styles.starters} aria-label="Suggested questions">
              {starterQuestions.map((starterQuestion) => (
                <button
                  className={styles.starterButton}
                  disabled={isLoading}
                  key={starterQuestion}
                  onClick={() => askAssistant(starterQuestion)}
                  type="button"
                >
                  {starterQuestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.chatPanel}>
            <div className={styles.chatToolbar}>
              <span>Conversation</span>
              <button onClick={resetChat} type="button">
                Reset
              </button>
            </div>

            <div className={styles.messages} aria-live="polite">
              {visibleMessages.map((message, index) => (
                <div
                  className={`${styles.message} ${
                    message.role === "user" ? styles.userMessage : styles.assistantMessage
                  }`}
                  key={`${message.role}-${index}`}
                >
                  <span className={styles.messageLabel}>
                    {message.role === "user" ? "You" : "Assistant"}
                  </span>
                  <p>{message.content}</p>
                </div>
              ))}

              {isLoading && (
                <div className={`${styles.message} ${styles.assistantMessage}`}>
                  <span className={styles.messageLabel}>Assistant</span>
                  <p>Thinking...</p>
                </div>
              )}

              <div ref={messagesEndRef} aria-hidden="true" />
            </div>

            <form className={styles.inputRow} onSubmit={handleSubmit}>
              <label className={styles.inputLabel} htmlFor="portfolio-assistant-followup">
                Ask a follow-up
              </label>
              <input
                id="portfolio-assistant-followup"
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask a follow-up..."
                type="text"
                value={question}
              />
              <button disabled={!canSubmit} type="submit" aria-label="Ask assistant">
                {isLoading ? "..." : "Ask"}
              </button>
            </form>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
}
