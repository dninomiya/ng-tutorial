import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = this.afAuth.authState.pipe(
    switchMap(state => {
      if (state) {
        return this.db.doc(`users/${state.uid}`).valueChanges();
      } else {
        return of(null);
      }
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
    return this.afAuth.auth.signInWithPopup(authProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
