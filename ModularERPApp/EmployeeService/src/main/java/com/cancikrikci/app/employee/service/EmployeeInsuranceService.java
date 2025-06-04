package com.cancikrikci.app.employee.service;

import com.cancikrikci.app.employee.entity.EmployeeInsurance;
import com.cancikrikci.app.employee.repository.IEmployeeInsuranceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeInsuranceService {
    private final IEmployeeInsuranceRepository m_insuranceRepository;

    public EmployeeInsuranceService(IEmployeeInsuranceRepository insuranceRepository)
    {
        m_insuranceRepository = insuranceRepository;
    }
    public List<EmployeeInsurance> getAllEmployeeInsurances()
    {
        return StreamSupport.stream(m_insuranceRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
    public EmployeeInsurance findEmployeeInsuranceById(int id)
    {
        return m_insuranceRepository.findById(id).orElseThrow();
    }
    public EmployeeInsurance addEmployeeInsurance(EmployeeInsurance employeeInsurance)
    {
        return m_insuranceRepository.save(employeeInsurance);
    }
    public void deleteEmployeeInsuranceById(int id)
    {
        m_insuranceRepository.deleteById(id);
    }

}
