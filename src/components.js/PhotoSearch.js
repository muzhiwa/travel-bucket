import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

const PhotoSearch = ({ onPhotoSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchPhotos = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const pexelsApiKey =
        "ZZ49rds8q9AA8fEKRMc0EQuC30N1v9M75WzrsmzoWQ2GA6QgQnTTFJiw";
      const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&per_page=15`;

      const response = await fetch(pexelsApiUrl, {
        headers: {
          Authorization: pexelsApiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error("Error searching photos:", error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={searchPhotos} className="mb-4">
        <Row className="g-3">
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Search for destination photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Search"}
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" role="status" className="mb-2">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Searching for photos...</p>
        </div>
      ) : !hasSearched ? (
        <div className="text-center py-4 text-muted">
          <i
            className="fas fa-search fa-3x mb-3"
            style={{ color: "#6c757d" }}
          ></i>
          <h4>Search for Your Next Destination</h4>
          <p>
            Enter a destination name above to find beautiful photos for your
            travel bucket list.
          </p>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <i
            className="fas fa-exclamation-triangle fa-3x mb-3"
            style={{ color: "var(--secondary)" }}
          ></i>
          <h4>No photos found</h4>
          <p>Try a different search term or check your spelling.</p>
        </div>
      ) : (
        <div
          className="masonry-grid"
          style={{
            columnCount: 3,
            columnGap: "1.5rem",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item mb-3"
              style={{
                breakInside: "avoid",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "var(--box-shadow)",
                transition: "var(--transition)",
                cursor: "pointer",
              }}
              onClick={() => onPhotoSelect(photo.src.large)}
            >
              <img
                src={photo.src.medium}
                alt={photo.photographer}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSearch;
