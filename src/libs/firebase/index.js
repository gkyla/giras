// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useUserState } from "../../stores/userState";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOg_2OOPSJ1zpvdGoCMPVasem6eH7nJ9I",
  authDomain: "girasena.firebaseapp.com",
  projectId: "girasena",
  storageBucket: "girasena.appspot.com",
  messagingSenderId: "104585000471",
  appId: "1:104585000471:web:bc22aa1fc9a0cfd1bcce52",
  measurementId: "G-2EYF1E79GD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

async function signIn({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
  } catch (error) {
    console.log(error);
  }
}

async function logout() {
  const userState = useUserState();

  await signOut(auth);
  userState.$patch({ user: null });
}

function getCurrentUser() {
  const userState = useUserState();

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      userState.$patch({ user });
      unsubscribe();
      resolve(user);
    });
  });
}

export { signIn, logout, getCurrentUser };
