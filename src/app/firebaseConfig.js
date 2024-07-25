import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyASmbtLZ70Vbmx2GLjE7AtMlUFxnzk4IAg',
  authDomain: 'kitfest-trust.firebaseapp.com',
  databaseURL: 'https://kitfest-trust-default-rtdb.firebaseio.com',
  projectId: 'kitfest-trust',
  storageBucket: 'kitfest-trust.appspot.com',
  messagingSenderId: '269839718417',
  appId: '1:269839718417:web:abccfbf1f32a9c509cb9b0',
  measurementId: 'G-B9SCQW7VLE',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export { auth, database };
