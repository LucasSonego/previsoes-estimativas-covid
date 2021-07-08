import { Router } from "express";
import cors from "cors";

import PredictionController from "./app/controllers/PredictionController";

const routes = Router();

routes.use(cors());

routes.get("/teste", PredictionController.getPrediction);

export default routes;
