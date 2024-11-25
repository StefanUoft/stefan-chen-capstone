import axios from "axios";

async function fetchDailyFortune() {
  try {
    const response = await axios.get(
      "https://api.allorigins.win/raw?url=https://api.viewbits.com/v1/fortunecookie?mode=today"
    );
    
    if (response.data && typeof response.data === "object") {
      return response.data.text || "No fortune available.";
    }

    return "No fortune available.";
  } catch (error) {
    console.error("Error fetching fortune of the day:", error);
    return "Error fetching your fortune.";
  }
}

export default fetchDailyFortune;
