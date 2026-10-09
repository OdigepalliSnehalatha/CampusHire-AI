package com.campushire.dto;

import java.util.List;

public class ChatMessageResponse {
    private String reply;
    private String aiMode; // e.g. "AI Demo Mode" or "Gemini 1.5 Pro"
    private List<String> suggestedActions;
    private List<CareerPathSuggestion> careerSuggestions;

    public ChatMessageResponse() {
    }

    public ChatMessageResponse(String reply, String aiMode, List<String> suggestedActions) {
        this.reply = reply;
        this.aiMode = aiMode;
        this.suggestedActions = suggestedActions;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getAiMode() {
        return aiMode;
    }

    public void setAiMode(String aiMode) {
        this.aiMode = aiMode;
    }

    public List<String> getSuggestedActions() {
        return suggestedActions;
    }

    public void setSuggestedActions(List<String> suggestedActions) {
        this.suggestedActions = suggestedActions;
    }

    public List<CareerPathSuggestion> getCareerSuggestions() {
        return careerSuggestions;
    }

    public void setCareerSuggestions(List<CareerPathSuggestion> careerSuggestions) {
        this.careerSuggestions = careerSuggestions;
    }

    public static class CareerPathSuggestion {
        private String roleTitle;
        private String matchReason;
        private List<String> requiredSkills;
        private List<String> missingSkills;
        private String learningPath;

        public CareerPathSuggestion() {
        }

        public CareerPathSuggestion(String roleTitle, String matchReason, List<String> requiredSkills, List<String> missingSkills, String learningPath) {
            this.roleTitle = roleTitle;
            this.matchReason = matchReason;
            this.requiredSkills = requiredSkills;
            this.missingSkills = missingSkills;
            this.learningPath = learningPath;
        }

        public String getRoleTitle() {
            return roleTitle;
        }

        public void setRoleTitle(String roleTitle) {
            this.roleTitle = roleTitle;
        }

        public String getMatchReason() {
            return matchReason;
        }

        public void setMatchReason(String matchReason) {
            this.matchReason = matchReason;
        }

        public List<String> getRequiredSkills() {
            return requiredSkills;
        }

        public void setRequiredSkills(List<String> requiredSkills) {
            this.requiredSkills = requiredSkills;
        }

        public List<String> getMissingSkills() {
            return missingSkills;
        }

        public void setMissingSkills(List<String> missingSkills) {
            this.missingSkills = missingSkills;
        }

        public String getLearningPath() {
            return learningPath;
        }

        public void setLearningPath(String learningPath) {
            this.learningPath = learningPath;
        }
    }
}
