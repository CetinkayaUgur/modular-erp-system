package com.cancikrikci.app.finance.controller;

import com.cancikrikci.app.finance.dto.BudgetDTO;
import com.cancikrikci.app.finance.repository.IBudgetRepository;
import com.cancikrikci.app.finance.service.BudgetService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("api/finance/budget")
public class BudgetController {
    private final BudgetService m_budgetService;

    public BudgetController(BudgetService budgetService)
    {
        m_budgetService = budgetService;
    }

    @GetMapping
    public BudgetDTO getBudget()
    {
        return m_budgetService.getTotalBudget();
    }
}
