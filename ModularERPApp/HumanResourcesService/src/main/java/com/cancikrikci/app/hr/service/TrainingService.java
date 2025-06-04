package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.entity.Training;
import com.cancikrikci.app.hr.repository.ILeaveRepository;
import com.cancikrikci.app.hr.repository.ITrainingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class TrainingService {
    private final ITrainingRepository m_trainingRepository;

    public TrainingService(ITrainingRepository trainingRepository)
    {
        m_trainingRepository = trainingRepository;
    }

    public List<Training> getAllTrainings()
    {
        return StreamSupport.stream(m_trainingRepository.findAll().spliterator(), false)
                .toList();
    }
    public Training getTrainingById(int id)
    {
        return m_trainingRepository.findById(id).orElseThrow();
    }

    public Training addTraining(Training training)
    {
        return m_trainingRepository.save(training);
    }

    public void deleteTrainingById(int id)
    {
        m_trainingRepository.deleteById(id);
    }
}
