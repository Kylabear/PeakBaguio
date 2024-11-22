document.addEventListener('DOMContentLoaded', () => {
    const itineraryForm = document.getElementById('itinerary-form');
    itineraryForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

     
        const budget = document.getElementById('budget').value;
        const duration = document.getElementById('duration').value;
        const interests = Array.from(document.getElementById('interests').selectedOptions).map(option => option.value);
        console.log({ budget, duration, interests });
        
        try {
            const response = await fetch('http://localhost:3000/generateitinerary.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    budget,
                    duration,
                    interests
                })
            });

            const data = await response.json();

            if (data.itinerary) {
            
                const resultSection = document.getElementById('itinerary-result');
                resultSection.classList.remove('hidden');
                const resultMessage = document.getElementById('result-message');
                resultMessage.innerText = 'Here is your personalized itinerary:';
                const itineraryList = document.getElementById('itinerary-list');
                itineraryList.innerHTML = ''; 
                const itineraryItems = data.itinerary.split('\n');
                itineraryItems.forEach(item => {
                    if (item.trim()) {
                        const listItem = document.createElement('li');
                        listItem.innerText = item.trim();
                        itineraryList.appendChild(listItem);
                    }
                });
            } else {
                alert('Unable to generate an itinerary. Please try again.');
            }
        } catch (error) {
            console.error('Error communicating with the backend:', error);
            alert('An error occurred while generating the itinerary. Please try again.');
        }
    });
});
