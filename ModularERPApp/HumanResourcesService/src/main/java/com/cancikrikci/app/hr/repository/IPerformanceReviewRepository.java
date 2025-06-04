package com.cancikrikci.app.hr.repository;

import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.entity.PerformanceReview;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPerformanceReviewRepository extends CrudRepository<PerformanceReview, Integer> {

} 