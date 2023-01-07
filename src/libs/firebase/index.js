// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
export const storage = getStorage(app);

// firestore Collection Ref
const homeRef = collection(db, "home");
const historyRef = collection(db, "history");
const historyPostsRef = collection(db, "history-posts");
const aboutMeRef = collection(db, "aboutMe");
const myWorksRef = collection(db, "works");
const socialsRef = collection(db, "socials");

// storage ref
export function createStorageRef(type) {
  switch (type) {
    case "history-posts":
    case "home":
    case "aboutMe":
    case "works":
      return ref(storage, `images/${type}-${crypto.randomUUID()}`);
    default:
      console.log("something wrong ", type);
  }
}

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

/* GET  DOC */
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

/* SAVE */
export async function addDocument(type, payload) {
  switch (type) {
    case "works":
      return await addDoc(myWorksRef, payload);

    case "history-posts":
      return await addDoc(historyPostsRef, payload);
  }
}

/* update */
export async function setDocument(type, id, payload) {
  switch (type) {
    case "works":
      return await setDoc(doc(db, "works", id), payload);

    case "history-posts":
      return await setDoc(doc(db, "history-posts", id), payload);
  }
}

export async function deleteDocument(type, id, payload) {
  switch (type) {
    case "works":
      return await deleteDoc(doc(db, "works", id));

    case "history-posts":
      return await deleteDoc(doc(db, "history-posts", id));
  }
}

/* Storage */

export function uploadFile(ref, file) {
  const uploadTask = uploadBytesResumable(ref, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Unsuccess
        reject(error);
      },
      () => {
        console.log("upload snapshot :", uploadTask.snapshot);
        // Success upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
