package com.cancikrikci.app.hr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_trainings")
public class EmployeeTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;

    @Column(name = "employee_id", nullable = false)
    public int employeeId;

    @Column(name = "training_id", nullable = false)
    public int trainingId;

    @Column(name = "attended")
    public boolean attended = false;
} 