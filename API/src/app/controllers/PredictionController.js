import DataFetchController from "./DataFetchController";
import SheetController from "./SheetController";
import Predictions from "../models/Predictions";
import {
  generatePrediction,
  deleteSheets,
} from "../predictionModel/PredictionModelFunctions";
import * as yup from "yup";
import log from "../util/log";
import DateController from "./DateController";
import FailController from "./FailController";

class PredictionController {
  async getPrediction(req, res) {
    let schema = yup.object().shape({
      cidade: yup.string().required(),
      data: yup.string().required(),
      offset: yup.number().required(),
    });

    let validReqData = await schema.isValid(req.query);
    if (!validReqData) {
      return res.sendStatus(400);
    }

    let data;
    let tryingWithDate = req.query.data;
    const MAX_TRIES = 5;

    for (let tries = 0; tries < MAX_TRIES; tries++) {
      log(`trying with date: ${tryingWithDate}`);
      let reports = await DataFetchController.fetchData(
        req.query.cidade,
        tryingWithDate,
        Number(req.query.offset)
      );

      if (reports) {
        tryingWithDate = reports.dateReport.dataValues.dia;
      }

      let hadPreviousFails;
      if (reports) {
        hadPreviousFails = await FailController.findFail(
          req.query.cidade,
          reports.dateReport.dataValues.dia,
          reports.offsetReport.dataValues.dia
        );
      }

      if (reports && !hadPreviousFails) {
        data = reports;
      } else {
        tryingWithDate = DateController.subtractDate(tryingWithDate, 1);
      }

      if (data) {
        let alreadyProcessedData = await Predictions.findOne({
          where: {
            municipio: data.cityData.nome,
            data: data.dateReport.dataValues.dia,
            dataOffset: data.offsetReport.dataValues.dia,
          },
        });

        if (alreadyProcessedData) {
          let alreadyProcessedPrediction = JSON.parse(
            alreadyProcessedData.previsoes
          );
          log(`Found already processed prediction (${data.cityData.nome})`);
          return res.send({ ...data, predictions: alreadyProcessedPrediction });
        }

        let timestamp = Date.now();

        await SheetController.generateSheet(data, timestamp);

        await generatePrediction(timestamp);

        let predictionData = await SheetController.getSheetData(
          data.cityData.nome,
          timestamp
        );

        await deleteSheets(timestamp);

        if (predictionData) {
          log(`Prediction processed successfully (${data.cityData.nome})`);

          await Predictions.create({
            municipio: data.cityData.nome,
            previsoes: JSON.stringify(predictionData),
            data: data.dateReport.dataValues.dia,
            dataOffset: data.offsetReport.dataValues.dia,
          });

          return res.send({ ...data, predictions: predictionData });
        } else {
          log(`Failed to generate the predictions (${data.cityData.nome})`);

          await FailController.storeFail(
            data.cityData.nome,
            data.dateReport.dataValues.dia,
            data.offsetReport.dataValues.dia
          );
          tryingWithDate = DateController.subtractDate(tryingWithDate, 1);
        }
      }
    }
    return res.sendStatus(500);
  }
}

export default new PredictionController();
