const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

const clearInput = (inputValue) => {
  return inputValue.replace(/\D/g, "");
};

const formatTimer = (seconds) => {
  const date = new Date(1970, 0, 1);
  date.setSeconds(seconds);

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const secs =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${hours}:${minutes}:${secs}`;
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timerId;

  return (seconds) => {
    let currentSeconds = seconds;

    clearInterval(timerId);
    timerEl.textContent = formatTimer(currentSeconds);

    timerId = setInterval(() => {
      currentSeconds--;
      formatTimer(currentSeconds);

      if (currentSeconds >= 0) {
        timerEl.textContent = formatTimer(currentSeconds);
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (event) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  let target = event.target;

  target.value = clearInput(target.value);
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
