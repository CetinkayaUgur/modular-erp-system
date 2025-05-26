package com.cancikrikci.app.employee.repository;

import com.cancikrikci.app.employee.entity.EmployeeStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IEmployeeStatusRepository extends CrudRepository<EmployeeStatus, Integer> {
}
