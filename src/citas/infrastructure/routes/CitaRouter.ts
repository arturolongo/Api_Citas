import express from 'express'
import { createCitaController } from "../DependenciesCita";
export const citaRouter = express.Router()

citaRouter.post(
    "/",
    createCitaController.run.bind(createCitaController)
)