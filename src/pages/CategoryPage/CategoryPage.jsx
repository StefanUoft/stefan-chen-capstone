import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../../components/JobCard/JobCard";


function CategoryPage() {
  const { status } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/jobs?status=${status}`)
      .then((response) => setJobs(response.data))
      .catch((err) => console.error(err));
  }, [status]);

  return (
    <div>
      <h1>{status}</h1>
      <div>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
