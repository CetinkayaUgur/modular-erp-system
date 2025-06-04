package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.entity.PerformanceReview;
import com.cancikrikci.app.hr.repository.ILeaveRepository;
import com.cancikrikci.app.hr.repository.IPerformanceReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class PerformanceReviewService {
    private final IPerformanceReviewRepository m_performanceReviewRepository;

    public PerformanceReviewService(IPerformanceReviewRepository performanceReviewRepository)
    {
        m_performanceReviewRepository = performanceReviewRepository;
    }

    public List<PerformanceReview> getAllPerformanceReviews()
    {
        return StreamSupport.stream(m_performanceReviewRepository.findAll().spliterator(), false)
                .toList();
    }
    public PerformanceReview getPerformanceReviewById(int id)
    {
        return m_performanceReviewRepository.findById(id).orElseThrow();
    }

    public PerformanceReview addPerformanceReview(PerformanceReview pr)
    {
        return m_performanceReviewRepository.save(pr);
    }

    public void deletePerformanceReviewById(int id)
    {
        m_performanceReviewRepository.deleteById(id);
    }
}
