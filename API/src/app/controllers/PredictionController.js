import DataFetchController from "./DataFetchController";
import SheetController from "./SheetController";
import Predictions from "../models/Predictions";
import {
  generatePrediction,
  deleteSheets,
} from "../predictionModel/PredictionModelFunctions";
import * as yup from "yup";

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

    let data = await DataFetchController.fetchData(
      req.query.cidade,
      req.query.data,
      Number(req.query.offset)
    );

    let predictionData;

    predictionData = await Predictions.findOne({
      where: {
        municipio: data.cityData.nome,
        data: data.dateReport.dataValues.dia,
        dataOffset: data.offsetReport.dataValues.dia,
      },
    });

    if (predictionData) {
      predictionData = JSON.parse(predictionData.previsoes);
    } else {
      const timestamp = Date.now();

      await SheetController.generateSheet(data, timestamp);

      await generatePrediction(timestamp);

      predictionData = await SheetController.getSheetData(
        data.cityData.nome,
        timestamp
      );

      await Predictions.create({
        municipio: data.cityData.nome,
        previsoes: JSON.stringify(predictionData),
        data: data.dateReport.dataValues.dia,
        dataOffset: data.offsetReport.dataValues.dia,
      });

      deleteSheets(timestamp);
    }

    return res.send({ ...data, predictions: predictionData });
  }
}

export default new PredictionController();
