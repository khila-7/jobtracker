import { useEffect, useState } from "react";
import axios from "axios";
import AddJob from "./components/AddJob";
import EditJob from "./components/EditJob";
import SearchJobs from "./components/SearchJobs";
import JobCard from "./components/JobCard";

function App() {
  const [jobs, setJobs] = useState([]);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  // Handle search result
  const handleSearch = (filteredJobs) => {
    if (!filteredJobs) {
      fetchJobs(); // reset to all jobs
    } else {
      setJobs(filteredJobs);
    }
  };

  // Delete job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobs/${id}`);
      fetchJobs();
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

      {jobs.length === 0 && <p>No jobs found</p>}

      <div className="job-grid">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={deleteJob}
            onUpdate={fetchJobs}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
