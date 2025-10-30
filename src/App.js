import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddDestination from "./pages/AddDestination";
import PhotoSearchPage from "./pages/PhotoSearchPage";
import AIPage from "./pages/AIPage";
import AITravelPlanner from "./pages/AITravelPlanner";
import ScrollToTop from "./components/Scroller";
import { getDestinations } from "./services/localStorage";
import "./styles/App.css";

function App() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const savedDestinations = getDestinations();
    setDestinations(savedDestinations);
  }, []);

  const updateDestinations = (newDestinations) => {
    setDestinations(newDestinations);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content" style={{ paddingTop: "80px" }}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                destinations={destinations}
                updateDestinations={updateDestinations}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddDestination
                destinations={destinations}
                updateDestinations={updateDestinations}
              />
            }
          />
          <Route path="/photos" element={<PhotoSearchPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/ai-planner" element={<AITravelPlanner />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
