package com.akhila.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class JobRequestDTO {

    @NotBlank(message = "Company name must not be empty")
    @Size(min = 2, max = 50, message = "Company name must be between 2 and 50 characters")
    private String company;

    @NotBlank(message = "Role must not be empty")
    @Size(min = 2, max = 50, message = "Role must be between 2 and 50 characters")
    private String role;

    @NotBlank(message = "Status must not be empty")
    private String status;

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
