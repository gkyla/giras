// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useUserState } from "../../stores/userState";
import { useHome } from "../../stores/homeTab";
import { useHistoryTab } from "../../stores/historyTab";
import { useSocials } from "../../stores/socialsTab";
import { useMyWorks } from "../../stores/myWorksTab";

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
export const storage = getStorage(app)

// Collection Ref
const homeRef = collection(db, "home");
const historyRef = collection(db, "history");
const historyPostsRef = collection(db, "history-posts");
const aboutMeRef = collection(db, "aboutMe");
const myWorksRef = collection(db, "works");
const socialsRef = collection(db, "socials");

export async function signIn({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
  const homeState = useHome();
  const historyState = useHistoryTab();
  const socialsState = useSocials();
  const myWorksState = useMyWorks();

  console.log(filteredData);
  filteredData.forEach(({ pathId, data }) => {
    switch (pathId) {
      case "home":
        homeState.edit(data[0]);
        break;
      case "history":
        historyState.editSection(data[0]);
        break;
      case "history-posts":
        data.forEach((d) => {
          historyState.addPost(d);
        });
        break;
      case "socials":
        socialsState.edit(data[0]);
        break;
      case "works":
        data.forEach((d) => {
          myWorksState.addPost({
            ...d,
            date: d.date.toDate(),
          });
        });
      default:
        console.log("err");
    }
  });
}
