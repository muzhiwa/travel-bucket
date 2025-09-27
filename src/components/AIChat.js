import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { marked } from "marked";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your AI travel assistant. How can I help you with your travel plans today?",
      id: 1,
      hasBeenTyped: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const [lastAIMessageId, setLastAIMessageId] = useState(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage("");
    const newMessageId = messageIdCounter;
    setMessageIdCounter((prev) => prev + 1);

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
        id: newMessageId,
        hasBeenTyped: true, 
      },
    ]);
    setIsLoading(true);

    try {
      const apiKey = "71260f74c15bct2a0o7b939feaa3813b";
      const prompt = encodeURIComponent(userMessage);
      const context = encodeURIComponent(
        "You are a travel assistant. Provide helpful, accurate information about travel destinations, tips, and recommendations. Use markdown formatting for your response with headings, lists, and emphasis."
      );
      const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const aiMessageId = messageIdCounter;
      setMessageIdCounter((prev) => prev + 1);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.answer,
          id: aiMessageId,
          hasBeenTyped: false,
        },
      ]);
      setLastAIMessageId(aiMessageId);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessageId = messageIdCounter;
      setMessageIdCounter((prev) => prev + 1);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          id: errorMessageId,
          hasBeenTyped: true, 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypewriterComplete = (messageId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, hasBeenTyped: true } : msg
      )
    );
  };

  return (
    <div
      className="chat-container"
      style={{
        background: "white",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
        overflow: "hidden",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="chat-messages p-3"
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user" ? "user-message" : "ai-message"
            }`}
            style={{
              maxWidth: "80%",
              padding: "12px 18px",
              borderRadius: "18px",
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              background:
                message.sender === "user"
                  ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"
                  : "#f0f2f5",
              color: message.sender === "user" ? "white" : "#1c1e21",
              borderBottomRightRadius:
                message.sender === "user" ? "5px" : "18px",
              borderBottomLeftRadius:
                message.sender === "user" ? "18px" : "5px",
            }}
          >
            {message.sender === "ai" && !message.hasBeenTyped ? (
              <Typewriter
                key={message.id}
                options={{
                  delay: 20,
                  cursor: "",
                  loop: false,
                  deleteSpeed: 0,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(marked.parse(message.text))
                    .callFunction(() => {
                      handleTypewriterComplete(message.id);
                    })
                    .start();
                }}
              />
            ) : (
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: marked.parse(message.text) }}
                style={{ lineHeight: "1.5" }}
              />
            )}
          </div>
        ))}

        {isLoading && (
          <div
            className="message ai-message"
            style={{
              maxWidth: "80%",
              padding: "12px 18px",
              borderRadius: "18px",
              alignSelf: "flex-start",
              background: "#f0f2f5",
              borderBottomLeftRadius: "5px",
            }}
          >
            <div className="d-flex align-items-center">
              <Spinner animation="border" size="sm" className="me-2" />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div
        className="chat-input p-3"
        style={{
          borderTop: "1px solid #e0e0e0",
          background: "white",
        }}
      >
        <Form onSubmit={sendMessage} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Ask me anything about travel..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button
            variant="primary"
            type="submit"
            className="ms-2"
            disabled={isLoading || !inputMessage.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AIChat;
