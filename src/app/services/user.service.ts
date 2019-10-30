import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getUser(id: string) {
    return this.db.doc(`users/${id}`).valueChanges();
  }

  async updateAvatar(userId: string, file: File) {
    const result = await this.storage.ref(`users/${userId}`).put(file);
    const photoURL = await result.ref.getDownloadURL();

    return this.db.doc(`users/${userId}`).update({
      photoURL
    });
  }
}
