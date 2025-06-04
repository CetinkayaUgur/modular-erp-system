package com.cancikrikci.app.order.controller;

import com.cancikrikci.app.order.entity.Customer;
import com.cancikrikci.app.order.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ord/customers")
public class CustomerController {
    private final CustomerService m_customerService;

    public CustomerController(CustomerService customerService)
    {
        m_customerService = customerService;
    }

    @GetMapping
    public List<Customer> getAll()
    {
        return m_customerService.getAllCustomers();
    }

    @GetMapping("{id}")
    public Customer getById(@PathVariable(name = "id") int id)
    {
        return m_customerService.getCustomerById(id);
    }

    @GetMapping("name")
    public List<Customer> getByName(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName)
    {
        return m_customerService.getCustomersByName(firstName, lastName);
    }

    @GetMapping("phone/{phone}")
    public Customer getByPhone(@PathVariable(name = "phone") String phone)
    {
        return m_customerService.getCustomerByPhone(phone);
    }

    @GetMapping("email/{email}")
    public Customer getByEmail(@PathVariable(name = "email") String email)
    {
        return m_customerService.getCustomerByEmail(email);
    }

    @PostMapping("save")
    public Customer save(@RequestBody Customer customer)
    {
        return m_customerService.saveCustomer(customer);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable(name = "id") int id)
    {
        m_customerService.deleteCustomer(id);
    }
}
