package com.cancikrikci.app.employee.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigInteger;
import java.time.LocalDate;

@Entity
@Table(name = "employee_salaries")
public class EmployeeSalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salary_id")
    public int id;
    @Column(name = "salary_date", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate salaryDate;

    @Column(name = "paid_amount", nullable = false)
    public BigInteger paidAmount;

    @Column(name = "description")
    public String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonIgnore
    public Employee employee;
}
