package com.cancikrikci.app.payroll.repository;

import com.cancikrikci.app.payroll.entity.EmployeeInsurance;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IEmployeeInsuranceRepository extends CrudRepository<EmployeeInsurance, Integer> {
    List<EmployeeInsurance> findByEmployeeId(int employeeId);
} 