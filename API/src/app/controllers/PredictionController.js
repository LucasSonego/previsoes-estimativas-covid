import DataFetchController from "./DataFetchController";
import SheetController from "./SheetController";
import Predictions from "../models/Predictions";
import generatePrediction from "../predictionModel/generate";

class PredictionController {
  async getPrediction(req, res) {
    let data = await DataFetchController.fetchData(
      req.body.cidade,
      req.body.data,
      req.body.offset
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
      await SheetController.generateSheet(data);

      await generatePrediction();

      predictionData = await SheetController.getSheetData(data.cityData.nome);

      await Predictions.create({
        municipio: data.cityData.nome,
        previsoes: JSON.stringify(predictionData),
        data: data.dateReport.dataValues.dia,
        dataOffset: data.offsetReport.dataValues.dia,
      });
    }

    return res.send({ ...data, predictions: predictionData });
  }
}

export default new PredictionController();
