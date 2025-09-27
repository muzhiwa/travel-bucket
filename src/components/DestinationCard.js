import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  toggleVisitedStatus,
  deleteDestination,
} from "../services/localStorage";
import "../styles/App.css";

const DestinationCard = ({ destination, onUpdate }) => {
  const navigate = useNavigate();

  const handleToggleVisited = () => {
    const updatedDestinations = toggleVisitedStatus(destination.id);
    onUpdate(updatedDestinations);
  };

  const handleEdit = () => {
    navigate("/add", { state: { destination } });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      const updatedDestinations = deleteDestination(destination.id);
      onUpdate(updatedDestinations);
    }
  };

  return (
    <Card className="destination-card h-100">
      {destination.photo ? (
        <div
          className="card-image"
          style={{
            height: "200px",
            backgroundImage: `url('${destination.photo}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {destination.visited && (
            <Badge
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background:
                  "linear-gradient(135deg, var(--secondary) 0%, var(--primary-dark) 100%)",
                color: "white",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                border: "none",
              }}
            >
              Visited
            </Badge>
          )}
        </div>
      ) : (
        <div
          className="card-image d-flex align-items-center justify-content-center"
          style={{
            height: "200px",
            background: "linear-gradient(135deg, #4f3b78 0%, #c4bbf0 100%)",
          }}
        >
          <i className="fas fa-map-marker-alt fa-3x text-white"></i>
          {destination.visited && (
            <Badge
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background:
                  "linear-gradient(135deg, var(--secondary) 0%, var(--primary-dark) 100%)",
                color: "white",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                border: "none",
              }}
            >
              Visited
            </Badge>
          )}
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title
          className="destination-name"
          style={{ fontSize: "1.4rem", fontWeight: "700" }}
        >
          {destination.name}
        </Card.Title>
        <Card.Text
          className="destination-location text-muted"
          style={{ fontSize: "0.95rem" }}
        >
          {destination.city ? `${destination.city}, ` : ""}
          {destination.country}
        </Card.Text>

        {destination.tags.length > 0 && (
          <div className="destination-tags mb-2">
            {destination.tags.map((tag, index) => (
              <span
                key={index}
                className="tag me-1 mb-1"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  display: "inline-block",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {destination.notes && (
          <Card.Text
            className="destination-notes text-muted flex-grow-1"
            style={{
              fontSize: "0.95rem",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {destination.notes}
          </Card.Text>
        )}

        <div className="card-actions mt-auto">
          <button
            className="action-btn btn btn-outline-primary btn-sm"
            onClick={handleToggleVisited}
            title={
              destination.visited ? "Mark as unvisited" : "Mark as visited"
            }
          >
            <i
              className={`fas fa-${destination.visited ? "undo" : "check"}`}
            ></i>
          </button>
          <button
            className="action-btn btn btn-outline-secondary btn-sm"
            onClick={handleEdit}
            title="Edit"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="action-btn btn btn-outline-danger btn-sm"
            onClick={handleDelete}
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DestinationCard;
