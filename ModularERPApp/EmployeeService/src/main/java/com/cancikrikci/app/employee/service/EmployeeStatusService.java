package com.cancikrikci.app.employee.service;

import com.cancikrikci.app.employee.entity.EmployeeInsurance;
import com.cancikrikci.app.employee.entity.EmployeeStatus;
import com.cancikrikci.app.employee.repository.IEmployeeInsuranceRepository;
import com.cancikrikci.app.employee.repository.IEmployeeStatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeStatusService {
    private final IEmployeeStatusRepository m_employeeStatusRepository;

    public EmployeeStatusService(IEmployeeStatusRepository employeeStatusRepository)
    {
        m_employeeStatusRepository = employeeStatusRepository;
    }
    public List<EmployeeStatus> getAllEmployeeStatuses()
    {
        return StreamSupport.stream(m_employeeStatusRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
    public EmployeeStatus findEmployeeStatusById(int id)
    {
        return m_employeeStatusRepository.findById(id).orElseThrow();
    }
    public EmployeeStatus addEmployeeStatus(EmployeeStatus status)
    {
        return m_employeeStatusRepository.save(status);
    }
    public void deleteEmployeeStatusById(int id)
    {
        m_employeeStatusRepository.deleteById(id);
    }
}
