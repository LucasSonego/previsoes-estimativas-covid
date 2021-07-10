import DataFetchController from "./DataFetchController";
import SheetController from "./SheetController";

class PredictionController {
  async getPrediction(req, res) {
    let data = await DataFetchController.fetchData(
      req.body.cidade,
      req.body.data,
      req.body.offset
    );

    await SheetController.generateSheet(data);

    return res.send(data);
  }
}

export default new PredictionController();
