package com.cancikrikci.app.employee.repository;

import com.cancikrikci.app.employee.entity.Employee;
import com.cancikrikci.app.employee.entity.EmployeeInsurance;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmployeeInsuranceRepository extends CrudRepository<EmployeeInsurance, Integer> {

}
