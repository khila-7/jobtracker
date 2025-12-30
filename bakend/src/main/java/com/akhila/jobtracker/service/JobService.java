package com.akhila.jobtracker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.akhila.jobtracker.dto.JobRequestDTO;
import com.akhila.jobtracker.dto.JobResponseDTO;
import com.akhila.jobtracker.entity.Job;
import com.akhila.jobtracker.exception.JobNotFoundException;
import com.akhila.jobtracker.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // ✅ CREATE
    public JobResponseDTO saveJob(JobRequestDTO requestDTO) {

        Job job = new Job();
        job.setCompany(requestDTO.getCompany());
        job.setRole(requestDTO.getRole());
        job.setStatus(requestDTO.getStatus());

        Job savedJob = jobRepository.save(job);
        return mapToResponseDTO(savedJob);
    }

    // ✅ READ (ALL)
    public List<JobResponseDTO> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // ✅ READ WITH PAGINATION (NEW)
    public Page<JobResponseDTO> getJobsWithPagination(Pageable pageable) {
        return jobRepository.findAll(pageable)
                .map(this::mapToResponseDTO);
    }

    // ✅ UPDATE
    public JobResponseDTO updateJob(Long id, JobRequestDTO requestDTO) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id " + id));

        job.setCompany(requestDTO.getCompany());
        job.setRole(requestDTO.getRole());
        job.setStatus(requestDTO.getStatus());

        Job updatedJob = jobRepository.save(job);
        return mapToResponseDTO(updatedJob);
    }

    // ✅ DELETE
    public void deleteJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id " + id));

        jobRepository.delete(job);
    }

    // FILTER + PAGINATION
public Page<JobResponseDTO> searchJobs(
        String company,
        String status,
        Pageable pageable) {

    Page<Job> jobs;

    if (company != null && status != null) {
        jobs = jobRepository.findByCompanyAndStatus(company, status, pageable);
    } else if (company != null) {
        jobs = jobRepository.findByCompany(company, pageable);
    } else if (status != null) {
        jobs = jobRepository.findByStatus(status, pageable);
    } else {
        jobs = jobRepository.findAll(pageable);
    }

    return jobs.map(this::mapToResponseDTO);
}


    // 🔁 ENTITY → DTO mapper
    private JobResponseDTO mapToResponseDTO(Job job) {

        JobResponseDTO dto = new JobResponseDTO();
        dto.setId(job.getId());
        dto.setCompany(job.getCompany());
        dto.setRole(job.getRole());
        dto.setStatus(job.getStatus());

        return dto;
    }
}
