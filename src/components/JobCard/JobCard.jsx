import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div>
      <h3>{job.jobTitle}</h3>
      <p>{job.companyName}</p>
      <Link to={`/job/${job.id}`}>View Details</Link>
    </div>
  );
}

export default JobCard;
