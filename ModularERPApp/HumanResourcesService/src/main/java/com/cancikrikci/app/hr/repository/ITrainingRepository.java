package com.cancikrikci.app.hr.repository;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import com.cancikrikci.app.hr.entity.Training;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITrainingRepository extends CrudRepository<Training, Integer> {

} 