package com.cancikrikci.app.hr.controller;

import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.entity.Training;
import com.cancikrikci.app.hr.service.LeaveService;
import com.cancikrikci.app.hr.service.TrainingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/hr/trainings")
public class TrainingController {
    private final TrainingService m_trainingService;
    public TrainingController(TrainingService trainingService)
    {
        m_trainingService = trainingService;
    }
    @GetMapping
    public List<Training> getAll()
    {
        return m_trainingService.getAllTrainings();
    }

    @GetMapping("training/{id}")
    public Training getById(@PathVariable(name = "id") int id)
    {
        return m_trainingService.getTrainingById(id);
    }

    @PostMapping("training/save")
    public Training save(@RequestBody Training training)
    {
        return m_trainingService.addTraining(training);
    }
    @DeleteMapping("training/delete/{id}")
    public void deleteWithId(@PathVariable(name = "id") int id)
    {
        m_trainingService.deleteTrainingById(id);
    }
}
