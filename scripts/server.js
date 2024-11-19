const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: 'our api key',
});
const openai = new OpenAIApi(configuration);
app.post('/generate-itinerary', async (req, res) => {
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
