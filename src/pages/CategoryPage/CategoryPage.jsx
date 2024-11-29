import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../../components/JobCard/JobCard";
import "./CategoryPage.scss";

function CategoryPage() {
  const { status } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobsByStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/jobs?status=${status}`
        );
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs by status:", err);
      }
    };

    fetchJobsByStatus();
  }, [status]);

  return (
    <div>
      <h1 className="category__title">{status}</h1>
      <div className="category__jobs">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
