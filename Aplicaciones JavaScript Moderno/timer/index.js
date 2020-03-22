const durationInput = document.querySelector('#durationInput');
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let duration;

const timer = new Timer(durationInput,startButton,pauseButton,{
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick (timeRemaining) {
        circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining /duration - perimeter);
    },
    onComplete (){

    }
});
