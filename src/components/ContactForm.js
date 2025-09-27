import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setShowAlert(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <Card
      className="p-4 mb-4"
      style={{
        background: "white",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
      }}
    >
      <Card.Body>
        <h3 className="mb-4">Contact Us</h3>

        {showAlert && (
          <Alert className="custom-alert mb-4">
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message"
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Send Message
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;
