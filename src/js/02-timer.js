import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let startTimer = null;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button');

btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startTimer = selectedDates[0].getTime() - options.defaultDate.getTime();
      btnEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return addStartZero({ days, hours, minutes, seconds });
}

function addStartZero(value) {
  const timerParam = Object.values(value);
  const timerParamToString = timerParam.map(timerParam =>
    timerParam.toString().padStart(2, '0')
  );
  daysEl.innerHTML = timerParamToString[0];
  hoursEl.innerHTML = timerParamToString[1];
  minutesEl.innerHTML = timerParamToString[2];
  secondsEl.innerHTML = timerParamToString[3];
}

btnEl.addEventListener('click', timerCounting);

function timerCounting(event) {
  btnEl.disabled = true;
  inputEl.disabled = true;
  const timerId = setInterval(() => {
    startTimer = startTimer - 1000;
    convertMs(startTimer);
    if (startTimer <= 0) {
      clearInterval(timerId);
      btnEl.disabled = false;
      inputEl.disabled = false;
      Notiflix.Notify.failure('Time is out!');
      return;
    }
  }, 1000);
}
