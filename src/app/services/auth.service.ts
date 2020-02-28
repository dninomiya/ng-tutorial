import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, tap } from 'rxjs/operators';
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

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  login() {
    const authProvider = new auth.GoogleAuthProvider();
    authProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.afAuth.auth.signInWithPopup(authProvider);
  }

  loginWithEmail(email: string) {
    return this.afAuth.auth
      .sendSignInLinkToEmail(email, {
        url: 'http://localhost:4200',
        handleCodeInApp: true
      })
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  confirmEmailSignIn() {
    if (this.afAuth.auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      this.afAuth.auth
        .signInWithEmailLink(email, window.location.href)
        .then(result => {
          alert('ログインに成功しました');
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  setLastCheckId(uid: string) {
    this.db.doc(`users/${uid}`).update({
      lastCheck: {
        date: new Date(),
        id: 'bbb'
      }
    });
  }
}
