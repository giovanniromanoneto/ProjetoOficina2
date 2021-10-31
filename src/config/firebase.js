import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAzYR5RjAG95A54qhgfLJ2JuPgQdYvU_ps',
  authDomain: 'oficina2-f921b.firebaseapp.com',
  projectId: 'oficina2-f921b',
  storageBucket: 'oficina2-f921b.appspot.com',
  messagingSenderId: '578433304159',
  appId: '1:578433304159:web:57cdf98c3a729d66993dea',
  measurementId: 'G-54S2Q1G2Z8'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export { firebase }
