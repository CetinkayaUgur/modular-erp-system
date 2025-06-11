package com.cancikrikci.app.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
@ComponentScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
public class FinanceServiceApp {
	public static void main(String[] args)
	{
		SpringApplication.run(FinanceServiceApp.class, args);
	}
}
