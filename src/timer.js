const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
function timerFunction() {
    document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();
}




function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


// // Start with an initial value of 20 seconds
// const TIME_LIMIT = 120

// // Initially, no time has passed, but this will count up
// // and subtract from the TIME_LIMIT
// let timePassed = 0
// let timeLeft = TIME_LIMIT;

// let timerInterval = null;
// const COLOR_CODES = {
//     info: {
//       color: "green"
//     }
//   }
  
// let remainingPathColor = COLOR_CODES.info.color;



// function startTimer() {
    
//     timerInterval = setInterval(() => {
      
//       // The amount of time passed increments by one
//       timePassed = timePassed += 1;
//       timeLeft = TIME_LIMIT - timePassed;
      
//       // The time left label is updated
//       document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
//       setCircleDasharray()
//     }, 1000);
//   }








// function formatTime(time) {
//     // The largest round integer less than or equal to the result of time divided being by 60.
//     const minutes = Math.floor(time / 60);
    
//     // Seconds are the remainder of the time divided by 60 (modulus operator)
//     let seconds = time % 60;
    
//     // If the value of seconds is less than 10, then display seconds with a leading zero
//     if (seconds < 10) {
//       seconds = `0${seconds}`;
//     }
  
//     // The output in MM:SS format
//     return `${minutes}:${seconds}`;
//   }



//   function calculateTimeFraction() {
//     return timeLeft / TIME_LIMIT;
//   }
      
//   // Update the dasharray value as time passes, starting with 283
//   function setCircleDasharray() {
//     const circleDasharray = `${(
//       calculateTimeFraction() * FULL_DASH_ARRAY
//     ).toFixed(0)} 283`;
//     document
//       .getElementById("base-timer-path-remaining")
//       .setAttribute("stroke-dasharray", circleDasharray);
//   }














// function timerFunction() {
//     document.getElementById("app").innerHTML = `...`

//     document.getElementById("app").innerHTML = `
// <div class="base-timer">
//   <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//     <g class="base-timer__circle">
//       <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
//       <path
//       id="base-timer-path-remaining"
//       stroke-dasharray="283"
//       class="base-timer__path-remaining ${remainingPathColor}"
//       d="
//         M 50, 50
//         m -45, 0
//         a 45,45 0 1,0 90,0
//         a 45,45 0 1,0 -90,0
//       "
//     ></path>
    
//     </g>
//   </svg>
//   <span id="base-timer-label" class="base-timer__label">
//     <!-- Remaining time label -->
//     ${formatTime(timeLeft)}
//   </span>
// </div>
// `
// startTimer()

// }


