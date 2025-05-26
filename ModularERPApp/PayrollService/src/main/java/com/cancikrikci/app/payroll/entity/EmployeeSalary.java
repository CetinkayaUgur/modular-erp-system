package com.cancikrikci.app.payroll.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employee_salaries")
public class EmployeeSalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salary_id")
    public int id;

    @Column(name = "employee_id", nullable = false)
    public int employeeId;

    @Column(name = "salary_date")
    public LocalDate salaryDate;

    @Column(name = "paid_amount", nullable = false)
    public BigDecimal paidAmount;

    @Column(name = "description")
    public String description;
} 