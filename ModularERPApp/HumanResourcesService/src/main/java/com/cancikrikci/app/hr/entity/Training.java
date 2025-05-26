package com.cancikrikci.app.hr.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "trainings")
public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "training_id")
    public int id;

    @Column(name = "training_name", length = 150)
    public String trainingName;

    @Column(name = "training_date")
    public LocalDate trainingDate;

    @Column(name = "trainer", length = 100)
    public String trainer;

    @Column(name = "description")
    public String description;

    @ManyToMany(mappedBy = "trainings", fetch = FetchType.LAZY)
    public List<Employee> employees;

} 