package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import com.cancikrikci.app.hr.repository.IEmployeeTrainingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class EmployeeTrainingService {
    private final IEmployeeTrainingRepository m_employeeTrainingRepository;

    public EmployeeTrainingService(IEmployeeTrainingRepository employeeTrainingRepository)
    {
        m_employeeTrainingRepository = employeeTrainingRepository;
    }

    public List<EmployeeTraining> getAllEmployeeTrainings()
    {
        return StreamSupport.stream(m_employeeTrainingRepository.findAll().spliterator(), false)
                .toList();
    }
    public EmployeeTraining getEmployeeTrainingById(int id)
    {
        return m_employeeTrainingRepository.findById(id).orElseThrow();
    }

    public EmployeeTraining addEmployeeTraining(EmployeeTraining et)
    {
        return m_employeeTrainingRepository.save(et);
    }

    public void deleteEmployeeTrainingById(int id)
    {
        m_employeeTrainingRepository.deleteById(id);
    }
}
