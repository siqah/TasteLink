import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);


export const addExtraInfo = async (userId, extraInfo) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, extraInfo, { merge: true });
};

export const getExtraInfo = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() ? userSnap.data() : null;
};


export const uploadProfileImage = async (userId, file) => {
    const userRef = doc(db, "users", userId);
    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        await setDoc(userRef, { profileImage: base64String }, { merge: true });
    };

    reader.readAsDataURL(file);
};

export const getProfileImage = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && userSnap.data().profileImage) {
        return `data:image/jpeg;base64,${userSnap.data().profileImage}`;
    } else {
        return null;
    }
};