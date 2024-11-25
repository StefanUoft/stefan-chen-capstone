import { useEffect, useState } from "react";
import axios from "axios";
import fetchDailyFortune from "../../api/fortuneApi";

function HomePage() {
  const [motivation, setMotivation] = useState("");
  const [counts, setCounts] = useState({
    toBeApplied: 0,
    applied: 0,
    interviewReceived: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    status: "To Be Applied",
    deadline: "",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await fetchDailyFortune();
        setMotivation(message);

        
        const response = await axios.get("http://localhost:4000/api/jobs/count");
        setCounts(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMotivation("Unable to load your fortune.");
        setCounts({
          toBeApplied: 0,
          applied: 0,
          interviewReceived: 0,
          rejected: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/jobs", formData);
      alert("Job added successfully!");
      setFormData({
        companyName: "",
        jobTitle: "",
        status: "To Be Applied",
        deadline: "",
        notes: "",
      });

      // Refresh job counts after adding a new job
      const response = await axios.get("http://localhost:4000/api/jobs/count");
      setCounts(response.data);
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job. Please try again.");
    }
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>
      {isLoading ? (
        <p>Loading your dashboard...</p>
      ) : (
        <>
          <p>{motivation}</p>
          <ul>
            <li>To Be Applied: {counts.toBeApplied || 0}</li>
            <li>Applied: {counts.applied || 0}</li>
            <li>Interview Received: {counts.interviewReceived || 0}</li>
            <li>Rejected: {counts.rejected || 0}</li>
          </ul>

          <h2>Add a New Job</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>
                Company Name:
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Job Title:
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option>To Be Applied</option>
                  <option>Applied</option>
                  <option>Interview Received</option>
                  <option>Rejected</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Notes:
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </label>
            </div>
            <button type="submit">Add Job</button>
          </form>
        </>
      )}
    </div>
  );
}

export default HomePage;
