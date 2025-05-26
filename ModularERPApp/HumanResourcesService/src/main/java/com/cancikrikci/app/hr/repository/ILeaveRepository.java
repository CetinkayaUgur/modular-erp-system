package com.cancikrikci.app.hr.repository;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import com.cancikrikci.app.hr.entity.Leave;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILeaveRepository extends CrudRepository<Leave, Integer> {

} 