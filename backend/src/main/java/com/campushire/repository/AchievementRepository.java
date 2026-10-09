package com.campushire.repository;

import com.campushire.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByStudentId(Long studentId);
    Optional<Achievement> findByStudentIdAndBadgeCode(Long studentId, String badgeCode);
}
