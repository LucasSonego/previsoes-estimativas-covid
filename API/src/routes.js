import { Router } from "express";
import cors from "cors";

const routes = Router();

routes.use(cors());

routes.get("/teste", () => console.log("dale"));

export default routes;
