package com.cancikrikci.app.hr.controller;

import com.cancikrikci.app.hr.entity.EmployeeTraining;
import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.service.EmployeeTrainingService;
import com.cancikrikci.app.hr.service.LeaveService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/hr/leaves/")
public class LeaveController {
    private final LeaveService m_leaveService;

    public LeaveController(LeaveService leaveService)
    {
        m_leaveService = leaveService;
    }
    @GetMapping
    public List<Leave> getAll()
    {
        return m_leaveService.getAllLeaves();
    }

    @GetMapping("leave/{id}")
    public Leave getById(@PathVariable(name = "id") int id)
    {
        return m_leaveService.getLeavesById(id);
    }

    @PostMapping("leave/save")
    public Leave save(@RequestBody Leave leave)
    {
        return m_leaveService.addLeave(leave);
    }
    @DeleteMapping("leave/delete/{id}")
    public void deleteWithId(@PathVariable(name = "id") int id)
    {
        m_leaveService.deleteLeaveById(id);
    }
}
