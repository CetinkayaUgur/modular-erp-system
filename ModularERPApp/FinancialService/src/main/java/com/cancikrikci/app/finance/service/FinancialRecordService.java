package com.cancikrikci.app.finance.service;

import com.cancikrikci.app.finance.entity.FinancialRecord;
import com.cancikrikci.app.finance.entity.FinancialRecordType;
import com.cancikrikci.app.finance.repository.IFinancialRecordRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class FinancialRecordService {
    private final IFinancialRecordRepository m_financialRecordRepository;

    public FinancialRecordService(IFinancialRecordRepository financialRecordRepository)
    {
        m_financialRecordRepository = financialRecordRepository;
    }

    public FinancialRecord addFinancialRecord(FinancialRecord financialRecord)
    {
        return m_financialRecordRepository.save(financialRecord);
    }

    public List<FinancialRecord> getAllFinancialRecords()
    {
        return StreamSupport.stream(m_financialRecordRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
    public List<FinancialRecord> getFinancialRecordsByType(FinancialRecordType type)
    {
        return StreamSupport.stream(m_financialRecordRepository.findByType(type).spliterator(), false)
                .collect(Collectors.toList());
    }

    public List<FinancialRecord> findFinancialRecordsLessThan(BigDecimal amount, FinancialRecordType type)
    {
        return StreamSupport.stream(m_financialRecordRepository.findLessThan(amount, type.toString()).spliterator(), false)
                .collect(Collectors.toList());
    }

    public List<FinancialRecord> findFinancialRecordsBetweenDate(LocalDate start, LocalDate end)
    {
        return StreamSupport.stream(m_financialRecordRepository.findBetweenDate(start, end).spliterator(), false)
                .collect(Collectors.toList());
    }

    public void deleteRecordsById(int id)
    {
        m_financialRecordRepository.deleteById(id);
    }
}