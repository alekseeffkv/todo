import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBTuoc44VTboO6IVdPO6HgkIlLyO8_9c_E',
  authDomain: 'todo202211.firebaseapp.com',
  projectId: 'todo202211',
  storageBucket: 'todo202211.appspot.com',
  messagingSenderId: '147735105112',
  appId: '1:147735105112:web:571b54441c09038c3a842d',
  measurementId: 'G-DL6JV8M5XB',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
