function withZero(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

export default function log(msg) {
  let now = new Date();
  console.log(
    `[${withZero(now.getDate())}/${withZero(now.getMonth() + 1)} ${withZero(
      now.getHours()
    )}:${withZero(now.getMinutes())}] ${msg}`
  );
}
