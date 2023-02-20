import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { persona } from 'src/app/model/persona.model';
import { FirebaseService } from 'src/app/service/firebase';
import { PersonaService } from 'src/app/service/persona.service';




@Component({
  selector: 'app-editacerca-de',
  templateUrl: './editacerca-de.component.html',
  styleUrls: ['./editacerca-de.component.css']
})
export class EditacercaDeComponent implements OnInit{

  loading:boolean;
  url: string = "";
  actFile: any;
  actImage:string = "";
  persona: persona = null;
  disa:boolean;

  constructor(private activatedRouter: ActivatedRoute, private personaService: PersonaService,
     private router: Router,
     public firebase: FirebaseService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    
    this.personaService.detail(id).subscribe(
      data =>{
        this.persona = data;
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.persona.img = this.url
    this.personaService.update(id, this.persona).subscribe(
      data =>{
        alert("Se ha editado correctamente la persona");
        this.router.navigate(['']);
      }, err =>{
        alert("Error al modificar la persona");
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



  /*uploadImage() {
    this.loading = true;
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id;
    const file = this.actFile;
    console.log(file);

  
    const storageRef = ref(this.firebase.storage, 'imagen/' + name)


    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('imagen subida')
      const imagesRef = ref(this.firebase.storage, 'imagen')
      list(imagesRef)
        .then(async response => {
          for (let item of response.items) {
            this.url = await getDownloadURL(item);
            console.log('La URL es: ' + this.url)
            this.onUpdate();
            this.loading = false;
          }
        })
    }),
      (error: any) => console.log(error);

  }*/

  uploadImage() {
   
    this.loading = true;
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id;
    const file = this.actFile
    const storageRef = ref(this.firebase.storage, 'imagen/' + name)

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
        console.log('imagen de persona subida')
        /*this.onUpdate();*/
        getDownloadURL(ref(this.firebase.storage, `imagen/${storageRef.name}`))
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
    alert("Se ha cancelado la edición de la persona");
    this.router.navigate(['']);
  }

}