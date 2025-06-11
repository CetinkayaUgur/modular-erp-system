package com.cancikrikci.app.hr.service;

import com.cancikrikci.app.hr.entity.Leave;
import com.cancikrikci.app.hr.entity.Training;
import com.cancikrikci.app.hr.repository.ILeaveRepository;
import com.cancikrikci.app.hr.repository.ITrainingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class TrainingService {
    private final ITrainingRepository m_trainingRepository;
    private final RestTemplate m_restTemplate;
    private final String m_url = "http://localhost:50505/api/user/activeuser";


    private String getUsername()
    {
        return m_restTemplate.getForObject(m_url, String.class);
    }

    public TrainingService(ITrainingRepository trainingRepository, RestTemplate restTemplate)
    {
        m_trainingRepository = trainingRepository;
        m_restTemplate = restTemplate;
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
        training.employees.forEach(e -> e.username = getUsername());
        return m_trainingRepository.save(training);
    }

    public void deleteTrainingById(int id)
    {
        m_trainingRepository.deleteById(id);
    }
}
