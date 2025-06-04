package com.cancikrikci.app.employee.service;
import com.cancikrikci.app.employee.entity.EmployeeSalary;
import com.cancikrikci.app.employee.repository.IEmployeeSalaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeSalaryService {
    private final IEmployeeSalaryRepository m_salaryRepository;

    public EmployeeSalaryService(IEmployeeSalaryRepository salaryRepository)
    {
        m_salaryRepository = salaryRepository;
    }
    public List<EmployeeSalary> getAllEmployeeSalary()
    {
        return StreamSupport.stream(m_salaryRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
    public EmployeeSalary findEmployeeSalaryById(int id)
    {
        return m_salaryRepository.findById(id).orElseThrow();
    }
    public EmployeeSalary addEmployeeSalary(EmployeeSalary employeeSalary)
    {
        return m_salaryRepository.save(employeeSalary);
    }
    public void deleteEmployeeSalaryById(int id)
    {
        m_salaryRepository.deleteById(id);
    }
}
