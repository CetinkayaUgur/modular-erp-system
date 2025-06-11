package com.cancikrikci.app.finance.service;

import com.cancikrikci.app.finance.dto.BudgetDTO;
import com.cancikrikci.app.finance.mapper.IBudgetMapper;
import com.cancikrikci.app.finance.repository.IBudgetRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

@Service
public class BudgetService {
    private final IBudgetRepository m_budgetRepository;
    private final IBudgetMapper m_budgetMapper;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50505/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public BudgetService(IBudgetRepository budgetRepository, IBudgetMapper budgetMapper, RestTemplate restTemplate)
    {
        m_budgetRepository = budgetRepository;
        m_budgetMapper = budgetMapper;
        m_restTemplate = restTemplate;
    }

    public BudgetDTO getTotalBudget()
    {
        return  m_budgetMapper.toBudgetDTO(m_budgetRepository.findByUsername(getUsername()));
    }


}
