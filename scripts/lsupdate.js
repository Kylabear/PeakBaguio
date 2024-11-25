import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJ564oay2U0WPQ8V2p0hGEzY848JlnI9c",
    authDomain: "peakbaguio-3173a.firebaseapp.com",
    projectId: "peakbaguio-3173a",
    storageBucket: "peakbaguio-3173a.firebasestorage.app",
    messagingSenderId: "777024042992",
    appId: "1:777024042992:web:86b0b9ef0e7e9e102a0f35",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const user = auth.currentUser;

function updateUserProfile(user){
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth,(user)=>{
    if (user){
        updateUserProfile(user);
        const uid =user.uid
        return uid;
    } else {
        alert("Create an Account & Login");

    }
});