import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ImagenProyectoService } from 'src/app/service/imagen-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
 
  proyec: Proyecto[] = [];
 
  constructor(private proyectoS: ProyectoService,
    private tokenService: TokenService,
    public imagenProyectoService: ImagenProyectoService) {

     }
  isLogged = false;

  ngOnInit(): void {

    this.cargarProyecto();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyecto(): void {
    this.proyectoS.lista().subscribe(
      data => {
        this.proyec = data;
      }
    )

  }

  delete(id: number) {
   
    if (id != undefined) {
      this.proyectoS.delete(id).subscribe(
        data => {
          this.cargarProyecto();
        }, err => {
          alert("No se pudo eliminar");
        }
      )

    }


  }

  
  borrarImagen(proyecto: Proyecto){
    
  
   this.imagenProyectoService.borrarImagen(proyecto);

  }

  

}




