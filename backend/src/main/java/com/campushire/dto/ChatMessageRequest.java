package com.campushire.dto;

import java.util.List;

public class ChatMessageRequest {
    private String message;
    private String category; // GENERAL, JOBS, RESUME, SKILLS, INTERVIEW, LEARNING
    private List<ChatMessage> history;

    public ChatMessageRequest() {
    }

    public ChatMessageRequest(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<ChatMessage> getHistory() {
        return history;
    }

    public void setHistory(List<ChatMessage> history) {
        this.history = history;
    }

    public static class ChatMessage {
        private String sender; // user, bot
        private String text;

        public ChatMessage() {
        }

        public ChatMessage(String sender, String text) {
            this.sender = sender;
            this.text = text;
        }

        public String getSender() {
            return sender;
        }

        public void setSender(String sender) {
            this.sender = sender;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}
