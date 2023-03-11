package com.portfoliojr.jr;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@EnableAutoConfiguration(exclude={UserDetailsServiceAutoConfiguration.class})
//@SpringBootApplication
public class JrApplication {

	public static void main(String[] args) {
		SpringApplication.run(JrApplication.class, args);
	}      
        
//        @Bean(name = "mvcHandlerMappingIntrospector")
//	public HandlerMappingIntrospector mvcHandlerMappingIntrospector() {
//		return new HandlerMappingIntrospector();
//	}
             
}

