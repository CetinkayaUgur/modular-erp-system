package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.JobApplication;
import com.cancikrikci.app.hr.repository.IJobApplicationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class JobApplicationService {
    private final IJobApplicationRepository m_applicationRepository;

    public JobApplicationService(IJobApplicationRepository applicationRepository)
    {
        m_applicationRepository = applicationRepository;
    }

    public List<JobApplication> getAllApplications()
    {
        return StreamSupport.stream(m_applicationRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public JobApplication findApplicationById(int id)
    {
        return m_applicationRepository.findById(id).orElseThrow();
    }

    public List<JobApplication> findApplicationsByStatus(String status)
    {
        return m_applicationRepository.findByStatus(status);
    }

    public List<JobApplication> findApplicationsByDateRange(LocalDate startDate, LocalDate endDate)
    {
        return m_applicationRepository.findByApplicationDateBetween(startDate, endDate);
    }

    public List<JobApplication> findApplicationsByPosition(String position)
    {
        return m_applicationRepository.findByPosition(position);
    }

    public JobApplication addApplication(JobApplication application)
    {
        return m_applicationRepository.save(application);
    }

    public void deleteApplicationById(int id)
    {
        m_applicationRepository.deleteById(id);
    }
} 