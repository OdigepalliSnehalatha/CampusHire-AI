package com.campushire.repository;

import com.campushire.entity.StudentProfile;
import com.campushire.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUser(User user);
    Optional<StudentProfile> findByUserId(Long userId);
    List<StudentProfile> findByDepartment(String department);
    List<StudentProfile> findByCgpaGreaterThanEqual(Double minCgpa);
}
