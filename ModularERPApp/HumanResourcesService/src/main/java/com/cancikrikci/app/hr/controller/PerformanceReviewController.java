package com.cancikrikci.app.hr.controller;

import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.entity.PerformanceReview;
import com.cancikrikci.app.hr.service.LeaveService;
import com.cancikrikci.app.hr.service.PerformanceReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/hr/PerformanceReviews/")
public class PerformanceReviewController {
    private final PerformanceReviewService m_performanceReviewService;

    public PerformanceReviewController(PerformanceReviewService prs)
    {
        m_performanceReviewService = prs;
    }
    @GetMapping
    public List<PerformanceReview> getAll()
    {
        return m_performanceReviewService.getAllPerformanceReviews();
    }

    @GetMapping("review/{id}")
    public PerformanceReview getById(@PathVariable(name = "id") int id)
    {
        return m_performanceReviewService.getPerformanceReviewById(id);
    }

    @PostMapping("review/save")
    public PerformanceReview save(@RequestBody PerformanceReview pr)
    {
        return m_performanceReviewService.addPerformanceReview(pr);
    }

    @DeleteMapping("review/delete/{id}")
    public void deleteWithId(@PathVariable(name = "id") int id)
    {
        m_performanceReviewService.deletePerformanceReviewById(id);
    }
}
