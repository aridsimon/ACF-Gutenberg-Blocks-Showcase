export const Weather = (function () {
    'use strict';

    function init() {
        const weatherContainer = document.getElementById('weather-box');

        // Get the location coordinates and location name from data attributes
        const locationCoordinates = weatherContainer.getAttribute('data-location-coordinates');
        const locationName = weatherContainer.getAttribute('data-location-name');
        const showDays = Math.min(3, weatherContainer.getAttribute('data-show-days') || 1); // Limit to 3 days max

        // Ensure weather container and location are valid
        if (!weatherContainer || !locationCoordinates || !locationName) return;

        const apiKey = 'YOUR_API_KEY'; // Replace with your WeatherAPI.com API key
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationCoordinates}&days=${showDays}&hour=1`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                return response.json();
            })
            .then(data => {
                const forecastDays = data.forecast.forecastday; // Array of forecast days
                console.log('Forecast Days:', forecastDays); // Debug the API response to ensure multiple days are returned

                // Clear the container
                weatherContainer.innerHTML = '';

                if (showDays === 1) {
                    // One day forecast: Display in the original format
                    const tempFahrenheit = Math.round(forecastDays[0].day.avgtemp_f); // Average temperature in Fahrenheit
                    const rainChance = forecastDays[0].day.daily_chance_of_rain; // Rain chance percentage
                    const weatherIcon = forecastDays[0].day.condition.icon; // Weather icon

                    weatherContainer.innerHTML = `
                        <div class="weather-day">
                            <div class="weather-icon"><img src="${weatherIcon}" alt="Weather Icon"></div>
                            <p class="temperature">It's ${tempFahrenheit}°F At ${locationName} With A ${rainChance}% Chance of Rain</p>
                        </div>
                    `;
                } else {
                    // Two or three day forecast: Display in the new format
                    forecastDays.forEach((day, index) => {
                        if (index < showDays) {
                            const tempFahrenheit = Math.round(day.day.avgtemp_f); // Average temperature in Fahrenheit
                            const rainChance = day.day.daily_chance_of_rain; // Rain chance percentage
                            const weatherIcon = day.day.condition.icon; // Weather icon
                            const date = new Date(day.date).toLocaleDateString(); // Format date

                            console.log(`Day ${index + 1} - Temp: ${tempFahrenheit}, Rain: ${rainChance}`); // Log each day's data

                            // Create the weather block dynamically for each day
                            const weatherBlock = `
                                <div class="weather-day">
                                    <div class="weather-date">${date}</div>
                                    <div class="weather-icon"><img src="${weatherIcon}" alt="Weather Icon"></div>
                                    <p class="temperature">${tempFahrenheit}°F / Precipitation: ${rainChance}%</p>
                                </div>
                            `;

                            weatherContainer.innerHTML += weatherBlock;
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                weatherContainer.innerHTML = '<p>Weather data not available</p>';
            });
    }

    return {
        init: init,
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    Weather.init();
});