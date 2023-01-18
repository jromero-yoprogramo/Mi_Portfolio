import { Injectable, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { deleteObject, getDownloadURL, getStorage, list, ref, uploadBytes, uploadBytesResumable, uploadString } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { Storage } from '@angular/fire/storage'
import { Proyecto } from '../model/proyecto';
import { FirebaseService } from 'src/app/service/firebase';

@Injectable({
  providedIn: 'root'
})
export class ImagenProyectoService implements OnInit {
  /*url: string = "";*/
  newImage = "";
  newFile: any
  name: any;
  constructor(public firebase: FirebaseService) {
    this.newFile = null

  }

  ngOnInit(): void {

  }


  newImagenUpload($event: any) {
    this.newFile = $event.target.files[0];
    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;

      });
      reader.readAsDataURL($event.target.files[0]);
    }
    console.log(this.newFile)

  }






  /*uploadImage(name: string){

    const file = this.newFile
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
           
           
          })
          .catch((error) => {
            console.log(error);
          })

      }),
      (error: any) => console.log(error);
  }*/




  borrarImagen(proyecto: Proyecto) {

    const httpsReference = ref(this.firebase.storage, proyecto.imgP);


    // Delete the file 
    deleteObject(httpsReference).then(() => {
      console.log("Proyecto borrado correctamente")
    }).catch((error) => {
      console.log(error)
    });

  }




}