import React from "react";
import { Container } from "react-bootstrap";
import PhotoSearch from "../components/PhotoSearch";
import { useNavigate, useLocation } from "react-router-dom";

const PhotoSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePhotoSelect = (photoUrl) => {
    if (location.state && location.state.returnToAdd) {
      navigate("/add", {
        state: { selectedPhoto: photoUrl },
      });
    } else {o
      navigate("/add", {
        state: { selectedPhoto: photoUrl },
      });
    }
  };

  return (
    <Container className="py-5" style={{ paddingTop: "100px" }}>
      <div
        className="p-4 mb-4"
        style={{
          background: "white",
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--box-shadow)",
        }}
      >
        <h2 className="mb-4">Search Destination Photos</h2>
        <PhotoSearch onPhotoSelect={handlePhotoSelect} />
      </div>
    </Container>
  );
};

export default PhotoSearchPage;
