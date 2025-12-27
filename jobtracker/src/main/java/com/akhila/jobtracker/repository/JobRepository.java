package com.akhila.jobtracker.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.akhila.jobtracker.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    Page<Job> findByCompany(String company, Pageable pageable);

    Page<Job> findByStatus(String status, Pageable pageable);

    Page<Job> findByCompanyAndStatus(String company, String status, Pageable pageable);
}
