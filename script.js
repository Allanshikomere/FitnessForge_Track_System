document.addEventListener('DOMContentLoaded', function () {
    const weightInput = document.getElementById('userWeight');
    const suggestBtn = document.getElementById('suggestWorkoutBtn');
    const suggestionOutput = document.getElementById('workoutSuggestion');
    const logWorkoutButton = document.getElementById('logWorkoutButton');
    const customizeWorkoutButton = document.getElementById('customizeWorkoutButton');
    const workoutLogDiv = document.getElementById('workoutLog');
    const customizeWorkoutDiv = document.getElementById('customizeWorkout');

    // Fetch initial data for the user's profile, achievements, etc.
    fetchUserProfile();
    fetchAchievements();
    // ... Other initializations

    // Add event listeners for user interactions
    suggestBtn.addEventListener('click', suggestWorkout);
    logWorkoutButton.addEventListener('click', logWorkout);
    customizeWorkoutButton.addEventListener('click', customizeWorkout);

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
            workoutSuggestion = 'Focus on strength training exercises like weightlifting and high-intensity interval training (HIIT).';
        }

        // Display the suggestion
        suggestionOutput.textContent = `Recommended Workout Plan: ${workoutSuggestion}`;
    }
    console.log(suggestWorkout);
    
    // Assuming this function is part of your script
    function generateWorkoutBasedOnWeight(userWeight) {
        let workoutSuggestion = '';
    
        if (userWeight <= 50) {
            workoutSuggestion = 'Try light cardio exercises like brisk walking and stretching.';
        } else if (userWeight <= 75) {
            workoutSuggestion = 'Consider a mix of cardio and strength training, such as jogging and bodyweight exercises.';
        } else {
            workoutSuggestion = 'Focus on strength training exercises like weightlifting and high-intensity interval training (HIIT).';
        }
    
        return workoutSuggestion;
    }


    async function generateWorkoutPlan(userWeight) {
        // const exerciseDBApiKey = 'your_exercisedb_api_key'; 
        // const exerciseDBApiUrl = `https://exercisedb.p.rapidapi.com/exercises/exercise/${userWeight}`;

        try {
            const response = await axios.get(exerciseDBApiUrl, {
                headers: {
                    'X-RapidAPI-Key': exerciseDBApiKey,
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            });

            const suggestedExercise = response.data.name;
            const suggestedIntensity = response.data.intensity;

            return `Try ${suggestedExercise} with an intensity level of ${suggestedIntensity}.`;
        } catch (error) {
            console.error('Error fetching workout suggestion:', error);
            return 'Unable to fetch workout suggestion at the moment.';
        }
    }

    async function fetchUserProfile() {
        // Simulate fetching user profile data
        const userProfile = await fetchUserData(); // Assuming you have a function to fetch user data
        displayUserProfile(userProfile);
    }

    async function fetchAchievements() {
        // Simulate fetching user achievements data
        const achievements = await fetchAchievementsData(); // Assuming you have a function to fetch achievements
        displayAchievements(achievements);
    }

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
        // Implement workout customization logic
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

    // function generateCustomizedWorkout() {
    //     // Here I Will Get user preferences from the form
    //     const exerciseType = document.getElementById('exerciseType').value;
    //     const intensity = document.getElementById('intensity').value;

    //     // Plan how will I gustomized work plan for the user basing on the provided preferences
    //     const customizedWorkoutPlan = generateWorkoutBasedOnPreferences(exerciseType, intensity);

    //     // How to manipilate the  DOM to display the customized workout plan
    //     const customizedWorkoutPlanDiv = document.getElementById('customizedWorkoutPlan');
    //     customizedWorkoutPlanDiv.innerHTML = `<h4>Your Customized Workout Plan:</h4>
    //                                         <p>${customizedWorkoutPlan}</p>`;
    // }

    //Function for generating workout based preferences based on the user
    function generateWorkoutBasedOnPreferences(exerciseType, intensity) {
        return `For optimal results, focus on ${exerciseType} exercises with an intensity level of ${intensity}.`;
    }
    async function fetchUserProfile() {
        try {
            const userProfile = await fetchUserData();
            displayUserProfile(userProfile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
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

    function displayUserProfile(userProfile) {
        const userProfileDiv = document.getElementById('userProfile');
        userProfileDiv.innerHTML = `<p>Username: ${userProfile.username}</p>
                                  <p>Email: ${userProfile.email}</p>
                                  <p>Weight: ${userProfile.weight} kg</p>
                                  <p>Height: ${userProfile.height} cm</p>
                                  <p>Age: ${userProfile.age} years</p>`;
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
