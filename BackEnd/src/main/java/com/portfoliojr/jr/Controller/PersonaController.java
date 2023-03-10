package com.portfoliojr.jr.Controller;

import com.portfoliojr.jr.Dto.dtoPersona;
import com.portfoliojr.jr.Entity.Persona;
import com.portfoliojr.jr.Security.Controller.Mensaje;
import com.portfoliojr.jr.Service.ImpPersonaService;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/personas")
//@CrossOrigin(origins = "https://jrfrontend-40145.web.app")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonaController {
    @Autowired
    ImpPersonaService personaService;

    @GetMapping("/lista")
    public ResponseEntity<List<Persona>> list() {
        List<Persona> list = personaService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }
    
    @GetMapping("/detail/{id}")
    public ResponseEntity<Persona> getById(@PathVariable("id") int id) {
        if (!personaService.existsById(id)) 
            return new ResponseEntity(new Mensaje("No existe el ID"), HttpStatus.NOT_FOUND);
        
        Persona persona = personaService.getOne(id).get();
        return new ResponseEntity(persona, HttpStatus.OK);
    }

    /*LO SACO PORQUENO VOY A BORRAR O CREAR PERSONAS, PORQUE ES MI PROPIO PORTFOLIO (SOLO UN USUARIO, EL RESTO PODRA VISUALIZARLO*/
    /*@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!personaService.existsById(id)) {
            return new ResponseEntity(new Mensaje("No existe el ID"), HttpStatus.NOT_FOUND);
        }
        personaService.delete(id);
        return new ResponseEntity(new Mensaje("Persona eliminada"), HttpStatus.OK);
    }*/

    /*@PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody dtoPersona dtopersona) {
        if (StringUtils.isBlank(dtopersona.getNombre())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if (personaService.existsByNombre(dtopersona.getNombre())) {
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        }

        Persona persona = new Persona(dtopersona.getNombre(), dtopersona.getDescripcion());
        personaService.save(persona);
        
        return new ResponseEntity(new Mensaje("Persona creada"), HttpStatus.OK);
    }*/
    
  
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody dtoPersona dtopersona){
        //Para validad si existe el ID
        if(!personaService.existsById(id)){
            return new ResponseEntity(new Mensaje("No existe el ID"), HttpStatus.NOT_FOUND);
        }
        //Para ver si el nombre ya existe
        if(personaService.existsByNombre(dtopersona.getNombre()) && personaService.getByNombre(dtopersona.getNombre()).get().getId() != id){
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        }
        //Para que el nombre no este vacío(no puede estar vacío)
        if (StringUtils.isBlank(dtopersona.getNombre())) {
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        //Para actualizar la educacion
        Persona persona = personaService.getOne(id).get();
        
        persona.setNombre(dtopersona.getNombre());
        persona.setApellido(dtopersona.getApellido());
        persona.setDescripcion(dtopersona.getDescripcion());
        persona.setImg(dtopersona.getImg());

        personaService.save(persona);
        return new ResponseEntity(new Mensaje("La persona se ha actualizado"), HttpStatus.OK);
    }
}
