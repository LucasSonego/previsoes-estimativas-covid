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

    return res.send(data);
  }
}

export default new PredictionController();
