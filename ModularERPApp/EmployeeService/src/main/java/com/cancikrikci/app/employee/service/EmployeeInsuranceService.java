package com.cancikrikci.app.employee.service;

import com.cancikrikci.app.employee.entity.EmployeeInsurance;
import com.cancikrikci.app.employee.repository.IEmployeeInsuranceRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeInsuranceService {
    private final IEmployeeInsuranceRepository m_insuranceRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50506/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public EmployeeInsuranceService(IEmployeeInsuranceRepository insuranceRepository, RestTemplate restTemplate)
    {
        m_insuranceRepository = insuranceRepository;
        m_restTemplate = restTemplate;
    }

    public List<EmployeeInsurance> getAllEmployeeInsurances()
    {
        return StreamSupport.stream(m_insuranceRepository.findAll().spliterator(), false)
                .filter(e -> e.employee.username.equals(getUsername()))
                .collect(Collectors.toList());
    }
    public EmployeeInsurance findEmployeeInsuranceById(int id)
    {
        return m_insuranceRepository.findById(id).orElseThrow();
    }
    public EmployeeInsurance addEmployeeInsurance(EmployeeInsurance employeeInsurance)
    {
        employeeInsurance.employee.username = getUsername();
        return m_insuranceRepository.save(employeeInsurance);
    }
    public void deleteEmployeeInsuranceById(int id)
    {
        m_insuranceRepository.deleteById(id);
    }

}
