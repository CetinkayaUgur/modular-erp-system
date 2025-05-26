package com.cancikrikci.app.employee.repository;

import com.cancikrikci.app.employee.entity.EmployeeSalary;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IEmployeeSalaryRepository extends CrudRepository<EmployeeSalary, Integer> {
}
