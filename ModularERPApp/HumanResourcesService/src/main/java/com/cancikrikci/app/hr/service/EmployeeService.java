package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.repository.IEmployeeRepository;
import com.cancikrikci.app.hr.entity.Employee;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeService {
    private final IEmployeeRepository m_employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        m_employeeRepository = employeeRepository;
    }
    public List<Employee> getAllEmployees()
    {
        return StreamSupport.stream(m_employeeRepository.findAll().spliterator(), false)
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
        return m_employeeRepository.findByIsActive(activity);
    }
    public Employee addEmployee(Employee employee)
    {
        return m_employeeRepository.save(employee);
    }
    public void deleteEmployeeById(int id)
    {
        m_employeeRepository.deleteById(id);
    }
}
