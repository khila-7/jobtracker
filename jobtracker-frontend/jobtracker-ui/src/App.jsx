import { useEffect, useState } from "react";
import axios from "axios";
import AddJob from "./components/AddJob";
import EditJob from "./components/EditJob";
import SearchJobs from "./components/SearchJobs";

function App() {
  const [jobs, setJobs] = useState([]);

  // Called when SearchJobs returns filtered data
  const handleSearch = (filteredJobs) => {
    // If search returns nothing (or reset), reload all jobs
    if (!filteredJobs) {
      fetchJobs();
    } else {
      setJobs(filteredJobs);
    }
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  // Delete job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobs/${id}`);
      fetchJobs(); // refresh list
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  // Load jobs on first render
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Tracker</h1>

      <AddJob onJobAdded={fetchJobs} />

      <h2>Job List</h2>

      <SearchJobs onSearch={handleSearch} />

      <ul>
        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.map((job) => (
          <li key={job.id}>
            {job.company} - {job.role} - {job.status}

            <EditJob job={job} onUpdate={fetchJobs} />

            <button onClick={() => deleteJob(job.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
