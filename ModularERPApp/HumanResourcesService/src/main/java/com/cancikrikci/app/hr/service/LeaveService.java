package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.repository.IEmployeeTrainingRepository;
import com.cancikrikci.app.hr.repository.ILeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class LeaveService {
    private final ILeaveRepository m_leaveRepository;

    public LeaveService(ILeaveRepository leaveRepository)
    {
        m_leaveRepository = leaveRepository;
    }

    public List<Leave> getAllLeaves()
    {
        return StreamSupport.stream(m_leaveRepository.findAll().spliterator(), false)
                .toList();
    }
    public Leave getLeavesById(int id)
    {
        return m_leaveRepository.findById(id).orElseThrow();
    }

    public Leave addLeave(Leave leave)
    {
        return m_leaveRepository.save(leave);
    }

    public void deleteLeaveById(int id)
    {
        m_leaveRepository.deleteById(id);
    }
}
