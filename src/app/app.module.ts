import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule }   from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

export const firebaseConfig = {
  apiKey: "AIzaSyAB6eyI8D0DwDzRQI6vdbl7WIDvbh4zFnI",
  authDomain: "talkon-d8721.firebaseapp.com",
  databaseURL: "https://talkon-d8721.firebaseio.com",
  projectId: "talkon-d8721",
  storageBucket: "",
  messagingSenderId: "980666939950"
}; 


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/database, only needed for database features
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditUserPage
   ],
  providers: [
    FirebaseServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
