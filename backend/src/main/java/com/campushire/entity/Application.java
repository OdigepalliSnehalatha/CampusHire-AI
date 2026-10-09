package com.campushire.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "placement_drive_id"})
})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "placement_drive_id", nullable = false)
    private PlacementDrive placementDrive;

    @Column(nullable = false)
    private String status = "APPLIED"; // APPLIED, SHORTLISTED, TECHNICAL_INTERVIEW, HR_INTERVIEW, SELECTED, REJECTED

    private Integer matchScore = 85;
    private LocalDate appliedDate = LocalDate.now();

    @Column(length = 1000)
    private String notes;

    @Column(length = 1000)
    private String feedback;

    public Application() {
    }

    public Application(StudentProfile student, PlacementDrive placementDrive, Integer matchScore) {
        this.student = student;
        this.placementDrive = placementDrive;
        this.matchScore = matchScore;
        this.status = "APPLIED";
        this.appliedDate = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentProfile getStudent() {
        return student;
    }

    public void setStudent(StudentProfile student) {
        this.student = student;
    }

    public PlacementDrive getPlacementDrive() {
        return placementDrive;
    }

    public void setPlacementDrive(PlacementDrive placementDrive) {
        this.placementDrive = placementDrive;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(Integer matchScore) {
        this.matchScore = matchScore;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
