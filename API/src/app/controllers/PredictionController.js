import DataFetchController from "./DataFetchController";
import SheetController from "./SheetController";
import generatePrediction from "../predictionModel/generate";

class PredictionController {
  async getPrediction(req, res) {
    let data = await DataFetchController.fetchData(
      req.body.cidade,
      req.body.data,
      req.body.offset
    );

    await SheetController.generateSheet(data);

    await generatePrediction();

    let predictionData = await SheetController.getSheetData(data.cityData.nome);

    return res.send({ ...data, predictionData });
  }
}

export default new PredictionController();
