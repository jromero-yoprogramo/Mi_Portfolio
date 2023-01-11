
import { Injectable } from '@angular/core';
import { async } from 'rxjs';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { list, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor() { }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    console.log(file);

    const firebaseConfig = {
      apiKey: "AIzaSyAuxcCRFX6jRSXLbxtsWXH2Q5mylPw5sNw",
      authDomain: "jrfrontend-40145.firebaseapp.com",
      projectId: "jrfrontend-40145",
      storageBucket: "jrfrontend-40145.appspot.com",
      messagingSenderId: "358748765393",
      appId: "1:358748765393:web:df8450feee92b8616c99f0",
      measurementId: "G-M7S2T9TGET"
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, 'imagen/' + name)


    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('imagen subida')
      const imagesRef = ref(storage, 'imagen')
      list(imagesRef)
        .then(async response => {
          for (let item of response.items) {
            this.url = await getDownloadURL(item);
            console.log('La URL es: ' + this.url)
          }
        })
    }),
      (error: any) => console.log(error);

  }






}