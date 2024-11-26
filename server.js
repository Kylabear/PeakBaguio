const express = require('express');
const bodyParser = require('body-parser');
const firebaseAdmin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config();
const { Configuration, OpenAIApi } = require('openai');
const nodemailer = require('nodemailer'); // For sending emails
const { auth, db } = require('./firebaseConfig');  // if you're using these
const pdf = require('pdfkit'); // For generating PDFs
const fs = require('fs');
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const users = {
  "user@example.com": "password123",
};

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate credentials
  if (users[email] && users[email] === password) {
    // Redirect to the main page (index.html) if successful
    res.redirect("/index.html");
  } else {
    // Send error response if login fails
    res.status(401).send("Invalid email or password. Please try again.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({ apiKey: 'OPENAI_API_KEY' }));
app.post('/generateitinerary', async (req, res) => {
    const { budget, duration, startDate, endDate, groupSize, transportation, activities } = req.body;

    const prompt = `
      Create a personalized travel itinerary:
      - Budget: ${budget}
      - Duration: ${duration}
      - Travel Dates: ${startDate} to ${endDate}
      - Group Size: ${groupSize}
      - Preferred Transportation: ${transportation}
      - Interests: ${activities.join(', ')}

      Make it detailed, including activities, restaurants, and recommendations.
    `;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 1000,
        });

        const itinerary = response.data.choices[0].text.trim().split('\n');

        res.json({ itinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});

// Endpoint to send itinerary via email
app.post('/sendemail', async (req, res) => {
    const { email, itinerary } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'your_email@gmail.com', pass: 'your_email_password' }
    });

    // Email content
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your Travel Itinerary',
        text: itinerary.join('\n'),
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

app.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verify the email and password using Firebase Authentication
      const userCredential = await auth.getUserByEmail(email);  // You can validate email first
      const user = userCredential;
  
      // Check if the user exists in Firestore and their role
      const userDoc = await db.collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
      }
  
      const userData = userDoc.data();
      if (userData.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
      }
  
      // If everything is fine, respond with success (you can send a JWT or redirect here)
      res.status(200).json({ message: 'Admin logged in successfully', userEmail: user.email });
  
    } catch (err) {
      res.status(400).json({ error: 'Invalid email or password.' });
    }
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const cors = require('cors');
  app.use(cors());

  const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Here you would typically authenticate against a database
  if (username === 'admin' && password === 'admin123') {
    res.send('Login successful');
  } else {
    res.send('Invalid username or password');
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);

});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
const serviceAccount = require("./path-to-your-serviceAccountKey.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/u/0/project/peakbaguio-3173a/database",
});

// Middleware
app.use(bodyParser.json());

// Endpoint to fetch budget, duration, and interests from Firestore
app.get("/get-itinerary-fields", async (req, res) => {
  try {
    const itineraryRef = firebaseAdmin.firestore().doc("itineraryFields/fields");
    const doc = await itineraryRef.get();
    
    if (!doc.exists) {
      return res.status(404).send("Fields not found.");
    }

    const data = doc.data();
    res.json(data); // Send back the data: budgets, durations, interests
  } catch (error) {
    res.status(500).send("Error fetching data from Firestore");
  }
});

// Endpoint to generate itinerary based on form data
app.post("/generate-itinerary", async (req, res) => {
  const { budget, duration, interests } = req.body;

  // Prompt for OpenAI API
  const prompt = `Create a travel itinerary for Baguio City based on the following details:
    - Budget: ${budget}
    - Duration: ${duration}
    - Interests: ${interests.join(", ")}
    Suggest accommodations based on the budget provided.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an AI that generates travel itineraries." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const itinerary = response.data.choices[0].message.content.trim();
    res.json({ itinerary });
  } catch (error) {
    res.status(500).send("Error generating itinerary.");
  }
});

// Start server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault(),
    databaseURL: "https://console.firebase.google.com/u/0/project/peakbaguio-3173a/overview", 
  });
  
  
  // Middleware
  app.use(express.static("public")); // Serve static files (HTML, CSS, JS)
  app.use(express.json()); // Parse JSON request bodies
  
  // Endpoint to get options from Firestore
  app.get("/api/fields", async (req, res) => {
    try {
      const docRef = db.collection("itineraryFields").doc("fields");
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(404).send("Fields not found");
      }
      const data = doc.data();
      res.json(data); // Return the fields data (budget, duration, interests)
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      res.status(500).send("Error fetching data");
    }
  });
  
  // Endpoint to generate the itinerary
  app.post("/api/generate-itinerary", async (req, res) => {
    const { budget, duration, interests } = req.body;
  
    // Construct the prompt for OpenAI API
    const prompt = `Create a travel itinerary for Baguio City based on the following details:\n
    - Budget: ${budget}\n
    - Duration: ${duration}\n
    - Interests: ${interests.join(", ")}\n
    Suggest accommodations based on the budget provided.`;
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are an AI that generates travel itineraries." },
            { role: "user", content: prompt },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      const itinerary = response.data.choices[0].message.content.trim();
      res.json({ itinerary }); // Return the generated itinerary
    } catch (error) {
      console.error("Error generating itinerary:", error);
      res.status(500).send("Error generating itinerary");
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });