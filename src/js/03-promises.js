import Notiflix from 'notiflix';
const delayInput = document.querySelector('.form');
const promiseButton = document.querySelector('button');
const obj = {};

delayInput.addEventListener('input', inputObj);
function inputObj(event) {
  obj[event.target.name] = event.target.value;
}
promiseButton.addEventListener('click', formHandler);

function formHandler(event) {
  event.preventDefault();
  for (let i = 1; i <= obj.amount; i++) {
    if (i <= obj.amount) {
      createPromise(i, Number(obj.delay), Number(obj.step))
        .then(({ position, delay, step }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${
              delay + (position - 1) * step
            }ms`
          );
        })
        .catch(({ position, delay, step }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${
              delay + (position - 1) * step
            }ms`
          );
        });
    }
  }
}
function createPromise(position, delay, step) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay, step });
      }
      reject({ position, delay, step });
    }, delay + (position - 1) * step);
  });
}
