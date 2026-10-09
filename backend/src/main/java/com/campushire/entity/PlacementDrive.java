package com.campushire.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "placement_drives")
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    private String roleType; // Full-time, Internship
    private String location;
    private Double salaryMin; // In LPA, e.g. 6.0
    private Double salaryMax; // In LPA, e.g. 8.0
    private Double minCgpa = 6.0;
    private String eligibleDepartments; // e.g. "CSE, IT, ECE"
    private Integer graduationYear = 2026;

    @Column(length = 500)
    private String requiredSkills; // e.g. "Java, Spring Boot, MySQL, REST APIs"

    @Column(length = 2500)
    private String description;

    private LocalDate deadline;
    private String status = "ACTIVE"; // ACTIVE, UPCOMING, CLOSED
    private Integer totalOpenings = 10;

    public PlacementDrive() {
    }

    public PlacementDrive(Company company, String title, String roleType, String location,
                          Double salaryMin, Double salaryMax, Double minCgpa,
                          String eligibleDepartments, Integer graduationYear,
                          String requiredSkills, String description, LocalDate deadline,
                          String status, Integer totalOpenings) {
        this.company = company;
        this.title = title;
        this.roleType = roleType;
        this.location = location;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.minCgpa = minCgpa;
        this.eligibleDepartments = eligibleDepartments;
        this.graduationYear = graduationYear;
        this.requiredSkills = requiredSkills;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.totalOpenings = totalOpenings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getSalaryMin() {
        return salaryMin;
    }

    public void setSalaryMin(Double salaryMin) {
        this.salaryMin = salaryMin;
    }

    public Double getSalaryMax() {
        return salaryMax;
    }

    public void setSalaryMax(Double salaryMax) {
        this.salaryMax = salaryMax;
    }

    public Double getMinCgpa() {
        return minCgpa;
    }

    public void setMinCgpa(Double minCgpa) {
        this.minCgpa = minCgpa;
    }

    public String getEligibleDepartments() {
        return eligibleDepartments;
    }

    public void setEligibleDepartments(String eligibleDepartments) {
        this.eligibleDepartments = eligibleDepartments;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getTotalOpenings() {
        return totalOpenings;
    }

    public void setTotalOpenings(Integer totalOpenings) {
        this.totalOpenings = totalOpenings;
    }
}
