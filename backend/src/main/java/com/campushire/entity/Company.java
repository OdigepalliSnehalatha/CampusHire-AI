package com.campushire.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String industry;
    private String location;
    private String website;
    private String logoUrl;

    @Column(length = 2000)
    private String description;

    private Double averagePackage;
    private Integer totalHired = 0;

    public Company() {
    }

    public Company(String name, String industry, String location, String website, String logoUrl, String description, Double averagePackage, Integer totalHired) {
        this.name = name;
        this.industry = industry;
        this.location = location;
        this.website = website;
        this.logoUrl = logoUrl;
        this.description = description;
        this.averagePackage = averagePackage;
        this.totalHired = totalHired;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAveragePackage() {
        return averagePackage;
    }

    public void setAveragePackage(Double averagePackage) {
        this.averagePackage = averagePackage;
    }

    public Integer getTotalHired() {
        return totalHired;
    }

    public void setTotalHired(Integer totalHired) {
        this.totalHired = totalHired;
    }
}
