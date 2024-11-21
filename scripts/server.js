const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');
const authRoutes = require('./scripts/authentication.js');
const app = express();
const port = process.env.PORT || 5000;
const PORT = 3000;

app.use(bodyParser.json());
app.use('/authentication.js', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use(cors());
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const corsOptions = {
  origin: '*', 
  methods: 'GET, POST',
};

app.use(cors(corsOptions));

const openai = new OpenAIApi(configuration);
app.post('/generateitinerary.js', async (req, res) => {
  try {
    const { budget, duration, interests } = req.body;
    const prompt = `Generate an itinerary for a ${budget} traveler for a ${duration}. Interests: ${interests.join(', ')}.`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500,
    });

    res.json({ itinerary: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
