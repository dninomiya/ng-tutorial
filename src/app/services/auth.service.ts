import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = this.afAuth.authState.pipe(
    switchMap(state => {
      return this.db.doc(`users/${state.uid}`).valueChanges();
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  login() {
    const authProvider = new auth.GoogleAuthProvider();
    authProvider.setCustomParameters({
      prompt: 'select_account'
    });
    this.afAuth.auth.signInWithPopup(authProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
