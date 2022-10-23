function minuteToMs(min) {
  return min * 60 * 1000;
}

function hourToMs(hour) {
  return hour * 60 * 60 * 1000;
}

function timeStamp(date) {
  return date ? new Date(date).getTime() : Date.now();
}

module.exports = { minuteToMs, hourToMs, timeStamp };
