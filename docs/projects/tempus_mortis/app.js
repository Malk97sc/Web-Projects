const hour = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    hour.textContent = hours;
    minutes.textContent = minute;
    seconds.textContent = second;
}

updateClock();
setInterval(updateClock, 1000);