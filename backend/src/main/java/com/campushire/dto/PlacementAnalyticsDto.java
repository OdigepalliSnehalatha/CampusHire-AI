package com.campushire.dto;

import java.util.List;
import java.util.Map;

public class PlacementAnalyticsDto {
    private long totalStudents;
    private long registeredCompanies;
    private long activeDrives;
    private long totalApplications;
    private long shortlistedCount;
    private long placedStudents;
    private double averagePackage; // in LPA
    private double highestPackage; // in LPA
    private double placementRate; // percentage

    private List<DeptPlacement> departmentStats;
    private List<MonthlyTrend> monthlyTrends;
    private List<CompanyHiring> topHiringCompanies;

    public PlacementAnalyticsDto() {
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getRegisteredCompanies() {
        return registeredCompanies;
    }

    public void setRegisteredCompanies(long registeredCompanies) {
        this.registeredCompanies = registeredCompanies;
    }

    public long getActiveDrives() {
        return activeDrives;
    }

    public void setActiveDrives(long activeDrives) {
        this.activeDrives = activeDrives;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public long getShortlistedCount() {
        return shortlistedCount;
    }

    public void setShortlistedCount(long shortlistedCount) {
        this.shortlistedCount = shortlistedCount;
    }

    public long getPlacedStudents() {
        return placedStudents;
    }

    public void setPlacedStudents(long placedStudents) {
        this.placedStudents = placedStudents;
    }

    public double getAveragePackage() {
        return averagePackage;
    }

    public void setAveragePackage(double averagePackage) {
        this.averagePackage = averagePackage;
    }

    public double getHighestPackage() {
        return highestPackage;
    }

    public void setHighestPackage(double highestPackage) {
        this.highestPackage = highestPackage;
    }

    public double getPlacementRate() {
        return placementRate;
    }

    public void setPlacementRate(double placementRate) {
        this.placementRate = placementRate;
    }

    public List<DeptPlacement> getDepartmentStats() {
        return departmentStats;
    }

    public void setDepartmentStats(List<DeptPlacement> departmentStats) {
        this.departmentStats = departmentStats;
    }

    public List<MonthlyTrend> getMonthlyTrends() {
        return monthlyTrends;
    }

    public void setMonthlyTrends(List<MonthlyTrend> monthlyTrends) {
        this.monthlyTrends = monthlyTrends;
    }

    public List<CompanyHiring> getTopHiringCompanies() {
        return topHiringCompanies;
    }

    public void setTopHiringCompanies(List<CompanyHiring> topHiringCompanies) {
        this.topHiringCompanies = topHiringCompanies;
    }

    public static class DeptPlacement {
        private String department;
        private int total;
        private int placed;
        private double rate;

        public DeptPlacement() {}
        public DeptPlacement(String department, int total, int placed, double rate) {
            this.department = department;
            this.total = total;
            this.placed = placed;
            this.rate = rate;
        }

        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public int getTotal() { return total; }
        public void setTotal(int total) { this.total = total; }
        public int getPlaced() { return placed; }
        public void setPlaced(int placed) { this.placed = placed; }
        public double getRate() { return rate; }
        public void setRate(double rate) { this.rate = rate; }
    }

    public static class MonthlyTrend {
        private String month;
        private int offers;
        private int drives;

        public MonthlyTrend() {}
        public MonthlyTrend(String month, int offers, int drives) {
            this.month = month;
            this.offers = offers;
            this.drives = drives;
        }

        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }
        public int getOffers() { return offers; }
        public void setOffers(int offers) { this.offers = offers; }
        public int getDrives() { return drives; }
        public void setDrives(int drives) { this.drives = drives; }
    }

    public static class CompanyHiring {
        private String company;
        private int hired;
        private double avgPackage;

        public CompanyHiring() {}
        public CompanyHiring(String company, int hired, double avgPackage) {
            this.company = company;
            this.hired = hired;
            this.avgPackage = avgPackage;
        }

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
        public int getHired() { return hired; }
        public void setHired(int hired) { this.hired = hired; }
        public double getAvgPackage() { return avgPackage; }
        public void setAvgPackage(double avgPackage) { this.avgPackage = avgPackage; }
    }
}
