package com.cancikrikci.app.hr.repository;

import com.cancikrikci.app.hr.entity.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IEmployeeRepository extends CrudRepository<Employee, Integer> {
    Employee findByNationalId(String id);
    List<Employee> findByIsActive(boolean active);
}
