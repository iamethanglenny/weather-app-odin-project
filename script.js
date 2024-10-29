function getUserInput() {
    const inputValue = document.getElementById("userInput").value;
    return inputValue;
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const userInput = getUserInput();
    fetchWeatherData(userInput);
    document.getElementById("userInput").value = "";
});

document.getElementById("userInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const userInput = getUserInput();
        fetchWeatherData(userInput);
        document.getElementById("userInput").value = "";
    }
});

async function fetchWeatherData(location) {
    const apiKey = 'KSWVD4E7GXMRRMVALYNN4YP4C';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const actualData = await response.json();
        console.log("Raw Data: ", actualData);

        const weatherInfo = {
            temperature: actualData.currentConditions.temp,
            conditions: actualData.currentConditions.conditions,
            feelslike: actualData.currentConditions.feelslike,
            description: actualData.description,
            location: actualData.address
        };

        console.log("Processed Weather Data:", weatherInfo);
        
        renderWeatherData(weatherInfo);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    } 
}

function renderWeatherData(weatherInfo) {
    const contentDiv = document.querySelector(".content");
    contentDiv.innerHTML = ''; // Clear previous results

    // Create elements to display weather data with bold labels
    const locationElement = document.createElement("h2");
    locationElement.innerText = `Weather in ${weatherInfo.location}`;
    
    const temperatureElement = document.createElement("p");
    temperatureElement.innerHTML = `<strong>Temperature:</strong> ${weatherInfo.temperature} °C`;
    
    const conditionsElement = document.createElement("p");
    conditionsElement.innerHTML = `<strong>Conditions:</strong> ${weatherInfo.conditions}`;
    
    const feelsLikeElement = document.createElement("p");
    feelsLikeElement.innerHTML = `<strong>Feels Like:</strong> ${weatherInfo.feelslike} °C`;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = `<strong>Description:</strong> ${weatherInfo.description}`;

    // Append all elements to the content div
    contentDiv.appendChild(locationElement);
    contentDiv.appendChild(temperatureElement);
    contentDiv.appendChild(conditionsElement);
    contentDiv.appendChild(feelsLikeElement);
    contentDiv.appendChild(descriptionElement);
}


fetchWeatherData("London");