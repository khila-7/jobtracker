import { useState } from "react";
import axios from "axios";

function SearchJobs({ onSearch }) {
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);

  const fetchData = async (pageNumber = 0) => {
    try {
      const params = {
        page: pageNumber,
        size: 5
      };

      if (company.trim() !== "") params.company = company;
      if (status.trim() !== "") params.status = status;

      const response = await axios.get(
        "http://localhost:8080/jobs/search",
        { params }
      );

      onSearch(response.data.content);
      setPage(response.data.number);
    } catch (error) {
      console.error("Pagination search failed", error);
    }
  };

  return (
    <div>
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <button onClick={() => fetchData(0)}>Search</button>

      <div style={{ marginTop: "10px" }}>
        <button
          disabled={page === 0}
          onClick={() => fetchData(page - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page + 1}
        </span>

        <button onClick={() => fetchData(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchJobs;
