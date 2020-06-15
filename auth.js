import firebase from 'firebase/app'
import 'firebase/auth'
import initializeApp from '~/firebase'
initializeApp()

// Auth
export const auth = firebase.auth()
firebase.auth().languageCode = 'pt_BR'
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
