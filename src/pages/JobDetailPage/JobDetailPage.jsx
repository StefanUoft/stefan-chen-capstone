import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./JobDetailPage.scss"

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
        setSelectedStatus(response.data.status); 
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
      <div className="jobs__container">
        
        <h2 className="jobs__title">{job.jobTitle}</h2>
        <p className="jobs__company">Company: {job.companyName}</p>
        <p className="jobs__status">Status: {job.status}</p>
        <p className="jobs__deadline">Deadline: {job.deadline}</p>
        <p className="jobs__notes">Notes: {job.notes}</p>

        <div className="status__container">
          <label htmlFor="status" className="status__label">Change Status:</label>
          <select 
          className="status__selection"
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="To Be Applied">To Be Applied</option>
            <option value="Applied">Applied</option>
            <option value="Interview Received">Interview Received</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleSubmit} className="status__button">Submit Changes</button>
        </div>
        <button onClick={() => navigate(-1)} className="jobs__back-button">
          Go Back
        </button>
      </div>
    )
  );
}

export default JobDetailPage;
