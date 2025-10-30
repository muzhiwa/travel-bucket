import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { marked } from "marked";
import html2pdf from "html2pdf.js";

import "../styles/AITravelPlanner.css";

const AITravelPlanner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: "",
    travelers: "",
    duration: "",
    destinationType: "",
    activities: [],
    season: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState("");
  const [error, setError] = useState("");

  const activityOptions = [
    "Adventure",
    "Relaxation",
    "Cultural",
    "Food & Dining",
    "Shopping",
    "Nature",
    "Historical",
    "Nightlife",
    "Beach",
    "Mountains",
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        activities: checked
          ? [...prev.activities, value]
          : prev.activities.filter((activity) => activity !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    scrollToTop();
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    scrollToTop();
  };

  const generateTravelPlan = async () => {
    setLoading(true);
    setError("");

    try {
      const prompt = `Create a detailed travel plan based on these preferences:
      - Budget: ${formData.budget}
      - Number of travelers: ${formData.travelers}
      - Trip duration: ${formData.duration} days
      - Destination type: ${formData.destinationType}
      - Preferred activities: ${formData.activities.join(", ")}
      - Travel season: ${formData.season}
      - Special interests: ${formData.interests || "None specified"}

      Please provide a comprehensive travel plan including:
      1. Recommended destinations
      2. Daily itinerary
      3. Budget breakdown
      4. Accommodation suggestions
      5. Activity recommendations
      6. Travel tips
      7. Must-try local experiences

      Format the response using markdown with clear sections and bullet points.`;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate travel plan");
      }

      const data = await response.json();
      const plan = data.choices[0].message.content;
      setTravelPlan(plan);
      setStep(5);
      scrollToTop();
    } catch (err) {
      setError("Failed to generate travel plan. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetPlanner = () => {
    setStep(1);
    setFormData({
      budget: "",
      travelers: "",
      duration: "",
      destinationType: "",
      activities: [],
      season: "",
      interests: "",
    });
    setTravelPlan("");
    scrollToTop();
  };

  const downloadPDF = () => {
    const element = document.querySelector(".travel-plan-content");
    const options = {
      margin: 10,
      filename: "AI_Travel_Plan.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <Container className="py-5 ai-travel-planner-container">
      <div className="text-center mb-5">
        <h1 className="ai-travel-planner-title">AI Travel Planner</h1>
        <p className="ai-travel-planner-subtitle">
          Tell us your preferences and let AI create your perfect travel
          itinerary
        </p>
      </div>

      <Card className="ai-travel-planner-card">
        <Card.Body className="p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="progress-bar-background">
              <div
                className="progress-bar-fill"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="progress-step-text">Step {step} of 5</small>
            </div>
          </div>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <h4 className="step-title">Basic Information</h4>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Budget Range *
                    </Form.Label>
                    <Form.Select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="form-select-custom"
                    >
                      <option value="">Select budget range</option>
                      <option value="Budget ($500-$1000)">
                        Budget ($500-$1000)
                      </option>
                      <option value="Moderate ($1000-$3000)">
                        Moderate ($1000-$3000)
                      </option>
                      <option value="Luxury ($3000+)">Luxury ($3000+)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Number of Travelers *
                    </Form.Label>
                    <Form.Select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleInputChange}
                      required
                      className="form-select-custom"
                    >
                      <option value="">Select number</option>
                      <option value="Solo">Solo</option>
                      <option value="Couple (2)">Couple (2)</option>
                      <option value="Family (3-4)">Family (3-4)</option>
                      <option value="Group (5+)">Group (5+)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Trip Duration (Days) *
                    </Form.Label>
                    <Form.Select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="form-select-custom"
                    >
                      <option value="">Select duration</option>
                      <option value="3-5">3-5 days</option>
                      <option value="7">7 days</option>
                      <option value="10">10 days</option>
                      <option value="14">14+ days</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Preferred Season *
                    </Form.Label>
                    <Form.Select
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      required
                      className="form-select-custom"
                    >
                      <option value="">Select season</option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Fall">Fall</option>
                      <option value="Winter">Winter</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

          {/* Step 2: Destination & Activities */}
          {step === 2 && (
            <div>
              <h4 className="step-title">Destination & Activities</h4>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Destination Type *
                    </Form.Label>
                    <Form.Select
                      name="destinationType"
                      value={formData.destinationType}
                      onChange={handleInputChange}
                      required
                      className="form-select-custom"
                    >
                      <option value="">Select type</option>
                      <option value="Beach">Beach</option>
                      <option value="Mountain">Mountain</option>
                      <option value="City">City</option>
                      <option value="Countryside">Countryside</option>
                      <option value="Historical">Historical</option>
                      <option value="Tropical Island">Tropical Island</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Preferred Activities *
                    </Form.Label>
                    <div className="row">
                      {activityOptions.map((activity) => (
                        <div key={activity} className="col-md-4 mb-2">
                          <Form.Check
                            type="checkbox"
                            id={activity}
                            label={activity}
                            value={activity}
                            checked={formData.activities.includes(activity)}
                            onChange={handleInputChange}
                            className="activity-checkbox"
                          />
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

          {/* Step 3: Additional Preferences */}
          {step === 3 && (
            <div>
              <h4 className="step-title">Additional Preferences</h4>
              <Form.Group>
                <Form.Label className="form-label">
                  Special Interests or Requirements
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="E.g., Food preferences, accessibility needs, specific cultural interests..."
                  className="form-textarea-custom"
                />
              </Form.Group>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h4 className="step-title">Review Your Preferences</h4>
              <Card className="review-card">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p>
                        <strong>Budget:</strong> {formData.budget}
                      </p>
                      <p>
                        <strong>Travelers:</strong> {formData.travelers}
                      </p>
                      <p>
                        <strong>Duration:</strong> {formData.duration} days
                      </p>
                    </Col>
                    <Col md={6}>
                      <p>
                        <strong>Destination Type:</strong>{" "}
                        {formData.destinationType}
                      </p>
                      <p>
                        <strong>Season:</strong> {formData.season}
                      </p>
                      <p>
                        <strong>Activities:</strong>{" "}
                        {formData.activities.join(", ")}
                      </p>
                    </Col>
                  </Row>
                  {formData.interests && (
                    <p>
                      <strong>Special Interests:</strong> {formData.interests}
                    </p>
                  )}
                </Card.Body>
              </Card>
              <div className="text-center mt-4">
                <p className="review-text">
                  Ready to generate your personalized travel plan?
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Results */}
          {step === 5 && (
            <div>
              <h4 className="step-title">Your Personalized Travel Plan</h4>
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" className="loading-spinner" />
                  <p className="loading-text">
                    AI is crafting your perfect travel itinerary...
                  </p>
                </div>
              ) : travelPlan ? (
                <div>
                  <div
                    className="travel-plan-content"
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(travelPlan),
                    }}
                  />
                  <div className="text-center mt-4">
                    <Button
                      className="download-button me-2"
                      onClick={downloadPDF}
                    >
                      Download as PDF
                    </Button>
                    <Button className="reset-button" onClick={resetPlanner}>
                      Create Another Plan
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="navigation-buttons">
              <Button
                className="prev-button"
                onClick={prevStep}
                disabled={step === 1}
              >
                Previous
              </Button>

              {step === 4 ? (
                <Button
                  className="generate-button"
                  onClick={generateTravelPlan}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Travel Plan"
                  )}
                </Button>
              ) : (
                <Button
                  className="next-button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 &&
                      (!formData.budget ||
                        !formData.travelers ||
                        !formData.duration ||
                        !formData.season)) ||
                    (step === 2 &&
                      (!formData.destinationType ||
                        formData.activities.length === 0))
                  }
                >
                  Next
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AITravelPlanner;
