// https://www.youtube.com/watch?v=Rib69h2DOxg

/* =================================== § TIME VARS === */
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

/* =================================== § PROJECT TIME VARS === */
const deadline = new Date('December 8, 2021 00:00:00');

/* =================================== § DOM === */
const countdownEl = document.getElementById('countdown');
const containerDaysEl = document.getElementById('containerDays');

/* =================================== § SUPPORT FUNCTIONS === */
// function changeAttribute(element, attribute, change) {
//   const selectedElements = element.querySelectorAll(`[${attribute}]`);
//   Array.from(selectedElements).forEach((el) => el.setAttribute(attribute, change));
// }

function changeAttribute(element, attribute, change) {
  const selectedElements = element.querySelectorAll(`[${attribute}]`);
  const movingPart = element.getElementsByClassName('countdown__fg-flips-container')[0];

  Array.from(selectedElements).forEach((el) => {
    if (el.getAttribute(attribute) !== addZero(change)) {
      movingPart.classList.add('flipped');
      setTimeout(() => {
        el.setAttribute(attribute, change);
      }, 300);
      setTimeout(() => { movingPart.classList.remove('flipped'); }, 300);
    }
  });
}

function addZero(n) {
  return n.toString().length === 1 ? `0${n}` : n.toString();
}

/* =================================== § COUNTDOWN FUNCTION === */
function countdown() {
  const now = new Date();
  const rawGap = deadline - now;

  /* ····················· § CURRENT ··· */
  const gapDays = Math.floor(rawGap / day);
  const gapHours = Math.floor((rawGap % day) / hour);
  const gapMinutes = Math.floor((rawGap % hour) / minute);
  const gapSeconds = Math.floor((rawGap % minute) / second);

  /* ····················· § NEXT ··· */
  const gapDaysNext = Math.floor((rawGap - day) / day);
  const gapHoursNext = Math.floor(((rawGap - hour) % day) / (hour));
  const gapMinutesNext = Math.floor(((rawGap - minute) % hour) / minute);
  const gapSecondsNext = Math.floor(((rawGap - second) % minute) / second);

  changeAttribute(containerDaysEl, 'data-current-day', addZero(gapSeconds));
  changeAttribute(containerDaysEl, 'data-next-day', addZero(gapSecondsNext));
}

countdown();

// setInterval(countdown, second);
