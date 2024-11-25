import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/jobs/${id}`)
      .then((response) => setJob(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleStatusChange = (newStatus) => {
    axios
      .put(`/api/jobs/${id}`, { status: newStatus })
      .then(() => navigate(`/category/${newStatus}`))
      .catch((err) => console.error(err));
  };

  return (
    job && (
      <div>
        <h1>{job.jobTitle}</h1>
        <p>Company: {job.companyName}</p>
        <p>Status: {job.status}</p>
        <p>Deadline: {job.deadline}</p>
        <p>Notes: {job.notes}</p>
        <select value={job.status} onChange={(e) => handleStatusChange(e.target.value)}>
          <option>To Be Applied</option>
          <option>Applied</option>
          <option>Interview Received</option>
          <option>Rejected</option>
        </select>
      </div>
    )
  );
}

export default JobDetailPage;
