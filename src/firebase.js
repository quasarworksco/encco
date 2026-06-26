import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCPfZ_wqHALFF4bLS5UfX8tr5jmM1QYK8c",
  authDomain: "encco-925e1.firebaseapp.com",
  projectId: "encco-925e1",
  storageBucket: "encco-925e1.firebasestorage.app",
  messagingSenderId: "15019634613",
  appId: "1:15019634613:web:83a54c4b5b655b050933fc"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
