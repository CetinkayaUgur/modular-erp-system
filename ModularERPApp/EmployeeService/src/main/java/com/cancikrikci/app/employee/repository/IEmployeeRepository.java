package com.cancikrikci.app.employee.repository;

import com.cancikrikci.app.employee.entity.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IEmployeeRepository extends CrudRepository<Employee, Integer> {
    Employee findByNationalId(String id);
}
