package com.cancikrikci.app.payroll.controller;

import com.cancikrikci.app.payroll.entity.EmployeeInsurance;
import com.cancikrikci.app.payroll.service.EmployeeInsuranceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/payroll/insurances")
public class EmployeeInsuranceController {
    private final EmployeeInsuranceService m_employeeInsuranceService;

    public EmployeeInsuranceController(EmployeeInsuranceService employeeInsuranceService)
    {
        m_employeeInsuranceService = employeeInsuranceService;
    }
    @GetMapping
    public List<EmployeeInsurance> getAllInsurances()
    {
        return m_employeeInsuranceService.getAllInsurances();
    }

    @GetMapping("insurance/{id}")
    public EmployeeInsurance getInsuranceById(@PathVariable(name = "id") int id)
    {
        return m_employeeInsuranceService.getInsuranceById(id);
    }

    @GetMapping("insurance/employee/{employeeId}")
    public List<EmployeeInsurance> getInsurancesByEmployeeId(@PathVariable(name = "employeeId") int employeeId)
    {
        return m_employeeInsuranceService.getInsurancesByEmployeeId(employeeId);
    }

    @PostMapping("insurance/save")
    public EmployeeInsurance saveInsurance(@RequestBody EmployeeInsurance insurance)
    {
        return m_employeeInsuranceService.saveInsurance(insurance);
    }

    @DeleteMapping("insurance/delete/{id}")
    public void deleteInsurance(@PathVariable(name = "id") int id)
    {
        m_employeeInsuranceService.deleteInsurance(id);
    }
}
