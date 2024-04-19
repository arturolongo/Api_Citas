import { Request,Response } from "express";
import { CreateCitaUseCase } from "../../application/MethodsPagos/CreateCitaUseCase";

export class CreateCitaController{
    constructor(readonly createCitaUseCase : CreateCitaUseCase){}
    async run(req: Request, res:Response):Promise<void>{
        const data = req.body;
        try {
            const cita = await this.createCitaUseCase.run(
                data.idCita,
                data.NombrePaciente,
                data.Problema
            )
            if(cita) console.log(cita)
            res.status(201).send({
                status:"succes",
                data:{
                    idCita: cita?.idCita,
                    NombrePaciente:cita?.NombrePaciente,
                    Problema: cita?.Problema
                }
               
        })
           
        } catch (error) {
            res.status(204).send({
                status:"error",
                data:"Ocurrio un error",
                mesagges:error
            })
        }
    }
}