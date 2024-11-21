const express = require('express');
const bcrypt = require('bcryptjs');
const { db, auth } = require('./firebase');  
const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRef = db.collection('users').doc(email);
        await userRef.set({
            name,
            email,
            password: hashedPassword
        });
        
        res.status(200).send({ message: 'Sign-up successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Database error during sign-up.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRef = db.collection('users').doc(email);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ error: 'User not found.' });
        }

        const user = userDoc.data();
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({ error: 'Incorrect password.' });
        }

        res.status(200).send({ message: 'Login successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error during login.' });
    }
});

module.exports = router;
