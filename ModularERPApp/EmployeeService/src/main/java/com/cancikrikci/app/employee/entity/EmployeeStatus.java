package com.cancikrikci.app.employee.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "employee_statuses")
public class EmployeeStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    public int id;
    @Column(name = "status", length = 50)
    public String status;
    @Column(name = "start_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate startDate;
    @Column(name = "end_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate endDate;
    @Column(name = "description")
    public String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonIgnore
    public Employee employee;
}
