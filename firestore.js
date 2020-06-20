import firebase from 'firebase/app'
import 'firebase/firestore'
import initializeApp from '~/firebase'
initializeApp()

// Enabable persistence
firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

// Firestore
export const database = firebase.firestore()
export const FieldValue = firebase.firestore.FieldValue

// Collections
export const organizationsRef = database.collection('organizations')
export const usersRef = database.collection('users')
