package com.cancikrikci.app.payroll.service;

import com.cancikrikci.app.payroll.entity.EmployeeSalary;
import com.cancikrikci.app.payroll.repository.IEmployeeSalaryRepository;
import com.cancikrikci.app.payroll.repository.IEmployeeInsuranceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeSalaryService {
    private final IEmployeeSalaryRepository m_salaryRepository;
    private final IEmployeeInsuranceRepository m_insuranceRepository;

    public EmployeeSalaryService(IEmployeeSalaryRepository salaryRepository, IEmployeeInsuranceRepository insuranceRepository) {
        m_salaryRepository = salaryRepository;
        m_insuranceRepository = insuranceRepository;
    }

    // Employee Salary Methods
    public List<EmployeeSalary> getAllSalaries() {
        return StreamSupport.stream(m_salaryRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public EmployeeSalary getSalaryById(int id) {
        return m_salaryRepository.findById(id).orElseThrow();
    }

    public List<EmployeeSalary> getSalariesByEmployeeId(int employeeId) {
        return m_salaryRepository.findByEmployeeId(employeeId);
    }

    public EmployeeSalary saveSalary(EmployeeSalary salary) {
        return m_salaryRepository.save(salary);
    }

    public void deleteSalary(int id) {
        m_salaryRepository.deleteById(id);
    }
} 