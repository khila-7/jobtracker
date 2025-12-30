import { useState } from "react";
import axios from "axios";

const AddJob = ({ onJobAdded }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/jobs", {
        company,
        role,
        status
      });

      // clear form
      setCompany("");
      setRole("");
      setStatus("");

      // refresh job list
      onJobAdded();
    } catch (error) {
      console.error("Error adding job", error);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
