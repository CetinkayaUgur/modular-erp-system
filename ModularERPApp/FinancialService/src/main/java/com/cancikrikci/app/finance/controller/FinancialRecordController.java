package com.cancikrikci.app.finance.controller;

import com.cancikrikci.app.finance.dto.BudgetDTO;
import com.cancikrikci.app.finance.entity.FinancialRecord;
import com.cancikrikci.app.finance.entity.FinancialRecordType;
import com.cancikrikci.app.finance.service.BudgetService;
import com.cancikrikci.app.finance.service.FinancialRecordService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    @PostMapping("record/add")
    public FinancialRecord addFinancialRecord(@RequestBody FinancialRecord financialRecord)
    {
        return m_financialRecordService.addFinancialRecord(financialRecord);
    }
}
