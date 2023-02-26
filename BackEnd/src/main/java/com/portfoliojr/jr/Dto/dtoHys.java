
package com.portfoliojr.jr.Dto;

//import jakarta.validation.constraints.NotBlank;
import java.util.logging.Logger;
import javax.validation.constraints.NotBlank;


public class dtoHys {
    @NotBlank
    private String nombre;
    @NotBlank
    private int porcentaje;
    
    //Constructor

    public dtoHys() {
    }

    public dtoHys(String nombre, int porcentaje) {
        this.nombre = nombre;
        this.porcentaje = porcentaje;
    }
    
    //Getters and Setters

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(int porcentaje) {
        this.porcentaje = porcentaje;
    }
    
    
}
