package com.campushire.dto;

public class InterviewEvaluationRequest {
    private String role; // e.g. "Java Developer"
    private String difficulty; // Beginner, Intermediate, Advanced
    private String question;
    private String studentAnswer;

    public InterviewEvaluationRequest() {
    }

    public InterviewEvaluationRequest(String role, String difficulty, String question, String studentAnswer) {
        this.role = role;
        this.difficulty = difficulty;
        this.question = question;
        this.studentAnswer = studentAnswer;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getStudentAnswer() {
        return studentAnswer;
    }

    public void setStudentAnswer(String studentAnswer) {
        this.studentAnswer = studentAnswer;
    }
}
