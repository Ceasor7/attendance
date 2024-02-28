import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAbp0ffy3AFEkR7VRrL9oXhtfl6YpskdWE',
  authDomain: 'auth-development-52ed4.firebaseapp.com',
  databaseURL:
    'https://auth-development-52ed4-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'auth-development-52ed4',
  storageBucket: 'auth-development-52ed4.appspot.com',
  messagingSenderId: '171589561669',
  appId: '1:171589561669:web:464fb13fbc1858a828622c',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
