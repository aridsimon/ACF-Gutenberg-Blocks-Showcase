Countdown Timer Block

Overview

The Countdown Timer block allows users to set a target date and display a countdown on their page. It dynamically updates in real time, displaying the number of days, hours, minutes, and seconds remaining until the target date is reached. Once the countdown expires, a custom message (“EXPIRED”) is displayed.

Features

	•	Set a target date via an ACF field.
	•	Automatically updates every second to reflect the remaining time.
	•	Dynamically generates HTML for the countdown based on the target date.
	•	Can be reused multiple times on a single page, each with its own countdown target.
	•	Smooth CSS styling for the countdown display.

How to Use

	1.	ACF Setup:
	•	Add a new Date Picker field to your ACF field group and assign it to your countdown block.
	•	Ensure the date format is compatible with JavaScript’s Date() function.
	2.	HTML Structure:
	•	Each countdown block must have a container with the class countdown-timer.
	•	The data-countdown-timer-date attribute should contain the target date for the countdown.
	3.	CSS Styling:
	•	The block uses SCSS for styling. Ensure your build process compiles countdown-timer.scss into your final CSS file.
	4.	JS Setup:
	•	The countdown functionality is managed by Countdown-Timer.js. This script should be included in your build process.
	•	The script automatically detects all countdown blocks on the page and starts the countdown for each one.

Example Usage

ACF Date Field Setup:
    $target_date = get_field('countdown_timer_date');

HTML Structure Example:
<div class="countdown-timer" data-countdown-timer-date="<?php echo esc_attr($target_date); ?>">
    <div id="countdown-block"></div>
</div>

SCSS Example:
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
    
JavaScript:
The Countdown-Timer.js handles all the dynamic countdown functionality

document.addEventListener('DOMContentLoaded', function() {
    Countdown.init();
});

Installation Instructions

	1.	Clone or download the repository.
	2.	Add the countdown block folder to your theme’s block structure.
	3.	Ensure the ACF fields are correctly set up, particularly the date field.
	4.	Include the countdown SCSS and JS files in your build pipeline.
	5.	Add the countdown timer block to your pages via Gutenberg or programmatically through PHP.

Compatibility

	•	WordPress version: 5.0+
	•	ACF Pro version: 5.8+
	•	JavaScript: Vanilla JS (No dependencies)
	•	CSS Preprocessor: SCSS

Notes

	•	This block is fully responsive and customizable. Ensure that the SCSS file is included in your build process for styling.
	•	If you want to display multiple countdown timers on the same page, simply add additional countdown blocks, and each will function independently.