import { Cita } from "../entities/Cita";

export interface CitaRepository{
        createCita(
            idCita: number,
            NombrePaciente: number,
            Problema:string

        ):Promise<Cita | null>
}

