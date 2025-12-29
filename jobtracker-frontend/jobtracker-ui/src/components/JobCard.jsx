function JobCard({ job, onDelete, onUpdate }) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p><strong>Role:</strong> {job.role}</p>
      <span className={`status ${job.status.toLowerCase()}`}>
        {job.status}
      </span>

      <div className="actions">
        <button onClick={() => onUpdate(job)}>Edit</button>
        <button className="delete" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;
