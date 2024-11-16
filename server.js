const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const destinations = {
  nature: ["Botanical Garden", "Mines View Park", "Burnham Park"],
  cultural: ["Tam-awan Village", "Baguio Cathedral", "BenCab Museum"],
  adventure: ["Mt. Kalugong", "Ziplining", "Horseback Riding at Wright Park"],
  food: ["Food tours", "Cafes", "Restaurants"]
};

// Endpoint to GI
app.post('/generate-itinerary', (req, res) => {
  const { budget, duration, interests } = req.body;

 
  let itinerary = [];

  if (interests.includes("Nature Lover")) {
    itinerary = [...itinerary, ...destinations.nature];
  }
  if (interests.includes("Culture Enthusiast")) {
    itinerary = [...itinerary, ...destinations.cultural];
  }
  if (interests.includes("Adventure Seeker")) {
    itinerary = [...itinerary, ...destinations.adventure];
  }
  if (interests.includes("Foodie")) {
    itinerary = [...itinerary, ...destinations.food];
  }

  let message = '';
  if (budget === 'Budget Traveler: PHP 500-1,500/day') {
    message = 'You’re traveling on a budget! Focus on affordable options.';
  } else if (budget === 'Mid-range Traveler: PHP 1,500-4,000/day') {
    message = 'A little more flexibility in your budget—enjoy a mix of activities.';
  } else {
    message = 'Luxury trip ahead! You can explore more premium experiences.';
  }

  res.json({
    message: message,
    itinerary: itinerary,
    budget: budget,
    duration: duration
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
