// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useUserState } from "../../stores/userState";

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
export const db = getFirestore(app);

// Collection Ref
const homeRef = collection(db, "home");
const historyRef = collection(db, "history");
const historyPostsRef = collection(db, "history-posts");
const aboutMeRef = collection(db, "aboutMe");
const myWorksRef = collection(db, "myWorks");
const socialsRef = collection(db, "socials");

export async function signIn({ email, password }) {
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

export async function logout() {
  const userState = useUserState();

  await signOut(auth);
  userState.$patch({ user: null });
}

export function getCurrentUser() {
  const userState = useUserState();

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      userState.$patch({ user });
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getDocuments() {
  const snapshots = await getDocs(aboutMeRef);
  snapshots.docs.forEach((doc) => {
    console.log(doc.data());
  });
}

const listRef = [homeRef, historyRef, historyPostsRef, myWorksRef, socialsRef];

export async function getEveryCollection() {
  const promisedListRef = [];
  listRef.forEach((ref) => {
    promisedListRef.push(getDocs(ref));
  });

  const allSnapshots = await Promise.all(promisedListRef);

  // Get desired data
  const filteredData = [];
  const filteredDataById = [];
  allSnapshots.forEach(({ docs }) => {
    docs.forEach((doc) => {
      const pathIdRef = doc.ref.path.split("/")[0];
      const findDocs = filteredData.some((doc) => doc.pathId === pathIdRef);

      if (!findDocs) {
        filteredData.push({
          pathId: doc.ref.path.split("/")[0],
          data: [
            {
              id: doc.id,
              ...doc.data(),
            },
          ],
        });
      } else {
        filteredData
          .find((doc) => doc.pathId === pathIdRef)
          .data.push({ id: doc.id, ...doc.data() });
      }
    });
  });

  // TODO: add to stores
  // console.log(filteredData);
}
