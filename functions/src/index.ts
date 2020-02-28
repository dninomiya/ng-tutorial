import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { shouldEventRun, markEventTried } from './util';

const db = admin.firestore();

export const createUser = functions.auth.user().onCreate(user => {
  return db.doc(`users/${user.uid}`).set({
    name: user.displayName,
    photoURL: user.photoURL,
    createdAt: new Date()
  });
});

export const likeArticle = functions.firestore
  .document('articles/{articleId}/likedUserIds/{userId}')
  .onCreate((snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db.doc(`articles/${context.params.articleId}`).update({
          likeCount: admin.firestore.FieldValue.increment(1)
        });
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });

export const unlikeArticle = functions.firestore
  .document('articles/{articleId}/likedUserIds/{userId}')
  .onDelete((snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db.doc(`articles/${context.params.articleId}`).update({
          likeCount: admin.firestore.FieldValue.increment(-1)
        });
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });
