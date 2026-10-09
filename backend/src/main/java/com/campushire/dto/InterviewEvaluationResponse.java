package com.campushire.dto;

public class InterviewEvaluationResponse {
    private int score; // Out of 10
    private int conceptUnderstanding; // 1-10
    private int correctness; // 1-10
    private int clarity; // 1-10
    private int confidence; // 1-10
    private String feedback;
    private String idealAnswerPoints;
    private String nextQuestion;
    private String aiMode;

    public InterviewEvaluationResponse() {
    }

    public InterviewEvaluationResponse(int score, int conceptUnderstanding, int correctness, int clarity,
                                       int confidence, String feedback, String idealAnswerPoints,
                                       String nextQuestion, String aiMode) {
        this.score = score;
        this.conceptUnderstanding = conceptUnderstanding;
        this.correctness = correctness;
        this.clarity = clarity;
        this.confidence = confidence;
        this.feedback = feedback;
        this.idealAnswerPoints = idealAnswerPoints;
        this.nextQuestion = nextQuestion;
        this.aiMode = aiMode;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getConceptUnderstanding() {
        return conceptUnderstanding;
    }

    public void setConceptUnderstanding(int conceptUnderstanding) {
        this.conceptUnderstanding = conceptUnderstanding;
    }

    public int getCorrectness() {
        return correctness;
    }

    public void setCorrectness(int correctness) {
        this.correctness = correctness;
    }

    public int getClarity() {
        return clarity;
    }

    public void setClarity(int clarity) {
        this.clarity = clarity;
    }

    public int getConfidence() {
        return confidence;
    }

    public void setConfidence(int confidence) {
        this.confidence = confidence;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getIdealAnswerPoints() {
        return idealAnswerPoints;
    }

    public void setIdealAnswerPoints(String idealAnswerPoints) {
        this.idealAnswerPoints = idealAnswerPoints;
    }

    public String getNextQuestion() {
        return nextQuestion;
    }

    public void setNextQuestion(String nextQuestion) {
        this.nextQuestion = nextQuestion;
    }

    public String getAiMode() {
        return aiMode;
    }

    public void setAiMode(String aiMode) {
        this.aiMode = aiMode;
    }
}
