package com.cancikrikci.app.finance.repository;

import com.cancikrikci.app.finance.entity.Budget;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface IBudgetRepository extends CrudRepository<Budget, Boolean> {
    Budget findById(boolean id);
}
