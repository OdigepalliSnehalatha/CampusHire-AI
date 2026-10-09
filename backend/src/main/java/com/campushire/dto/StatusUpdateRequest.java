package com.campushire.dto;

import jakarta.validation.constraints.NotBlank;

public class StatusUpdateRequest {
    @NotBlank(message = "Status is required")
    private String status; // APPLIED, SHORTLISTED, TECHNICAL_INTERVIEW, HR_INTERVIEW, SELECTED, REJECTED

    private String notes;
    private String feedback;

    public StatusUpdateRequest() {
    }

    public StatusUpdateRequest(String status, String notes) {
        this.status = status;
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
