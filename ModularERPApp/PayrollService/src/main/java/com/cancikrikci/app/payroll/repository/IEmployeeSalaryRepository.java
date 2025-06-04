package com.cancikrikci.app.payroll.repository;

import com.cancikrikci.app.payroll.entity.EmployeeSalary;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IEmployeeSalaryRepository extends CrudRepository<EmployeeSalary, Integer> {
    List<EmployeeSalary> findByEmployeeId(int employeeId);
} 