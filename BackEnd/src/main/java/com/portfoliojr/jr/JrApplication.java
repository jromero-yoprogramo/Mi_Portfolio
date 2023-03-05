package com.portfoliojr.jr;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.web.servlet.handler.HandlerMappingIntrospector;


@SpringBootApplication
public class JrApplication {

	public static void main(String[] args) {
		SpringApplication.run(JrApplication.class, args);
	}      
        
//        @Bean(name = "mvcHandlerMappingIntrospector")
//	public HandlerMappingIntrospector mvcHandlerMappingIntrospector() {
//		return new HandlerMappingIntrospector();
//	}
             
}

