import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${id}`);
        setJob(response.data);
        setSelectedStatus(response.data.status); // Set initial status in dropdown
      } catch (err) {
        console.error("Error fetching job details:", err);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/api/jobs/${id}`, { status: selectedStatus });
      alert("Status updated successfully!");
      navigate(`/category/${selectedStatus}`);
    } catch (err) {
      console.error("Error updating job status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    job && (
      <div>
        <h1>{job.jobTitle}</h1>
        <p>Company: {job.companyName}</p>
        <p>Status: {job.status}</p>
        <p>Deadline: {job.deadline}</p>
        <p>Notes: {job.notes}</p>

        <div>
          <label htmlFor="status">Change Status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="To Be Applied">To Be Applied</option>
            <option value="Applied">Applied</option>
            <option value="Interview Received">Interview Received</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleSubmit}>Submit Changes</button>
        </div>
      </div>
    )
  );
}

export default JobDetailPage;
