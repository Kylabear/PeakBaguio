const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
    credential: admin.credential.cert(require('./path/to/your/firebase-service-account.json')), // Replace with the actual path
    databaseURL: 'https://<your-project-id>.firebaseio.com'
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
