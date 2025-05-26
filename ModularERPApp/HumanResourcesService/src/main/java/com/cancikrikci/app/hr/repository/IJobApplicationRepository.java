package com.cancikrikci.app.hr.repository;

import com.cancikrikci.app.hr.entity.JobApplication;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IJobApplicationRepository extends CrudRepository<JobApplication, Integer> {
    List<JobApplication> findByStatus(String status);
    List<JobApplication> findByApplicationDateBetween(LocalDate startDate, LocalDate endDate);
    List<JobApplication> findByPosition(String position);
} 