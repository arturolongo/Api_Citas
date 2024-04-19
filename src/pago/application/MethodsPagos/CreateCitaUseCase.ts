import { json } from "stream/consumers";
import { Cita } from "../../domain/entities/Cita";
import { CitaRepository } from "../../domain/interface/CitaRepository";
import { NotificationCitaUseCase } from "../services/NotificationNewCita";
export class CreateCitaUseCase{
     constructor(
        readonly CitaRepository:CitaRepository,
        readonly notification: NotificationCitaUseCase
     ){}
    async run(
        idCita:number,
        NombrePaciente:number,
        Problema:string
    ):Promise <Cita | null>{
        try {
            const cita = await this.CitaRepository.createCita(
                idCita,
                NombrePaciente,
                Problema
                )
         if(cita)this.notification.run(cita)
             return cita;
        } catch (error) {
            return null;
        }
    }
}