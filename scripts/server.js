const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const nodemailer = require('nodemailer'); // For sending emails
const pdf = require('pdfkit'); // For generating PDFs
const fs = require('fs');

const app = express();
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
