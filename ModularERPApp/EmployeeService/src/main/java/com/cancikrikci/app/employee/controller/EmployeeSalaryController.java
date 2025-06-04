package com.cancikrikci.app.employee.controller;


import com.cancikrikci.app.employee.entity.EmployeeSalary;
import com.cancikrikci.app.employee.service.EmployeeSalaryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employees/salaries")
public class EmployeeSalaryController {
    private final EmployeeSalaryService m_salaryService;
    public EmployeeSalaryController(EmployeeSalaryService employeeService)
    {
        m_salaryService = employeeService;
    }
    @GetMapping
    public List<EmployeeSalary> getAll()
    {
        return m_salaryService.getAllEmployeeSalary();
    }
    @GetMapping("salary/{id}")
    public EmployeeSalary findByById(@PathVariable(name = "id") int id)
    {
        return m_salaryService.findEmployeeSalaryById(id);
    }
    @PostMapping("salary/save")
    public EmployeeSalary save(@RequestBody EmployeeSalary salary)
    {
        return m_salaryService.addEmployeeSalary(salary);
    }
    @DeleteMapping("salary/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_salaryService.deleteEmployeeSalaryById(id);
    }
}
