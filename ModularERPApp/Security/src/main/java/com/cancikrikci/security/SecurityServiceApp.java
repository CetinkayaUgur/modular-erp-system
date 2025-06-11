package com.cancikrikci.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.cancikrikci.app","com.cancikrikci.common"})
public class SecurityServiceApp {

	public static void main(String[] args)
	{
		SpringApplication.run(SecurityServiceApp.class, args);
	}
}
