import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "eskuvoi-dekoracio", appId: "1:472978350465:web:175b8eaf9a9010a1ae4880", storageBucket: "eskuvoi-dekoracio.firebasestorage.app", apiKey: "AIzaSyAV-SrxnxBgn25lWKV4UPOp8qeicHQLEn4", authDomain: "eskuvoi-dekoracio.firebaseapp.com", messagingSenderId: "472978350465", measurementId: "G-QWC1P5JJ3J" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
});