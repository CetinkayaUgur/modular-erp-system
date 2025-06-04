package com.cancikrikci.app.payroll.controller;

import com.cancikrikci.app.payroll.entity.EmployeeSalary;
import com.cancikrikci.app.payroll.service.EmployeeSalaryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/payroll/salaries")
public class EmployeeSalaryController {
    private final EmployeeSalaryService m_employeeSalaryService;

    public EmployeeSalaryController(EmployeeSalaryService employeeSalaryService)
    {
        m_employeeSalaryService = employeeSalaryService;
    }
    @GetMapping
    public List<EmployeeSalary> getAllSalaries()
    {
        return m_employeeSalaryService.getAllSalaries();
    }

    @GetMapping("salary/{id}")
    public EmployeeSalary getSalaryById(@PathVariable(name = "id") int id)
    {
        return m_employeeSalaryService.getSalaryById(id);
    }

    @GetMapping("salary/employee/{employeeId}")
    public List<EmployeeSalary> getSalariesByEmployeeId(@PathVariable(name = "employeeId") int employeeId)
    {
        return m_employeeSalaryService.getSalariesByEmployeeId(employeeId);
    }

    @PostMapping("salary/save")
    public EmployeeSalary saveSalary(@RequestBody EmployeeSalary salary)
    {
        return m_employeeSalaryService.saveSalary(salary);
    }

    @DeleteMapping("salary/delete/{id}")
    public void deleteSalary(@PathVariable(name = "id") int id)
    {
        m_employeeSalaryService.deleteSalary(id);
    }


} 