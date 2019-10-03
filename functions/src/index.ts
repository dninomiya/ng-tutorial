import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

export const createUser = functions.auth.user().onCreate(user => {
  return admin.database(`users/${user.uid}`).set({
    ...user,
    createdAt: new Date()
  })
});
