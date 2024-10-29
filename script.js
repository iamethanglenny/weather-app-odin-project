function getUserInput() {
    const inputValue = document.getElementById("userInput").value;
    return inputValue;
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const userInput = getUserInput();
    fetchWeatherData(userInput);
});

document.getElementById("userinput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const userInput = getUserInput();
        fetchWeatherData(userInput);
    }
});



const temperatureHeading = document.createElement("h1");











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
        return weatherInfo;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    } 
}

fetchWeatherData("London");