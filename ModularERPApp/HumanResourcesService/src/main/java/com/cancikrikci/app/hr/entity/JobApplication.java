package com.cancikrikci.app.hr.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;

    @Column(name = "first_name", length = 100)
    public String firstName;

    @Column(name = "last_name", length = 100)
    public String lastName;

    @Column(name = "position", length = 100)
    public String position;

    @Column(name = "application_date")
    public LocalDate applicationDate;

    @Column(name = "status", length = 50)
    public String status;

    @Column(name = "notes")
    public String notes;
} 