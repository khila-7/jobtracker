import { useState } from "react";
import axios from "axios";

function EditJob({ job, onUpdate }) {
  const [company, setCompany] = useState(job.company);
  const [role, setRole] = useState(job.role);
  const [status, setStatus] = useState(job.status);
  const [editing, setEditing] = useState(false);

  const updateJob = async () => {
    try {
      await axios.put(`http://localhost:8080/jobs/${job.id}`, {
        company,
        role,
        status,
      });
      setEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!editing) {
    return <button onClick={() => setEditing(true)}>Edit</button>;
  }

  return (
    <div>
      <input value={company} onChange={(e) => setCompany(e.target.value)} />
      <input value={role} onChange={(e) => setRole(e.target.value)} />
      <input value={status} onChange={(e) => setStatus(e.target.value)} />

      <button onClick={updateJob}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  );
}

export default EditJob;
