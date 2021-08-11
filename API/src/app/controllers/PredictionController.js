import DataFetchController from "./DataFetchController";
import SheetController from "./SheetController";
import Predictions from "../models/Predictions";
import {
  generatePrediction,
  deleteSheets,
} from "../predictionModel/PredictionModelFunctions";
import * as yup from "yup";
import DateController from "./DateController";

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
    const MAX_TRIES = 4;

    for (let tries = 0; tries < MAX_TRIES; tries++) {
      let timestamp = Date.now();
      if (!data) {
        data = await DataFetchController.fetchData(
          req.query.cidade,
          req.query.data,
          Number(req.query.offset)
        );
      } else {
        let fallbackDate = DateController.subtractDate(
          data.dateReport.dataValues.dia,
          1
        );
        data = await DataFetchController.fetchData(
          req.query.cidade,
          fallbackDate,
          Number(req.query.offset)
        );
      }

      let predictionData = await Predictions.findOne({
        where: {
          municipio: data.cityData.nome,
          data: data.dateReport.dataValues.dia,
          dataOffset: data.offsetReport.dataValues.dia,
        },
      });

      if (predictionData) {
        predictionData = JSON.parse(predictionData.previsoes);
        return res.send({ ...data, predictions: predictionData });
      } else {
        await SheetController.generateSheet(data, timestamp);

        await generatePrediction(timestamp);

        predictionData = await SheetController.getSheetData(
          data.cityData.nome,
          timestamp
        );

        await deleteSheets(timestamp);

        if (predictionData) {

          await Predictions.create({
            municipio: data.cityData.nome,
            previsoes: JSON.stringify(predictionData),
            data: data.dateReport.dataValues.dia,
            dataOffset: data.offsetReport.dataValues.dia,
          });

          return res.send({ ...data, predictions: predictionData });
        }
      }
    }
    return res.sendStatus(500);
  }
}

export default new PredictionController();
