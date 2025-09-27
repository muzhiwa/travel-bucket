// localStorage service for managing destinations
import { loadSampleData, isNewUser } from "../components/content.js";

export const getDestinations = () => {
  try {
    // Check if user is new and load sample data if needed
    if (isNewUser()) {
      return loadSampleData();
    }

    const destinations = localStorage.getItem("travelDestinations");
    return destinations ? JSON.parse(destinations) : [];
  } catch (error) {
    console.error("Error loading destinations from localStorage:", error);
    return [];
  }
};

export const saveDestination = (destination) => {
  try {
    const destinations = getDestinations();
    const updatedDestinations = [...destinations, destination];
    localStorage.setItem(
      "travelDestinations",
      JSON.stringify(updatedDestinations)
    );
    return updatedDestinations;
  } catch (error) {
    console.error("Error saving destination to localStorage:", error);
    return getDestinations();
  }
};

export const updateDestination = (id, updatedData) => {
  try {
    const destinations = getDestinations();
    const updatedDestinations = destinations.map((dest) =>
      dest.id === id ? { ...dest, ...updatedData } : dest
    );
    localStorage.setItem(
      "travelDestinations",
      JSON.stringify(updatedDestinations)
    );
    return updatedDestinations;
  } catch (error) {
    console.error("Error updating destination in localStorage:", error);
    return getDestinations();
  }
};

export const deleteDestination = (id) => {
  try {
    const destinations = getDestinations();
    const updatedDestinations = destinations.filter((dest) => dest.id !== id);
    localStorage.setItem(
      "travelDestinations",
      JSON.stringify(updatedDestinations)
    );
    return updatedDestinations;
  } catch (error) {
    console.error("Error deleting destination from localStorage:", error);
    return getDestinations();
  }
};

export const toggleVisitedStatus = (id) => {
  try {
    const destinations = getDestinations();
    const updatedDestinations = destinations.map((dest) => {
      if (dest.id === id) {
        const visited = !dest.visited;
        return {
          ...dest,
          visited,
          visitedDate: visited ? new Date().toISOString().split("T")[0] : null,
        };
      }
      return dest;
    });
    localStorage.setItem(
      "travelDestinations",
      JSON.stringify(updatedDestinations)
    );
    return updatedDestinations;
  } catch (error) {
    console.error("Error toggling visited status in localStorage:", error);
    return getDestinations();
  }
};
