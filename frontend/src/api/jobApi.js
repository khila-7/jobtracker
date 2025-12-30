import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getAllJobs = () => {
  return axios.get(`${API_BASE_URL}/jobs`);
};

export const createJob = (job) => {
  return axios.post(`${API_BASE_URL}/jobs`, job);
};

export const deleteJob = (id) => {
  return axios.delete(`${API_BASE_URL}/jobs/${id}`);
};

export const updateJob = (id, job) => {
  return axios.put(`${API_BASE_URL}/jobs/${id}`, job);
};
