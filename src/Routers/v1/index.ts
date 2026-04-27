import { Router } from "express";
import problemRouter from "./problem.router";

const v1Router: Router = Router();

v1Router.use("/problems", problemRouter);

export default v1Router;