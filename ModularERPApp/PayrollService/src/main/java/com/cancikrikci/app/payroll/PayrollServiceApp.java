package com.cancikrikci.app.payroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
@ComponentScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
public class PayrollServiceApp {

	public static void main(String[] args)
	{
		SpringApplication.run(PayrollServiceApp.class, args);

	}

}
