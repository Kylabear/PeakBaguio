import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googlelogin = document.getElementById("google-plus");
if (googlelogin) {
    googlelogin.addEventListener("click", function () {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Signed in user:", user);

                // Update user profile in UI
                updateUserProfile(user);

                // Redirect to another page
                window.location.href = "../upin.html";
            })
            .catch((error) => {
                console.error(`Error during sign-in: ${error.code} - ${error.message}`);
                alert("An error occurred during Google Sign-In. Please try again.");
            });
    });
} else {
    console.error("Element with ID 'google-plus' not found.");
}

function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    const nameElement = document.getElementById("userName");
    const emailElement = document.getElementById("userEmail");
    const profilePictureElement = document.getElementById("userProfilePicture");

    if (nameElement) nameElement.textContent = userName;
    if (emailElement) emailElement.textContent = userEmail;
    if (profilePictureElement) profilePictureElement.src = userProfilePicture;
}
