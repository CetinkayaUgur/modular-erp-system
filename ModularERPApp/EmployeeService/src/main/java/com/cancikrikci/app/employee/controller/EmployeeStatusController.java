package com.cancikrikci.app.employee.controller;

import com.cancikrikci.app.employee.entity.Employee;
import com.cancikrikci.app.employee.entity.EmployeeStatus;
import com.cancikrikci.app.employee.service.EmployeeService;
import com.cancikrikci.app.employee.service.EmployeeStatusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employees/statuses")
public class EmployeeStatusController {
    private final EmployeeStatusService m_statusService;
    public EmployeeStatusController(EmployeeStatusService employeeService)
    {
        m_statusService = employeeService;
    }
    @GetMapping
    public List<EmployeeStatus> getAll()
    {
        return m_statusService.getAllEmployeeStatuses();
    }
    @GetMapping("status/{id}")
    public EmployeeStatus findByById(@PathVariable(name = "id") int id)
    {
        return m_statusService.findEmployeeStatusById(id);
    }
    @PostMapping("status/save")
    public EmployeeStatus save(@RequestBody EmployeeStatus status)
    {
        return m_statusService.addEmployeeStatus(status);
    }

    @DeleteMapping("status/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_statusService.deleteEmployeeStatusById(id);
    }
}
