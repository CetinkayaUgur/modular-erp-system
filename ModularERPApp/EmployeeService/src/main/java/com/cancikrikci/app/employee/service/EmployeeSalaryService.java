package com.cancikrikci.app.employee.service;
import com.cancikrikci.app.employee.entity.EmployeeSalary;
import com.cancikrikci.app.employee.repository.IEmployeeSalaryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeSalaryService {
    private final IEmployeeSalaryRepository m_salaryRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50506/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public EmployeeSalaryService(IEmployeeSalaryRepository salaryRepository, RestTemplate restTemplate)
    {
        m_salaryRepository = salaryRepository;
        m_restTemplate = restTemplate;
    }

    public List<EmployeeSalary> getAllEmployeeSalary()
    {
        return StreamSupport.stream(m_salaryRepository.findAll().spliterator(), false)
                .filter(es -> es.employee.username.equals(getUsername()))
                .collect(Collectors.toList());
    }
    public EmployeeSalary findEmployeeSalaryById(int id)
    {
        return m_salaryRepository.findById(id).orElseThrow();
    }
    public EmployeeSalary addEmployeeSalary(EmployeeSalary employeeSalary)
    {
        employeeSalary.employee.username = getUsername();
        return m_salaryRepository.save(employeeSalary);
    }
    public void deleteEmployeeSalaryById(int id)
    {
        m_salaryRepository.deleteById(id);
    }
}
