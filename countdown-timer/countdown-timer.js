export const Countdown = (function () {
    'use strict';

    function init() {
        events();
    }

    function events() {
        const countdownBlocks = document.querySelectorAll('.countdown-timer');

        countdownBlocks.forEach((block, index) => {
            const targetDateStr = block.getAttribute('data-countdown-timer-date');

            if (!targetDateStr || isNaN(new Date(targetDateStr).getTime())) {
                console.error('Invalid or missing target date for countdown.');
                return;
            }

            const targetDate = new Date(targetDateStr).getTime();
            const countdownContainer = block.querySelector('#countdown-block');

            if (!countdownContainer) {
                console.error('Countdown container missing.');
                return;
            }

            const timeUnits = [
                { id: 'days', label: 'Days' },
                { id: 'hours', label: 'Hours' },
                { id: 'minutes', label: 'Minutes' },
                { id: 'seconds', label: 'Seconds' }
            ];

            // Generate a unique identifier for this countdown
            const uniqueId = 'countdown-' + index;

            // Generating countdown items dynamically with unique IDs per block
            timeUnits.forEach(unit => {
                const countdownItem = document.createElement('div');
                countdownItem.classList.add('countdown-item');
                countdownItem.innerHTML = `
                    <div class="number" id="${uniqueId}-${unit.id}">0</div>
                    <div class="label">${unit.label}</div>
                `;
                countdownContainer.appendChild(countdownItem);
            });

            // Function to update the countdown
            function updateCountdown() {
                const now = new Date().getTime();
                const timeDifference = targetDate - now;

                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                countdownContainer.querySelector(`#${uniqueId}-days`).innerHTML = days;
                countdownContainer.querySelector(`#${uniqueId}-hours`).innerHTML = hours;
                countdownContainer.querySelector(`#${uniqueId}-minutes`).innerHTML = minutes;
                countdownContainer.querySelector(`#${uniqueId}-seconds`).innerHTML = seconds;

                if (timeDifference < 0) {
                    clearInterval(countdownInterval);
                    countdownContainer.innerHTML = "EXPIRED";
                }
            }

            // Run the countdown immediately on page load
            updateCountdown();

            // Then run the countdown every second
            const countdownInterval = setInterval(updateCountdown, 1000);
        });
    }

    return {
        init: init
    };
})();

// Initialize the countdown when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    Countdown.init();
});