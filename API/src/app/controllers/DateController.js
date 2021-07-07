const DAY = 0;
const MONTH = 1;
const YEAR = 2;

function addZero(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

class DateController {
  subtractDate(date, amount) {
    let dateOffset = 24 * 60 * 60 * 1000 * (amount - 1);
    let splitDate = date.split("_");
    let dateObject = new Date(
      `${splitDate[YEAR]}-${splitDate[MONTH]}-${splitDate[DAY]}`
    );
    let timestamp = dateObject.getTime();
    let subtractedTimestamp = timestamp - dateOffset;
    let subtractedDate = new Date(subtractedTimestamp);
    let newDateString = `${addZero(subtractedDate.getDate())}_${addZero(
      subtractedDate.getMonth() + 1
    )}_${subtractedDate.getFullYear()}`;
    return newDateString;
  }
}

export default new DateController();
