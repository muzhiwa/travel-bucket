import React from "react";
import { Container } from "react-bootstrap";
import AIChat from "../components/AIChat";

const AIPage = () => {
  return (
    <Container className="py-5" style={{ paddingTop: "100px" }}>
      <div
        className="p-4"
        style={{
          background: "white",
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--box-shadow)",
        }}
      >
        <h2 className="mb-4">AI Travel Assistant</h2>
        <AIChat />
      </div>
    </Container>
  );
};

export default AIPage;
