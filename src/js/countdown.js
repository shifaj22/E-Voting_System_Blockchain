// let countdown;
// const timerDisplay = document.querySelector('.display__time-left');
// const endTime = document.querySelector('.display__end-time');
//
// function timer(seconds) {
//     //clear any existing timers
//     clearInterval(countdown);
//
//     const now = Date.now();
//     const then = now + seconds * 1000;
//     displayTimeLeft(seconds);
//
//     countdown = setInterval(() => {
//         const secondsLeft = Math.round((then - Date.now()) /1000);
//
//         //check if we should stop it
//         if (secondsLeft < 0) {
//             clearInterval(countdown);
//             return;
//         }
//
//
//         displayTimeLeft(secondsLeft);
//
//         displayEndTime(then);
//
//     }, 1000);
// }
//
// function displayTimeLeft(seconds) {
//     const minutes = Math.floor(seconds/60);
//     const remainderSeconds = seconds % 60;
//     const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
//     timerDisplay.textContent = display;
// }
//
// function displayEndTime(timestamp) {
//     const end = new Date(timestamp);
//     const hour = end.getHours();
//     const minutes = end.getMinutes()
//     endTime.textContent = `Election ends at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
// }
//
//
// document.customForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const mins = this.minutes.value;
//     timer(mins * 60);
//     console.log(mins);
//
//
// });
//
