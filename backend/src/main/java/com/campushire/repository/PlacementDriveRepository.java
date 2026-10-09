package com.campushire.repository;

import com.campushire.entity.PlacementDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {
    List<PlacementDrive> findByStatus(String status);
    List<PlacementDrive> findByCompanyId(Long companyId);
    List<PlacementDrive> findByTitleContainingIgnoreCaseOrRequiredSkillsContainingIgnoreCase(String title, String skills);
}
