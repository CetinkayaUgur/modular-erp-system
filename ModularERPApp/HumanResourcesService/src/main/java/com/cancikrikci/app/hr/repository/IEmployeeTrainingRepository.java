package com.cancikrikci.app.hr.repository;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IEmployeeTrainingRepository extends CrudRepository<EmployeeTraining, Integer> {

} 