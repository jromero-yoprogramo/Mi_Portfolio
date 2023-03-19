
package com.portfoliojr.jr;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** * Clase que habilita CORS * @author JR */

@Configuration
@EnableWebMvc
//@ContextConfiguration(loader = AnnotationConfigContextLoader.class,
//        classes = { ServletConfig.class })
public class WebConfig implements WebMvcConfigurer{

    public void addCorsMapping(CorsRegistry registry){
        registry.addMapping("/**");
    }
}
