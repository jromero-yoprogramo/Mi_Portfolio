import { Injectable, OnInit } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService implements OnInit {
   

    constructor() { }

    ngOnInit(): void {
        
    }

    firebaseConfig = {
        apiKey: "AIzaSyAuxcCRFX6jRSXLbxtsWXH2Q5mylPw5sNw",
        authDomain: "jrfrontend-40145.firebaseapp.com",
        projectId: "jrfrontend-40145",
        storageBucket: "jrfrontend-40145.appspot.com",
        messagingSenderId: "358748765393",
        appId: "1:358748765393:web:df8450feee92b8616c99f0",
        measurementId: "G-M7S2T9TGET"
    };
    app = initializeApp(this.firebaseConfig);
    storage = getStorage(this.app);

}