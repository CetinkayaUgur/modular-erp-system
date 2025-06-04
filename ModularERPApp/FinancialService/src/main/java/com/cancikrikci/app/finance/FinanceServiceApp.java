package com.cancikrikci.app.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class FinanceServiceApp {
	public static void main(String[] args)
	{
		SpringApplication.run(FinanceServiceApp.class, args);
	}
}
