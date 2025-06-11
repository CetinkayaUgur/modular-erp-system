package com.cancikrikci.app.employee.service;

import com.cancikrikci.app.employee.entity.Employee;
import com.cancikrikci.app.employee.repository.IEmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeService {
    private final IEmployeeRepository m_employeeRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50506/api/user/activeuser";

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
