import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Proyecto } from 'src/app/model/proyecto';
import { FirebaseService } from 'src/app/service/firebase';
import { ImagenProyectoService } from 'src/app/service/imagen-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';






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
  newImage: string
  newFile: any


  constructor(private proyectoS: ProyectoService, private activatedRouter: ActivatedRoute,
    private router: Router,
    public imagenProyectoService: ImagenProyectoService,
    public firebase: FirebaseService,

  ) {
    this.url = ""
    this.newImage = ""

  }


  public nom = new FormControl('', Validators.required);
  public des = new FormControl('', Validators.required);
  public im = new FormControl('', Validators.required);

  public newForm = new FormGroup({
    nom: this.nom,
    des: this.des,
    im: this.im,

  });


  ngOnInit() {

    this.imagenProyectoService.newImage = this.newImage
   

  }

  



  newImagenUpload($event: any) {

    this.imagenProyectoService.newImagenUpload($event)


  }

  uploadImage() {

    this.loading = true;
    const id = Math.random().toString(36).substring(2);
    const name = "proyecto_" + id;
    console.log(name);
    const file = this.imagenProyectoService.newFile
  
    const storageRef = ref(this.firebase.storage, `imagenProyecto/${name}`);

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
        this.loading = false;
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





  onCreate() {
    this.descripcionP = this.newForm.value.des
    this.nombreP = this.newForm.value.nom
    this.imgP = this.newForm.value.im

    const proyecto = new Proyecto(this.nombreP, this.descripcionP, this.url/*this.imagenProyectoService.url*/);
    
    this.proyectoS.save(proyecto).subscribe(
      data => {
        alert("Proyecto añadido correctamente");

        this.router.navigate(['']);
      }, err => {
        this.borrarImagen()
        alert("Fallo al añadir el proyecto");
        this.router.navigate(['']);
      }
    )

  }

  cancel() {
    alert("Se ha cancelado el agregado de el proyecto");
    this.router.navigate(['']);
  }







  borrarImagen() {

    const httpsReference = ref(this.firebase.storage, this.url);


    // Delete the file (image) in firebase
    deleteObject(httpsReference).then(() => {
      console.log("imagen de proyecto borrada correctamente")
    }).catch((error) => {
      console.log(error)
    });

  }

}


