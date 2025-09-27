import React from "react";
import { Row, Col } from "react-bootstrap";

const Stats = ({ destinations }) => {
  const total = destinations.length;
  const visited = destinations.filter((d) => d.visited).length;
  const wishlist = destinations.filter((d) => d.priority === "wishlist").length;

  return (
    <div
      className="stats-section p-4 mb-4"
      style={{
        background: "white",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
      }}
    >
      <Row className="text-center">
        <Col md={4}>
          <div className="stat-card">
            <div
              className="stat-number"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem",
              }}
            >
              {total}
            </div>
            <div className="stat-label text-muted">Total Destinations</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card">
            <div
              className="stat-number"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem",
              }}
            >
              {visited}
            </div>
            <div className="stat-label text-muted">Visited</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card">
            <div
              className="stat-number"
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem",
              }}
            >
              {wishlist}
            </div>
            <div className="stat-label text-muted">On Wishlist</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
