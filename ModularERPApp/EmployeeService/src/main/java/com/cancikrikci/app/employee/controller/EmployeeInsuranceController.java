package com.cancikrikci.app.employee.controller;

import com.cancikrikci.app.employee.entity.Employee;
import com.cancikrikci.app.employee.entity.EmployeeInsurance;
import com.cancikrikci.app.employee.service.EmployeeInsuranceService;
import com.cancikrikci.app.employee.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employees/insurances")
public class EmployeeInsuranceController {
    private final EmployeeInsuranceService m_insuranceService;
    public EmployeeInsuranceController(EmployeeInsuranceService insuranceService)
    {
        m_insuranceService = insuranceService;
    }
    @GetMapping
    public List<EmployeeInsurance> getAll()
    {
        return m_insuranceService.getAllEmployeeInsurances();
    }
    @GetMapping("insurance/{id}")
    public EmployeeInsurance findByById(@PathVariable(name = "id") int id)
    {
        return m_insuranceService.findEmployeeInsuranceById(id);
    }
    @PostMapping("insurance/save")
    public EmployeeInsurance save(@RequestBody EmployeeInsurance insurance)
    {
        return m_insuranceService.addEmployeeInsurance(insurance);
    }
    @DeleteMapping("insurance/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_insuranceService.deleteEmployeeInsuranceById(id);
    }
}
