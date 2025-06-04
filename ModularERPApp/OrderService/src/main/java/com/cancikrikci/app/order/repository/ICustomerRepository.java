package com.cancikrikci.app.order.repository;

import com.cancikrikci.app.order.entity.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends CrudRepository<Customer, Integer> {
    Iterable<Customer> findByFirstNameAndLastName(String firstName, String lastName);
    Customer findByPhone(String phone);
    Customer findByEmail(String email);
}
