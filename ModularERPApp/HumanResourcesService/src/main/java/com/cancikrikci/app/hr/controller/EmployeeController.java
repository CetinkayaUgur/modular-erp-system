package com.cancikrikci.app.hr.controller;

import com.cancikrikci.app.hr.entity.Employee;
import com.cancikrikci.app.hr.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/hr/employees")
public class EmployeeController {
    private final EmployeeService m_employeeService;

    public EmployeeController(EmployeeService employeeService)
    {
        m_employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAll()
    {
        return m_employeeService.getAllEmployees();
    }

    @GetMapping("employee/id")
    public Employee findByById(@RequestParam(name = "id") int id)
    {
        return m_employeeService.findEmployeeById(id);
    }

    @GetMapping("employee/nid")
    public Employee findByByNationalId(@RequestParam(name = "nid") String id)
    {
        return m_employeeService.findEmployeeByNationalId(id);
    }

    @GetMapping("active")
    public List<Employee> findByActivity(@RequestParam(name = "active") boolean activity)
    {
        return m_employeeService.findEmployeeByActivity(activity);
    }
    @PostMapping("employee/save")
    public Employee save(@RequestBody Employee employee)
    {
        return m_employeeService.addEmployee(employee);
    }

    @DeleteMapping("employee/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_employeeService.deleteEmployeeById(id);
    }
}
