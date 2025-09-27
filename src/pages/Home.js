import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Hero from "../components/Hero";
import SearchFilter from "../components/SearchFilter";
import Stats from "../components/Stats";
import DestinationCard from "../components/DestinationCard";
import ContactForm from "../components/ContactForm";

const Home = ({ destinations, updateDestinations }) => {
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);

  useEffect(() => {
    setFilteredDestinations(destinations);
  }, [destinations]);

  const handleFilter = (filtered) => {
    setFilteredDestinations(filtered);
  };

  return (
    <div>
      <Hero />

      <Container>
        <SearchFilter destinations={destinations} onFilter={handleFilter} />

        <Stats destinations={destinations} />

        <Row className="g-4 mb-5">
          {filteredDestinations.length === 0 ? (
            <Col className="text-center py-5">
              <i className="fas fa-map-marked-alt fa-3x text-muted mb-3"></i>
              <h3 className="text-muted">No destinations found</h3>
              <p className="text-muted">
                Add your first destination to get started!
              </p>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "/add")}
              >
                Add Your First Destination
              </Button>
            </Col>
          ) : (
            filteredDestinations.map((destination) => (
              <Col key={destination.id} md={6} lg={4}>
                <DestinationCard
                  destination={destination}
                  onUpdate={updateDestinations}
                />
              </Col>
            ))
          )}
        </Row>

        <ContactForm />
      </Container>
    </div>
  );
};

export default Home;
