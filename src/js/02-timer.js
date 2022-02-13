import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    timer: document.querySelector('timer'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

refs.start.disabled = true;
refs.start.addEventListener('click', start);

let callbackTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            return Notify.failure('Please choose a date in the future');
        }
    
        refs.start.disabled = false;

        callbackTime = selectedDates[0].getTime();

        let deltaTime = callbackTime - Date.now();

        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        updateTimer({ days, hours, minutes, seconds });
    },
};

const calendar = flatpickr('#datetime-picker', options);

function start() {
  let deltaTime = 0;

  intervalId = setInterval(() => {
    deltaTime = callbackTime - Date.now();

    if (deltaTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      updateTimer({ days, hours, minutes, seconds });
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

