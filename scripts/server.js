const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

async function generateRecommendations(budget, stay, interests) {
    const prompt = `Given the following details, provide a list of recommendations for activities, food, and places to visit:\n\nBudget: ${budget}\nStay: ${stay}\nInterests: ${interests}\n\nProvide 3 options with a brief description for each.`;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003", 
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7, 
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const recommendations = response.data.choices[0].text.trim();
        return recommendations;
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return "Sorry, something went wrong. Please try again later.";
    }
}

app.post("/generate", async (req, res) => {
    const { budget, stay, interests } = req.body;

    if (!budget || !stay || !interests) {
        return res.status(400).send("All fields (budget, stay, interests) are required.");
    }

    const recommendations = await generateRecommendations(budget, stay, interests);
    res.json({ recommendations });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
