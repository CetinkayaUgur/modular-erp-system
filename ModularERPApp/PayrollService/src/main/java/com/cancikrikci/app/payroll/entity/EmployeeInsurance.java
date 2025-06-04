package com.cancikrikci.app.payroll.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee_insurances")
public class EmployeeInsurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "insurance_id")
    public int id;

    @Column(name = "employee_id", nullable = false)
    public int employeeId;

    @Column(name = "insurance_no", length = 50)
    public String insuranceNo;

    @Column(name = "start_date", nullable = false)
    public LocalDate startDate;

    @Column(name = "end_date")
    public LocalDate endDate;

    @Column(name = "insurance_type", length = 100)
    public String insuranceType;

    @Column(name = "description")
    public String description;
} 