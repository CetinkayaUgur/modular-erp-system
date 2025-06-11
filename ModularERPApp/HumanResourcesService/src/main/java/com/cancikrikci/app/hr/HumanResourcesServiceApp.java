package com.cancikrikci.app.hr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
@ComponentScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
public class HumanResourcesServiceApp {

	public static void main(String[] args)
	{
		SpringApplication.run(HumanResourcesServiceApp.class, args);
	}
}
