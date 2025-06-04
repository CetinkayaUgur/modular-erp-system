package com.cancikrikci.app.employee.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "employee_insurances")
public class EmployeeInsurance {
    @Id
    @Column(name = "insurance_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column(name = "insurance_no", length = 50)
    public String insuranceNo;
    @Column(name = "start_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate startDate;
    @Column(name = "end_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    public LocalDate endDate;
    @Column(name = "insurance_type", length = 100)
    public String type;
    @Column(name = "description")
    public String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    @JsonIgnore
    public Employee employee;
}
