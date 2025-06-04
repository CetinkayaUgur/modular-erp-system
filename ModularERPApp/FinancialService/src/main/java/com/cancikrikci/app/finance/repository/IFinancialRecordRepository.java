package com.cancikrikci.app.finance.repository;

import com.cancikrikci.app.finance.entity.FinancialRecord;
import com.cancikrikci.app.finance.entity.FinancialRecordType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface IFinancialRecordRepository extends CrudRepository<FinancialRecord, Integer> {

    Iterable<FinancialRecord> findByType(FinancialRecordType type);
    @Query(nativeQuery = true, value = """
        select * from financial_records
        where amount < :amount AND type = :type
        """)
    Iterable<FinancialRecord> findLessThan(@Param("amount") BigDecimal amount, @Param("type") String type);

    @Query("""
        SELECT f FROM FinancialRecord f 
        WHERE f.date BETWEEN :start AND :end
        """)
    Iterable<FinancialRecord> findBetweenDate(@Param("start") LocalDate start, @Param("end") LocalDate end);

}
