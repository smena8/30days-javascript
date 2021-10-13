
// creating a counter date
// since this is a concept, it will ensure my countdown timer is always running for display purposes
const todayDate = new Date();
const futureDate = todayDate.setMonth(todayDate.getMonth()+1);

// the magic part
const countdownDate = new Date(futureDate).getTime();

const inter = setInterval(timer, 1000);

function timer(){
  // today's date and time
  let currentTime = new Date().getTime();

  // find the difference between now and the count down date
  let timeDiff = countdownDate - currentTime;

  // time calculations for days, hours, minutes and seconds
  let millisecs = 1000;
  let secs = 60;
  let minutes = 60;
  let hours = 24;

  // divide timeDiff by milliseconds in a day
  let daysLeft = Math.floor(timeDiff / (millisecs * secs * minutes * hours));
  // divide (remaining hours in timeDiff) by milliseconds in an minute
  let hoursLeft = Math.floor((timeDiff % (millisecs * secs * minutes * hours)) / (millisecs * secs * minutes));
  // divide (remaining minutes in timeDiff) by milliseconds in a second
  let minutesLeft = Math.floor((timeDiff % (millisecs * secs * minutes)) / (millisecs * secs));
  // divide (remaining seconds in timeDiff) by milliseconds
  let secondsLeft = Math.floor((timeDiff % (millisecs * secs)) / millisecs);

  // change HTML
  document.querySelector("#day").innerHTML = `${daysLeft}`
  document.querySelector("#hour").innerHTML = `${hoursLeft}`
  document.querySelector("#min").innerHTML = `${minutesLeft}`
  document.querySelector("#sec").innerHTML = `${secondsLeft}`

  // if a date is set that will expire/end
  if (timeDiff <= 0) {
    clearInterval(inter);
    document.querySelector("timer").innerHTML = "EXPIRED";
  }
}