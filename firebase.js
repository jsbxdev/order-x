import firebase from 'firebase/app'
import firebaseConfig from '~/firebaseConfig'

export default function() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

  return firebase.apps[0]
}
