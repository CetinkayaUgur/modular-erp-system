package com.cancikrikci.app.finance.service;

import com.cancikrikci.app.finance.dto.BudgetDTO;
import com.cancikrikci.app.finance.mapper.IBudgetMapper;
import com.cancikrikci.app.finance.repository.IBudgetRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BudgetService {
    private final IBudgetRepository m_budgetRepository;
    private final IBudgetMapper m_budgetMapper;

    public BudgetService(IBudgetRepository budgetRepository, IBudgetMapper budgetMapper)
    {
        m_budgetRepository = budgetRepository;
        m_budgetMapper = budgetMapper;
    }

    public BudgetDTO getTotalBudget()
    {
        return  m_budgetMapper.toBudgetDTO(m_budgetRepository.findById(true));
    }


}
