package com.cancikrikci.app.order.service;

import com.cancikrikci.app.order.entity.Customer;
import com.cancikrikci.app.order.repository.ICustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CustomerService {
    private final ICustomerRepository m_customerRepository;

    public CustomerService(ICustomerRepository customerRepository) {
        m_customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return StreamSupport.stream(m_customerRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Customer getCustomerById(int id) {
        return m_customerRepository.findById(id).orElseThrow();
    }

    public List<Customer> getCustomersByName(String firstName, String lastName) {
        return StreamSupport.stream(m_customerRepository.findByFirstNameAndLastName(firstName, lastName).spliterator(), false)
                .collect(Collectors.toList());
    }

    public Customer getCustomerByPhone(String phone) {
        return m_customerRepository.findByPhone(phone);
    }

    public Customer getCustomerByEmail(String email) {
        return m_customerRepository.findByEmail(email);
    }

    public Customer saveCustomer(Customer customer) {
        return m_customerRepository.save(customer);
    }

    public void deleteCustomer(int id) {
        m_customerRepository.deleteById(id);
    }
}
