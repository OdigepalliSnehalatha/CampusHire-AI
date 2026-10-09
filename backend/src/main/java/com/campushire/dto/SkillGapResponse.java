package com.campushire.dto;

import java.util.List;

public class SkillGapResponse {
    private String targetRole;
    private int matchPercentage;
    private List<SkillItem> currentSkills;
    private List<String> missingSkills;
    private List<String> recommendedLearningOrder;
    private String aiInsight;

    public SkillGapResponse() {
    }

    public SkillGapResponse(String targetRole, int matchPercentage, List<SkillItem> currentSkills,
                            List<String> missingSkills, List<String> recommendedLearningOrder, String aiInsight) {
        this.targetRole = targetRole;
        this.matchPercentage = matchPercentage;
        this.currentSkills = currentSkills;
        this.missingSkills = missingSkills;
        this.recommendedLearningOrder = recommendedLearningOrder;
        this.aiInsight = aiInsight;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public int getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(int matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public List<SkillItem> getCurrentSkills() {
        return currentSkills;
    }

    public void setCurrentSkills(List<SkillItem> currentSkills) {
        this.currentSkills = currentSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getRecommendedLearningOrder() {
        return recommendedLearningOrder;
    }

    public void setRecommendedLearningOrder(List<String> recommendedLearningOrder) {
        this.recommendedLearningOrder = recommendedLearningOrder;
    }

    public String getAiInsight() {
        return aiInsight;
    }

    public void setAiInsight(String aiInsight) {
        this.aiInsight = aiInsight;
    }

    public static class SkillItem {
        private String name;
        private int proficiency; // 0-100%
        private String status; // proficient, needs_improvement, beginner

        public SkillItem() {
        }

        public SkillItem(String name, int proficiency, String status) {
            this.name = name;
            this.proficiency = proficiency;
            this.status = status;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getProficiency() {
            return proficiency;
        }

        public void setProficiency(int proficiency) {
            this.proficiency = proficiency;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
