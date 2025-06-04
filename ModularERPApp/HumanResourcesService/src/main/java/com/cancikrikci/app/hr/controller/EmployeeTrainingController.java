package com.cancikrikci.app.hr.controller;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import com.cancikrikci.app.hr.service.EmployeeTrainingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/hr/employeetrainings")
public class EmployeeTrainingController {
    private final EmployeeTrainingService m_employeeTrainingService;

    public EmployeeTrainingController(EmployeeTrainingService employeeTrainingService)
    {
        m_employeeTrainingService = employeeTrainingService;
    }

    @GetMapping
    public List<EmployeeTraining> getAll()
    {
        return m_employeeTrainingService.getAllEmployeeTrainings();
    }

    @GetMapping("employeetraining/{id}")
    public EmployeeTraining getById(@PathVariable(name = "id") int id)
    {
        return m_employeeTrainingService.getEmployeeTrainingById(id);
    }

    @PostMapping("employeetraining/save")
    public EmployeeTraining save(@RequestBody EmployeeTraining et)
    {
        return m_employeeTrainingService.addEmployeeTraining(et);
    }

    @DeleteMapping("employeetraining/delete/{id}")
    public void deleteWithId(@PathVariable(name = "id") int id)
    {
        m_employeeTrainingService.deleteEmployeeTrainingById(id);
    }
}
