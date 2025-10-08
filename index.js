let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let currentTimer = null;
let myInterval = null;

function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
}

showDefaultTimer();

function hideAll() {
    let timers = document.querySelectorAll(".timer-display");
    timers.forEach(timer => timer.style.display = "none");
}

document.getElementById("pomodoroSession").addEventListener("click", function () {
    hideAll();
    pomodoro.style.display = "block"
    currentTimer = pomodoro
});

document.getElementById("shortBreak").addEventListener("click", function () {
    hideAll();
    short.style.display = "block";
    currentTimer = short
});

document.getElementById("longBreak").addEventListener("click", function () {
    hideAll();
    long.style.display = "block";
    currentTimer = long
})

function startTimer(timerdisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }
    let timerDuration = timerdisplay.getAttribute("data-duration").split(":")[0];
    console.log(timerDuration);
    let durationInMilimiters = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationInMilimiters;
    myInterval = setInterval(function() {
        const timeRemaining = new Date(endTimestamp - Date.now());
        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerdisplay.textContent = "00:00";
        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            console.log(formattedTime);
            timerdisplay.textContent = formattedTime;
        }
    }, 1000);
}

document.getElementById("start").addEventListener("click", function () {
    if (currentTimer){
        startTimer(currentTimer);
    }
});