import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Proyecto } from 'src/app/model/proyecto';
import { FirebaseService } from 'src/app/service/firebase';
import { ImagenProyectoService } from 'src/app/service/imagen-proyecto.service';
import { ProyectoService } from 'src/app/service/proyecto.service';


@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditproyectoComponent implements OnInit {

  
  loading: boolean;
  proyecto: Proyecto = null;
  url: string;
  actFile: any;
  actImage: string
  disa: boolean
  
  constructor(private activatedRouter: ActivatedRoute, private proyectoS: ProyectoService,
    private router: Router,
    public imagenProyectoService: ImagenProyectoService,
    public firebase: FirebaseService) {}

  
  public nom = new FormControl('', Validators.required);
  public des = new FormControl('' , Validators.required)
  public im = new FormControl('', Validators.required);

  public newForm = new FormGroup({
    nom: this.nom,
    des: this.des,
    im: this.im
    
  });


  ngOnInit(): void {
    this.actImage = ""
    
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.proyectoS.detail(id).subscribe(
      data => {
        this.proyecto = data;
      }, err => {
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }



  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];

    this.proyecto.imgP = this.url
    this.proyectoS.update(id, this.proyecto).subscribe(
      data => {
        console.timeEnd()
        alert("Proyecto actualizado correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar el proyecto");
        
        this.router.navigate(['']);
      }
    )
  }

  newImagenUpload($event: any) {
    this.actFile = $event.target.files[0];
    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.actImage = image.target.result as string;

      });
      reader.readAsDataURL($event.target.files[0]);
    }
    console.log(this.actFile)
    this.disa = true;
  }

  
  


  uploadImage() {
       
    this.loading = true;
   /* const id = Math.random().toString(36).substring(2);
    const name = "proyecto_" + id;
    console.log(name);*/
    const file = this.actFile
    const storageRef = ref(this.firebase.storage, this.proyecto.imgP)

    
    
  
    //const storageRef = ref(this.firebase.storage, `imagenProyecto/${name}`);


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
        /*this.onUpdate();*/
        getDownloadURL(ref(this.firebase.storage, `imagenProyecto/${storageRef.name}`))
          .then((url) => {
            console.log('La URL es: ' + url);
            this.url = url;
            this.onUpdate()
            this.loading = false;

          })
          .catch((error) => {
            console.log(error);
          })

      }),
      (error: any) => console.log(error);

  }

  cancel() {
    alert("Se ha cancelado la edición de el proyecto");
    this.router.navigate(['']);
  }

  borrarImagen() {

    const httpsReference = ref(this.firebase.storage, this.proyecto.imgP);


    // Delete the file (image) in firebase
    deleteObject(httpsReference).then(() => {
      console.log("imagen de proyecto borrada correctamente")
      this.uploadImage()
    }).catch((error) => {
      console.log(error)
    });

  }


  comprobar(): void {
    console.time()
    const id = this.activatedRouter.snapshot.params['id'];

    this.proyectoS.update(id, this.proyecto).subscribe(
      data => {
        this.borrarImagen()
      }, err => {
        alert("Error al modificar el proyecto");
        
        this.router.navigate(['']);
      }
    )
  }

  

}
