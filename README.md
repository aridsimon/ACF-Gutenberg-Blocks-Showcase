## Countdown Timer Block

### Overview

The **Countdown Timer** block allows users to set a target date and display a countdown on their page. It dynamically updates in real time, displaying the number of days, hours, minutes, and seconds remaining until the target date is reached. Once the countdown expires, a custom message (“EXPIRED”) is displayed.

### Features

	• Set a target date via an **ACF field**.
	• Automatically updates every second to reflect the remaining time.
	• Dynamically generates **HTML** for the countdown based on the target date.
	• Can be reused multiple times on a single page, each with its own countdown target.
	• Smooth **SCSS** styling for the countdown display.

### How to Use

	1. ACF Setup:
		• Add a new Date Picker field to your ACF field group and assign it to your countdown block.
		• Ensure the date format is compatible with JavaScript’s Date() function.
	2. HTML Structure:
		• Each countdown block must have a container with the class countdown-timer.
		• The data-countdown-timer-date attribute should contain the target date for the countdown.
	3. CSS Styling:
		• The block uses SCSS for styling. Ensure your build process compiles countdown-timer.scss into your final CSS file.
	4. JS Setup:
		• The countdown functionality is managed by Countdown-Timer.js. This script should be included in your build process.
		• The script automatically detects all countdown blocks on the page and starts the countdown for each one.

## Example Usage

### ACF Date Field Setup:

    $target_date = get_field('countdown_timer_date');

### HTML Structure Example:
	
	<div class="countdown-timer" data-countdown-timer-date="<?php echo esc_attr($target_date); ?>">
	    <div id="countdown-block"></div>
	</div>

### SCSS Example:

    #countdown-block {
        display: flex;
        justify-content: center;
        gap: 20px;
        @include fluid($m, $xxl, 0px, 25px, 'margin-left');
        .countdown-item {
            text-align: center;
            display: grid;
        }
    
        .number {
            font-size: 32px;
            color: #000;
            line-height: 1;
        }
    
        .label {
            font-size: 13px;
            font-family: Arial, Helvetica, sans-serif;
            color: #2b2b2b;
        }
    }
    
### JavaScript:
The Countdown-Timer.js handles all the dynamic countdown functionality

	document.addEventListener('DOMContentLoaded', function() {
	    Countdown.init();
	});

### Installation Instructions

	1.	Clone or download the repository.
	2.	Add the countdown block folder to your theme’s block structure.
	3.	Ensure the ACF fields are correctly set up, particularly the date field.
	4.	Include the countdown SCSS and JS files in your build pipeline.
	5.	Add the countdown timer block to your pages via Gutenberg or programmatically through PHP.

### Compatibility

	• WordPress version: 5.0+
	• ACF Pro version: 5.8+
	• JavaScript: Vanilla JS (No dependencies)
	• CSS Preprocessor: SCSS

### Notes

	• This block is fully responsive and customizable. Ensure that the SCSS file is included in your build process for styling.
	• If you want to display multiple countdown timers on the same page, simply add additional countdown blocks, and each will function independently.


## Weather Block

### Description

The Weather Block is a customizable WordPress block built using ACF (Advanced Custom Fields) that allows users to display real-time weather data from WeatherAPI.com for a specific location. The block can show up to 3 days of forecast information, including temperature, precipitation chance, and weather icons.

### Features

	• Displays weather information for up to 3 days.
	• Allows the user to input location coordinates via ACF fields.
	• Auto-updates hourly with fresh data.
	• Supports daily forecast including temperature, weather icons, and chance of precipitation.
	• Option to display 1, 2, or 3 days of forecast.
	• Responsive design using flexbox, ensuring a clean look across devices.
	• Simple fallback text when weather data is unavailable.

### ACF Fields

	1. Location Coordinates (Text Field)
		• Example: 40.8584,-73.8929 (Coordinates for Bronx, NY). Good site for use https://www.gps-coordinates.net/ 
	2. Location Name (Text Field)
		• Example: New York Botanical Garden
	3. Show Days (Select Field)
		• Options: 1 Day, 2 Days, 3 Days (Controls how many days of forecast will be displayed)

### Default Styling

	• Utilizes Flexbox for clean horizontal or vertical alignment based on space.
	• Custom CSS to ensure the weather block is responsive and fits in seamlessly with the rest of the site.

	.adswcblock--weather {
		.container {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap; /* Allows wrapping if screen is too narrow */
			gap: 2rem; /* Space between each weather block */
		
			#weather-box {
				display: flex;
				-webkit-box-orient: horizontal;
				-webkit-box-direction: normal;
				-ms-flex-flow: row wrap;
				flex-flow: row wrap;
				-webkit-box-pack: justify;
				-ms-flex-pack: justify;
				justify-content: space-between;

			&.weather-days-1 > div {
				flex-basis: calc(100% - (10px));
			}

			&.weather-days-2 > div {
				flex-basis: calc(50% - (10px));
			}

			&.weather-days-3 > div {
				flex-basis: calc(33.33% - (10px));
				@include bpmax($m) {
					flex-basis: calc(50% - (10px));
				}
			}
			.weather-day {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 1rem;
				text-align: center;
				
					.weather-date {
						font-size: 1.2rem;
						font-weight: bold;
						margin-bottom: 0.5rem;
					}
			
					.weather-icon img {
						width: 50px;
						height: 50px;
						margin-bottom: 0.5rem;
					}
			
					.temperature {
						font-size: 1rem;
						font-weight: 500;
						color: #333;
					}
				}
			}
		}
	}

### How to Use

	1. Install and activate the Weather Block in your WordPress theme.
	2. Set up the ACF fields for location coordinates, location name, and days to display.
	3. Add the Weather Block in the Gutenberg editor, and it will automatically fetch and display the weather data.
	4. The weather data updates hourly, so no manual refresh is required.

### API Integration

This block uses the WeatherAPI.com free tier to fetch weather data. By default, it supports up to 3-day forecasts. You can replace the API key in the JavaScript file if needed.

### API Call Example:
	const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationCoordinates}&days=${showDays}`;

### Error Handling

	• If weather data is unavailable, a fallback message is displayed: "Weather data not available".

## Customization

You can easily customize the weather display text, layout, and design by editing the SCSS and PHP files. You can also update the forecast days and change the location coordinates via the ACF fields.

### Example Display

For a location like Orlando, FL:	

	<div class="weather-day">
		<div class="weather-date">10/10/2024</div>
		<div class="weather-icon"><img src="..." alt="Sunny"></div>
		<p class="temperature">73°F / Precipitation: 0%</p>
	</div>

### Notes

	• Important: The block uses WeatherAPI.com, and the free tier allows a maximum of 3-day forecasts. If you’d like to use more days or additional features, consider upgrading your WeatherAPI plan.
	• You can modify the forecast days and weather information format in the JavaScript file and the ACF settings.	