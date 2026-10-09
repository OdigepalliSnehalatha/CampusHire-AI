package com.campushire.dto;

import java.util.List;

public class SkillGapRequest {
    private String targetRole;

    public SkillGapRequest() {
    }

    public SkillGapRequest(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }
}
