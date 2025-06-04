package com.cancikrikci.app.payroll.service;

import com.cancikrikci.app.payroll.entity.EmployeeInsurance;
import com.cancikrikci.app.payroll.repository.IEmployeeInsuranceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EmployeeInsuranceService {
    private IEmployeeInsuranceRepository m_insuranceRepository;

    public EmployeeInsuranceService(IEmployeeInsuranceRepository insuranceRepository)
    {
        m_insuranceRepository = insuranceRepository;
    }
    public List<EmployeeInsurance> getAllInsurances() {
        return StreamSupport.stream(m_insuranceRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public EmployeeInsurance getInsuranceById(int id) {
        return m_insuranceRepository.findById(id).orElseThrow();
    }

    public List<EmployeeInsurance> getInsurancesByEmployeeId(int employeeId) {
        return m_insuranceRepository.findByEmployeeId(employeeId);
    }

    public EmployeeInsurance saveInsurance(EmployeeInsurance insurance) {
        return m_insuranceRepository.save(insurance);
    }

    public void deleteInsurance(int id) {
        m_insuranceRepository.deleteById(id);
    }
}
