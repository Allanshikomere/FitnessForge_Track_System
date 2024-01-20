document.addEventListener('DOMContentLoaded', function () {
    const weightInput = document.getElementById('userWeight');
    const suggestBtn = document.getElementById('suggestWorkoutBtn');
    const suggestionOutput = document.getElementById('workoutSuggestion');
    const logWorkoutButton = document.getElementById('logWorkoutButton');
    const customizeWorkoutButton = document.getElementById('customizeWorkoutButton');
    const workoutLogDiv = document.getElementById('workoutLog');
    const customizeWorkoutDiv = document.getElementById('customizeWorkout');

    // Add event listeners for user interactions
    suggestBtn.addEventListener('click', suggestWorkout);
    logWorkoutButton.addEventListener('click', logWorkout);
    customizeWorkoutButton.addEventListener('click', customizeWorkout);
    getWeatherAndDisplay();

    async function getWeatherAndDisplay() {
        const city = 'Nairobi'; // Replace with the desired city
        const weatherData = await getWeather(city);

        if (weatherData) {
            displayWeather(weatherData);
        } else {
            console.error('Failed to fetch weather data.');
        }
    }

    async function getWeather(city) {
        const apiKey = '6410f140e53da5bc4481fe738a152f52';           
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                console.log('Weather Data:', data);
                return data;
            } else {
                console.error('Error:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }

    function displayWeather(weatherData) {
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        suggestionOutput.textContent = `Current Weather: ${temperature}°C, ${description}`;
    }

    function suggestWorkout() {
        const userWeight = parseFloat(weightInput.value);

        if (isNaN(userWeight) || userWeight <= 0) {
            suggestionOutput.textContent = 'Please enter a valid weight.';
            return;
        }

        // Generate workout suggestion based on weight using custom logic
        let workoutSuggestion;

        if (userWeight <= 50) {
            workoutSuggestion = 'Try light cardio exercises like brisk walking and stretching.';
        } else if (userWeight <= 75) {
            workoutSuggestion = 'Consider a mix of cardio and strength training, such as jogging and bodyweight exercises.';
        } else {
            workoutSuggestion = 'Focus on strength training exercises like weightlifting and high-intensity interval training.';
        }

        // Display the suggestion
        suggestionOutput.textContent = `Recommended Workout Plan: ${workoutSuggestion}`;
    }

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = timeString;
    }

    // Update the clock every second
    setInterval(updateClock, 1000);

    // Initial call to set the clock immediately
    updateClock();
    

    function logWorkout() {
        const workoutData = {
            date: new Date().toISOString(),
            exercise: 'Running',
            duration: 30,
            caloriesBurned: 300,
        };
        storeWorkoutData(workoutData);

        // Display the logged workout
        displayLoggedWorkout(workoutData);
    }


    function customizeWorkout() {
        // workout customization logic
        customizeWorkoutDiv.innerHTML = `
            <h3>Customize Your Workout</h3>
            <form id="workoutCustomizationForm">
                <label for="exerciseType">Select Exercise Type:</label>
                <select id="exerciseType" name="exerciseType">
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                    <option value="flexibility">Flexibility</option>
                </select>

                <label for="intensity">Select Intensity:</label>
                <input type="range" id="intensity" name="intensity" min="1" max="10" value="5">

                <button type="button" onclick="generateCustomizedWorkout()">Generate Workout Plan</button>
            </form>
            <div id="customizedWorkoutPlan"></div>
        `;            
    }

    async function fetchAchievementsData() {
        return [
            { name: 'Achievement 1', description: 'Completed 10 workouts' },
            { name: 'Achievement 2', description: 'Reached fitness milestone' },
        ];
    }

    function storeWorkoutData(workoutData) {
        const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
        storedWorkouts.push(workoutData);
        localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
    }
    function logAchievements(achievements) {
    console.log('Logged Achievements:');
    achievements.forEach((achievement, index) => {
        console.log(`#${index + 1}: ${achievement.name} - ${achievement.description}`);
    });
}

    function displayLoggedWorkout(workoutData) {
        const workoutLogDiv = document.getElementById('workoutLog');
        workoutLogDiv.innerHTML = `<div class="logged-workout">
                                <h4>Logged Workout:</h4>
                                <p>Date: ${new Date(workoutData.date).toLocaleDateString()}</p>
                                <p>Exercise: ${workoutData.exercise}</p>
                                <p>Duration: ${workoutData.duration} minutes</p>
                                <p>Calories Burned: ${workoutData.caloriesBurned} kcal</p>
                                </div>`;
    }
});
