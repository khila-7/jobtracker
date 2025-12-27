package com.akhila.jobtracker.controller;

import com.akhila.jobtracker.dto.JobRequestDTO;
import com.akhila.jobtracker.dto.JobResponseDTO;
import com.akhila.jobtracker.service.JobService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // ✅ CORS for React
@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // ✅ CREATE JOB
    @PostMapping
    public JobResponseDTO addJob(@Valid @RequestBody JobRequestDTO request) {
        return jobService.saveJob(request);
    }

    // ✅ GET ALL JOBS
    @GetMapping
    public List<JobResponseDTO> getJobs() {
        return jobService.getAllJobs();
    }

    // ✅ UPDATE JOB
    @PutMapping("/{id}")
    public JobResponseDTO updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequestDTO request) {
        return jobService.updateJob(id, request);
    }

    // ✅ DELETE JOB
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }

    // ✅ PAGINATION
    // Example: /jobs/page?page=0&size=5&sort=id,asc
    @GetMapping("/page")
    public Page<JobResponseDTO> getJobsWithPagination(Pageable pageable) {
        return jobService.getJobsWithPagination(pageable);
    }

    // ✅ SEARCH + PAGINATION
    // Example: /jobs/search?company=Google&status=APPLIED&page=0&size=5
    @GetMapping("/search")
    public Page<JobResponseDTO> searchJobs(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return jobService.searchJobs(company, status, pageable);
    }
}
