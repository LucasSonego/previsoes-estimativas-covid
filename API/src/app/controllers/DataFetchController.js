import Cities from "../models/Cities";
import Reports from "../models/Reports";
import DateController from "./DateController";

const MAX_ATTEMPTS = 5;

async function fetchFromDate(city, date) {
  let found = false;
  let report = null;
  let reportDate = date;
  let attempts = 0;
  while (!found && attempts < MAX_ATTEMPTS) {
    report = await Reports.findOne({
      where: { dia: reportDate, municipio: city },
      attributes: ["casos", "obitos", "recuperados", "investigacao", "dia"],
    });

    if (report == null) {
      console.log(`${reportDate} not found`);
      reportDate = DateController.subtractDate(reportDate, 1);
      attempts++;
    } else {
      found = true;
      console.log(`found: ${reportDate}`);
    }
  }

  return { report, offsetDifference: attempts };
}

class DataFetchController {
  async fetchData(city, date, offset) {
    let cityData = await Cities.findOne({
      where: { nome: city },
      attributes: ["nome", "populacao"],
    });

    if (!cityData) {
      return false;
    }

    let { report: dateReport } = await fetchFromDate(city, date);
    let { report: offsetReport, offsetDifference } = await fetchFromDate(
      city,
      DateController.subtractDate(dateReport.dataValues.dia, offset)
    );

    return {
      cityData,
      dateReport,
      offsetReport,
      offset: offset + offsetDifference,
    };
  }
}

export default new DataFetchController();
