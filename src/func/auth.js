import { writable } from 'svelte/store';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebase-init";


setPersistence(auth, browserLocalPersistence)
    .then(() => {
        initUser()
    })

async function initUser() {
    if (auth.currentUser != null) {
        currentUserStore.set(auth.currentUser);
    }
}

async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            initUser()
            return userCredential.user;
        })
}

const currentUserStore = writable(
    {}
);

export { signIn, currentUserStore };
