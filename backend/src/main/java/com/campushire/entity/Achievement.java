package com.campushire.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "achievements")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(nullable = false)
    private String badgeCode;

    @Column(nullable = false)
    private String title;

    private String description;
    private String icon;
    private LocalDateTime unlockedAt = LocalDateTime.now();
    private boolean unlocked = true;

    public Achievement() {
    }

    public Achievement(StudentProfile student, String badgeCode, String title, String description, String icon, boolean unlocked) {
        this.student = student;
        this.badgeCode = badgeCode;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.unlocked = unlocked;
        this.unlockedAt = unlocked ? LocalDateTime.now() : null;
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

    public String getBadgeCode() {
        return badgeCode;
    }

    public void setBadgeCode(String badgeCode) {
        this.badgeCode = badgeCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public LocalDateTime getUnlockedAt() {
        return unlockedAt;
    }

    public void setUnlockedAt(LocalDateTime unlockedAt) {
        this.unlockedAt = unlockedAt;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
        if (unlocked && this.unlockedAt == null) {
            this.unlockedAt = LocalDateTime.now();
        }
    }
}
