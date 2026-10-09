package com.campushire.dto;

import java.util.List;

public class ResumeAnalysisResponse {
    private int score; // e.g. 72 / 100
    private String summary;
    private int completeness; // 0-100%
    private List<String> missingSections;
    private List<String> skillSuggestions;
    private List<String> projectSuggestions;
    private List<String> formattingSuggestions;
    private List<String> keywordSuggestions;
    private String aiMode;

    public ResumeAnalysisResponse() {
    }

    public ResumeAnalysisResponse(int score, String summary, int completeness,
                                  List<String> missingSections, List<String> skillSuggestions,
                                  List<String> projectSuggestions, List<String> formattingSuggestions,
                                  List<String> keywordSuggestions, String aiMode) {
        this.score = score;
        this.summary = summary;
        this.completeness = completeness;
        this.missingSections = missingSections;
        this.skillSuggestions = skillSuggestions;
        this.projectSuggestions = projectSuggestions;
        this.formattingSuggestions = formattingSuggestions;
        this.keywordSuggestions = keywordSuggestions;
        this.aiMode = aiMode;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public int getCompleteness() {
        return completeness;
    }

    public void setCompleteness(int completeness) {
        this.completeness = completeness;
    }

    public List<String> getMissingSections() {
        return missingSections;
    }

    public void setMissingSections(List<String> missingSections) {
        this.missingSections = missingSections;
    }

    public List<String> getSkillSuggestions() {
        return skillSuggestions;
    }

    public void setSkillSuggestions(List<String> skillSuggestions) {
        this.skillSuggestions = skillSuggestions;
    }

    public List<String> getProjectSuggestions() {
        return projectSuggestions;
    }

    public void setProjectSuggestions(List<String> projectSuggestions) {
        this.projectSuggestions = projectSuggestions;
    }

    public List<String> getFormattingSuggestions() {
        return formattingSuggestions;
    }

    public void setFormattingSuggestions(List<String> formattingSuggestions) {
        this.formattingSuggestions = formattingSuggestions;
    }

    public List<String> getKeywordSuggestions() {
        return keywordSuggestions;
    }

    public void setKeywordSuggestions(List<String> keywordSuggestions) {
        this.keywordSuggestions = keywordSuggestions;
    }

    public String getAiMode() {
        return aiMode;
    }

    public void setAiMode(String aiMode) {
        this.aiMode = aiMode;
    }
}
