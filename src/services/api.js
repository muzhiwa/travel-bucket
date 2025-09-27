// API service for external APIs

export const searchPhotos = async (keyword) => {
  try {
    const pexelsApiKey =
      "ZZ49rds8q9AA8fEKRMc0EQuC30N1v9M75WzrsmzoWQ2GA6QgQnTTFJiw";
    const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      keyword
    )}&per_page=15`;

    const response = await fetch(pexelsApiUrl, {
      headers: {
        Authorization: pexelsApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching photos:", error);
    throw error;
  }
};

export const getAIResponse = async (prompt) => {
  try {
    const apiKey = "71260f74c15bct2a0o7b939feaa3813b";
    const context = encodeURIComponent(
      "You are a travel assistant. Provide helpful, accurate information about travel destinations, tips, and recommendations. Use markdown formatting for your response with headings, lists, and emphasis."
    );
    const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${context}&key=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error;
  }
};
