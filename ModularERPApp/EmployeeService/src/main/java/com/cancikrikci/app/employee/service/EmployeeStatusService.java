package com.cancikrikci.app.employee.service;

import com.cancikrikci.app.employee.entity.EmployeeInsurance;
import com.cancikrikci.app.employee.entity.EmployeeStatus;
import com.cancikrikci.app.employee.repository.IEmployeeInsuranceRepository;
import com.cancikrikci.app.employee.repository.IEmployeeStatusRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeStatusService {
    private final IEmployeeStatusRepository m_employeeStatusRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50506/api/user/activeuser";

    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public EmployeeStatusService(IEmployeeStatusRepository employeeStatusRepository, RestTemplate restTemplate)
    {
        m_employeeStatusRepository = employeeStatusRepository;
        m_restTemplate = restTemplate;
    }

    public List<EmployeeStatus> getAllEmployeeStatuses()
    {
        return StreamSupport.stream(m_employeeStatusRepository.findAll().spliterator(), false)
                .filter(s -> s.employee.username.equals(getUsername()))
                .collect(Collectors.toList());
    }
    public EmployeeStatus findEmployeeStatusById(int id)
    {
        return m_employeeStatusRepository.findById(id).orElseThrow();
    }
    public EmployeeStatus addEmployeeStatus(EmployeeStatus status)
    {
        status.employee.username = getUsername();
        return m_employeeStatusRepository.save(status);
    }
    public void deleteEmployeeStatusById(int id)
    {
        m_employeeStatusRepository.deleteById(id);
    }
}
