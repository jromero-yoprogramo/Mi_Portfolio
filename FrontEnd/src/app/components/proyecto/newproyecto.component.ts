import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { finalize, of } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';
import { FirebaseService } from 'src/app/service/firebase';
import { ImagenProyectoService } from 'src/app/service/imagen-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {

  loading: boolean;
  url: string;
  nombreP: string;
  descripcionP: string;
  imgP: string;

  constructor(private proyectoS: ProyectoService, private activatedRouter: ActivatedRoute,
    private router: Router,
    public imagenProyectoService: ImagenProyectoService,
    public firebase: FirebaseService
  ) {

  }

  ngOnInit() {
    this.imagenProyectoService.url = ""
    this.imagenProyectoService.newImage = ""


  }


  /*onCreate() {
    this.uploadImage()
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.onCreatebis());
      }, 2000);
    });
  }*/

  newImagenUpload($event: any) {

    this.imagenProyectoService.newImagenUpload($event)


  }

  uploadImage() {
    this.loading = true;
    const id = Math.random().toString(36).substring(2);
    const name = "proyecto_" + id;
    console.log(name);
    const file = this.imagenProyectoService.newFile
    const storageRef = ref(this.firebase.storage, `imagenProyecto/${name}`)

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');

          break;
      }
    },
      (error) => {
        console.log('Error al cargar imagen')
      },
      () => {
        console.log('imagen de proyecto subida')

        getDownloadURL(ref(this.firebase.storage, `imagenProyecto/${name}`))
          .then((url) => {
            console.log('La URL es: ' + url);
            this.url = url;
            this.onCreate()
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          })

      }),
      (error: any) => console.log(error);

  }



  /* uploadImage() {
     const id = Math.random().toString(36).substring(2);
     const name = "proyecto_" + id;
     console.log(name);
     this.imagenProyectoService.uploadImage(name);
 
   }*/

  onCreate() {


    const proyecto = new Proyecto(this.nombreP, this.descripcionP, this.url/*this.imagenProyectoService.url*/);

    this.proyectoS.save(proyecto).subscribe(
      data => {
        alert("Proyecto añadido correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )

  }

  cancel() {
    this.router.navigate(['']);
  }

}