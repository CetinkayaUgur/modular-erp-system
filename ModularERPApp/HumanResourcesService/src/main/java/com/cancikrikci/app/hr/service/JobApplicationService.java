package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.JobApplication;
import com.cancikrikci.app.hr.repository.IJobApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class JobApplicationService {
    private final IJobApplicationRepository m_applicationRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50505/api/user/activeuser";


    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public JobApplicationService(IJobApplicationRepository applicationRepository, RestTemplate restTemplate)
    {
        m_applicationRepository = applicationRepository;
        m_restTemplate = restTemplate;
    }

    public List<JobApplication> getAllApplications()
    {
        return StreamSupport.stream(m_applicationRepository.findAll().spliterator(), false)
                .filter(a -> a.username.equals(getUsername()))
                .collect(Collectors.toList());
    }

    public JobApplication findApplicationById(int id)
    {
        return m_applicationRepository.findById(id).orElseThrow();
    }

    public List<JobApplication> findApplicationsByStatus(String status)
    {
        return m_applicationRepository.findByStatus(status)
                .stream()
                .filter(a -> a.username.equals(getUsername()))
                .collect(Collectors.toList());
    }

    public List<JobApplication> findApplicationsByDateRange(LocalDate startDate, LocalDate endDate)
    {
        return m_applicationRepository.findByApplicationDateBetween(startDate, endDate)
                .stream()
                .filter(a -> a.username.equals(getUsername()))
                .collect(Collectors.toList());
    }

    public List<JobApplication> findApplicationsByPosition(String position)
    {
        return m_applicationRepository.findByPosition(position)
                .stream()
                .filter(a -> a.username.equals(getUsername()))
                .collect(Collectors.toList());
    }

    public JobApplication addApplication(JobApplication application)
    {
        application.username = getUsername();
        return m_applicationRepository.save(application);
    }

    public void deleteApplicationById(int id)
    {
        m_applicationRepository.deleteById(id);
    }
} 