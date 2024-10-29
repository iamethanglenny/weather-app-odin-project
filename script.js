function getUserInput() {
    const inputValue = document.getElementById("userInput").value;
    return inputValue;
}













async function getWeather(searchQuery) {
    const apiKey = 'KSWVD4E7GXMRRMVALYNN4YP4C';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const actualData = await response.json();
        console.log(actualData);
        return actualData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } 
}