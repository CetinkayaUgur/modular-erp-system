package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.repository.IEmployeeRepository;
import com.cancikrikci.app.hr.entity.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeService {
    private final IEmployeeRepository m_employeeRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50505/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public EmployeeService(IEmployeeRepository employeeRepository, RestTemplate restTemplate)
    {
        m_employeeRepository = employeeRepository;
        m_restTemplate = restTemplate;
    }

    public List<Employee> getAllEmployees()
    {
        return StreamSupport.stream(m_employeeRepository.findAll().spliterator(), false)
                .filter(e -> e.username.equals(getUsername()))
                .collect(Collectors.toList());
    }
    public Employee findEmployeeById(int id)
    {
        return m_employeeRepository.findById(id).orElseThrow();
    }

    public Employee findEmployeeByNationalId(String id)
    {
        return m_employeeRepository.findByNationalId(id);
    }

    public List<Employee> findEmployeeByActivity(boolean activity)
    {
        return m_employeeRepository.findByIsActive(activity)
                .stream()
                .filter(e -> e.username.equals(getUsername()))
                .collect(Collectors.toList());
    }
    public Employee addEmployee(Employee employee)
    {
        employee.username = getUsername();
        return m_employeeRepository.save(employee);
    }
    public void deleteEmployeeById(int id)
    {
        m_employeeRepository.deleteById(id);
    }
}
