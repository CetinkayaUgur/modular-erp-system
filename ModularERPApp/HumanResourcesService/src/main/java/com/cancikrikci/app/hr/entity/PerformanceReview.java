package com.cancikrikci.app.hr.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "performance_reviews")
public class PerformanceReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;

    @Column(name = "employee_id", nullable = false)
    public int employeeId;

    @Column(name = "date")
    public LocalDate date;

    @Column(name = "score")
    public Integer score;

    @Column(name = "comment")
    public String comment;
} 