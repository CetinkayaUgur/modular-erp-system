package com.cancikrikci.app.hr.controller;

import com.cancikrikci.app.hr.entity.JobApplication;
import com.cancikrikci.app.hr.service.JobApplicationService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/hr/applications")
public class JobApplicationController {
    private final JobApplicationService m_applicationService;

    public JobApplicationController(JobApplicationService applicationService)
    {
        m_applicationService = applicationService;
    }

    @GetMapping
    public List<JobApplication> getAll()
    {
        return m_applicationService.getAllApplications();
    }

    @GetMapping("application/{id}")
    public JobApplication findById(@PathVariable(name = "id") int id)
    {
        return m_applicationService.findApplicationById(id);
    }

    @GetMapping("application/status/{status}")
    public List<JobApplication> findByStatus(@PathVariable(name = "status") String status)
    {
        return m_applicationService.findApplicationsByStatus(status);
    }

    @GetMapping("application/date-range")
    public List<JobApplication> findByDateRange(@RequestParam(name = "startDate") LocalDate startDate,
                                                @RequestParam(name = "endDate") LocalDate endDate)
    {
        return m_applicationService.findApplicationsByDateRange(startDate, endDate);
    }

    @GetMapping("application/position/{position}")
    public List<JobApplication> findByPosition(@PathVariable(name = "position") String position)
    {
        return m_applicationService.findApplicationsByPosition(position);
    }

    @PostMapping("application/save")
    public JobApplication save(@RequestBody JobApplication application)
    {
        return m_applicationService.addApplication(application);
    }

    @DeleteMapping("application/delete/{id}")
    public void deleteById(@PathVariable(name = "id") int id)
    {
        m_applicationService.deleteApplicationById(id);
    }
} 