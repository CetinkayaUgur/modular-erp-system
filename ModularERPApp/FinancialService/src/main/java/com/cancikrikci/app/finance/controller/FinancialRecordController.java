package com.cancikrikci.app.finance.controller;

import com.cancikrikci.app.finance.entity.FinancialRecord;
import com.cancikrikci.app.finance.entity.FinancialRecordType;
import com.cancikrikci.app.finance.service.FinancialRecordService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/finance/records")
public class FinancialRecordController {

    private final FinancialRecordService m_financialRecordService;

    public FinancialRecordController(FinancialRecordService financialRecordService)
    {
        m_financialRecordService = financialRecordService;
    }
    @GetMapping
    public List<FinancialRecord> getAll()
    {
        return m_financialRecordService.getAllFinancialRecords();
    }

    @GetMapping("type/{type}")
    public List<FinancialRecord> getByType(@PathVariable FinancialRecordType type)
    {
        return m_financialRecordService.getFinancialRecordsByType(type);
    }
    @GetMapping("amount")
    public List<FinancialRecord> findLessThan(@RequestParam("a") BigDecimal amount, @RequestParam("t") FinancialRecordType type)
    {
        return m_financialRecordService.findFinancialRecordsLessThan(amount, type);
    }
    @GetMapping("between")
    public List<FinancialRecord> findBetweenDate(@RequestParam("start") LocalDate start, @RequestParam("end") LocalDate end)
    {
        return m_financialRecordService.findFinancialRecordsBetweenDate(start, end);
    }

    @PostMapping("record/add")
    public FinancialRecord addFinancialRecord(@RequestBody FinancialRecord financialRecord)
    {
        return m_financialRecordService.addFinancialRecord(financialRecord);
    }
    @DeleteMapping("record/delete/{id}")
    public void deleteById(@PathVariable int id)
    {
        m_financialRecordService.deleteRecordsById(id);
    }
}
