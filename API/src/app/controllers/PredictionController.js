import DataFetchController from "./DataFetchController";

class PredictionController {
  async getPrediction(req, res) {
    let data = await DataFetchController.fetchData(
      req.body.cidade,
      req.body.data,
      req.body.offset
    );

    return res.send(data);
  }
}

export default new PredictionController();
