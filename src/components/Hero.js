import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section text-white py-5"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(79,59,120,0.8) 0%, rgba(196,187,240,0.8) 100%), url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "0 0 30px 30px",
        marginBottom: "3rem",
        boxShadow: "var(--box-shadow)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container className="text-center">
        <div className="hero-content">
          <h1
            className="display-4 fw-bold mb-4"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Your Travel Bucket List
          </h1>
          <p
            className="lead mb-4"
            style={{ fontSize: "1.3rem", opacity: "0.9" }}
          >
            Discover, plan, and track your dream destinations all in one place
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/add")}
            style={{
              background:
                "linear-gradient(135deg, var(--secondary) 0%,   #4f3b78 100%)",
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Start Adding Destinations
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
