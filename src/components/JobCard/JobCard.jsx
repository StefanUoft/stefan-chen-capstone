import { Link } from "react-router-dom";
import "./JobCard.scss";

function JobCard({ job }) {
  return (
    <div className="job__container">
      <h2 className="job__title">{job.jobTitle}</h2>
      <p className="job__company">{job.companyName}</p>
      <Link to={`/job/${job.id}`} className="job__link">View Details</Link>
    </div>
  );
}

export default JobCard;
