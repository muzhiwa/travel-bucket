import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {
  saveDestination,
  updateDestination,
} from "../services/localStorage";

const AddDestination = ({ destinations, updateDestinations }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    country: "",
    city: "",
    notes: "",
    visited: false,
    visitedDate: "",
    priority: "wishlist",
    photo: "",
  });

  useEffect(() => {
    if (location.state && location.state.destination) {
      const destination = location.state.destination;
      setIsEditing(true);
      setFormData({
        id: destination.id,
        name: destination.name,
        country: destination.country,
        city: destination.city || "",
        notes: destination.notes || "",
        visited: destination.visited || false,
        visitedDate: destination.visitedDate || "",
        priority: destination.priority || "wishlist",
        photo: destination.photo || "",
      });
      setTags(destination.tags || []);
    }

    if (location.state && location.state.selectedPhoto) {
      setFormData((prev) => ({
        ...prev,
        photo: location.state.selectedPhoto,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.country) {
      alert("Please fill in all required fields");
      return;
    }

    if (
      formData.notes &&
      (formData.notes.length < 20 || formData.notes.length > 300)
    ) {
      alert("Notes must be between 20 and 300 characters");
      return;
    }

    const destinationData = {
      ...formData,
      tags: tags,
      createdAt: isEditing ? formData.createdAt : new Date().toISOString(),
    };

    let updatedDestinations;
    if (isEditing) {
      updatedDestinations = updateDestination(formData.id, destinationData);
    } else {
      destinationData.id = Date.now().toString();
      updatedDestinations = saveDestination(destinationData);
    }

    updateDestinations(updatedDestinations);

    setShowToast(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Container className="py-5" style={{ paddingTop: "100px" }}>
      {showToast && (
        <Alert
          className="position-fixed top-0 end-0 m-3 custom-alert"
          style={{ zIndex: 1050 }}
        >
          Destination {isEditing ? "updated" : "added"} successfully!
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={8}>
          <div
            className="p-4"
            style={{
              background: "white",
              borderRadius: "var(--border-radius)",
              boxShadow: "var(--box-shadow)",
            }}
          >
            <h2 className="mb-4">
              {isEditing ? "Edit Destination" : "Add New Destination"}
            </h2>

            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Destination Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Country *</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Notes (20-300 characters)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      minLength={20}
                      maxLength={300}
                    />
                    <Form.Text className="text-muted">
                      {formData.notes.length}/300 characters
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Check
                    type="checkbox"
                    name="visited"
                    label="Mark as visited"
                    checked={formData.visited}
                    onChange={handleInputChange}
                    className="mb-2"
                  />

                  {formData.visited && (
                    <Form.Group>
                      <Form.Label>Date Visited</Form.Label>
                      <Form.Control
                        type="date"
                        name="visitedDate"
                        value={formData.visitedDate}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  )}
                </Col>

                <Col xs={12}>
                  <Form.Label>Tags</Form.Label>
                  <div
                    className="p-3"
                    style={{
                      border: "1px solid #dee2e6",
                      borderRadius: "0.375rem",
                      minHeight: "50px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge bg-primary d-flex align-items-center"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                          padding: "0.5rem 0.75rem",
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: "0.7rem" }}
                          onClick={() => removeTag(tag)}
                        ></button>
                      </span>
                    ))}
                    <Form.Control
                      type="text"
                      placeholder="Type a tag and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInput}
                      style={{
                        border: "none",
                        outline: "none",
                        flex: 1,
                        minWidth: "150px",
                      }}
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="wishlist">Wishlist</option>
                      <option value="soon">Soon</option>
                      <option value="planned">Planned</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Photo URL (optional)</Form.Label>
                    <Form.Control
                      type="url"
                      name="photo"
                      value={formData.photo}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Form.Group>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      navigate("/photos", {
                        state: { returnToAdd: true },
                      })
                    }
                  >
                    Search Photos
                  </Button>
                </Col>

                <Col xs={12} className="mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 py-3"
                  >
                    {isEditing ? "Update Destination" : "Add Destination"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDestination;
