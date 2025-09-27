import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";

const SearchFilter = ({ destinations, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const countries = [...new Set(destinations.map((d) => d.country))].sort();
  const tags = [...new Set(destinations.flatMap((d) => d.tags))].sort();

  useEffect(() => {
    filterDestinations();
  }, [searchTerm, selectedCountry, selectedTag, statusFilter, destinations]);

  const filterDestinations = () => {
    const filtered = destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (destination.city &&
          destination.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        destination.notes.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry =
        !selectedCountry || destination.country === selectedCountry;
      const matchesTag = !selectedTag || destination.tags.includes(selectedTag);

      let matchesStatus = true;
      if (statusFilter === "visited") matchesStatus = destination.visited;
      if (statusFilter === "unvisited") matchesStatus = !destination.visited;

      return matchesSearch && matchesCountry && matchesTag && matchesStatus;
    });

    onFilter(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterDestinations();
  };

  return (
    <div
      className="search-filter-section p-4 mb-4"
      style={{
        background: "white",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
      }}
    >
      <Form onSubmit={handleSearch}>
        <Row className="g-3">
          <Col md={8}>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </div>
          </Col>
          <Col md={4}>
            <Row className="g-2">
              <Col>
                <Form.Select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <ButtonGroup>
              <Button
                variant={statusFilter === "all" ? "primary" : "outline-primary"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={
                  statusFilter === "visited" ? "primary" : "outline-primary"
                }
                onClick={() => setStatusFilter("visited")}
              >
                Visited
              </Button>
              <Button
                variant={
                  statusFilter === "unvisited" ? "primary" : "outline-primary"
                }
                onClick={() => setStatusFilter("unvisited")}
              >
                Unvisited
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchFilter;
