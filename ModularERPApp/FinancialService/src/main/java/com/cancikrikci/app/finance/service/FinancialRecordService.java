package com.cancikrikci.app.finance.service;

import com.cancikrikci.app.finance.entity.FinancialRecord;
import com.cancikrikci.app.finance.entity.FinancialRecordType;
import com.cancikrikci.app.finance.repository.IFinancialRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class FinancialRecordService {
    private final IFinancialRecordRepository m_financialRecordRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50505/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public FinancialRecordService(IFinancialRecordRepository financialRecordRepository, RestTemplate restTemplate)
    {
        m_financialRecordRepository = financialRecordRepository;
        m_restTemplate = restTemplate;
    }

    public FinancialRecord addFinancialRecord(FinancialRecord financialRecord)
    {
        financialRecord.username = getUsername();
        return m_financialRecordRepository.save(financialRecord);
    }

    public List<FinancialRecord> getAllFinancialRecords()
    {
        return StreamSupport.stream(m_financialRecordRepository.findAll().spliterator(), false)
                .filter(fr -> fr.username.equals(getUsername()))
                .collect(Collectors.toList());
    }
    public List<FinancialRecord> getFinancialRecordsByType(FinancialRecordType type)
    {
        return StreamSupport.stream(m_financialRecordRepository.findByType(type).spliterator(), false)
                .filter(fr -> fr.username.equals(getUsername()))
                .toList();
    }

    public List<FinancialRecord> findFinancialRecordsLessThan(BigDecimal amount, FinancialRecordType type)
    {
        return StreamSupport.stream(m_financialRecordRepository.findLessThan(amount, type.toString()).spliterator(), false)
                .filter(fr -> fr.username.equals(getUsername()))
                .toList();

    }

    public List<FinancialRecord> findFinancialRecordsBetweenDate(LocalDate start, LocalDate end)
    {
        return StreamSupport.stream(m_financialRecordRepository.findBetweenDate(start, end).spliterator(), false)
                .filter(fr -> fr.username.equals(getUsername()))
                .toList();

    }

    public void deleteRecordsById(int id)
    {
        m_financialRecordRepository.deleteById(id);
    }
}