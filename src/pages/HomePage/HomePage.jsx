import { useEffect, useState } from "react";
import axios from "axios";
import fetchDailyFortune from "../../api/fortuneApi";
import "./HomePage.scss"

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

  const [checklist, setChecklist] = useState([]);
  const defaultChecklist = [
    { id: 1, text: "Check new job postings on Indeed", completed: false },
    { id: 2, text: "Check new job postings on LinkedIn", completed: false },
    { id: 3, text: "Check new job postings on Glassdoor", completed: false },
    { id: 4, text: "Tailor your resume for a job application", completed: false },
    { id: 5, text: "Write a custom cover letter for a job", completed: false },
    { id: 6, text: "Engage with a post or connection on LinkedIn", completed: false },
    { id: 7, text: "Apply to at least one job today", completed: false }
  ];

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

   
    const initializeChecklist = () => {
      const today = new Date().toISOString().split("T")[0];
      const savedChecklist = JSON.parse(localStorage.getItem("dailyChecklist"));
      const savedDate = localStorage.getItem("checklistDate");

      if (savedDate !== today || !savedChecklist) {
        
        localStorage.setItem("checklistDate", today);
        localStorage.setItem("dailyChecklist", JSON.stringify(defaultChecklist));
        setChecklist(defaultChecklist);
      } else {
        setChecklist(savedChecklist);
      }
    };

    fetchData();
    initializeChecklist();
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

      const response = await axios.get("http://localhost:4000/api/jobs/count");
      setCounts(response.data);
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job. Please try again.");
    }
  };

  const toggleChecklistItem = (id) => {
    const updatedChecklist = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedChecklist);
    localStorage.setItem("dailyChecklist", JSON.stringify(updatedChecklist));
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

          <h2>Daily Checklist</h2>
          <ul>
            {checklist.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(item.id)}
                  />
                  {item.text}
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default HomePage;
