import { query } from "../../../database/mysql";
import { Cita } from "../../domain/entities/Cita";
import { CitaRepository } from "../../domain/interface/CitaRepository";

export class MysqlCitaRepository implements CitaRepository{

    async createCita(
        idCita: number,
        NombrePaciente: number,
        Problema: string): Promise<Cita | null> {
            const sql = "INSERT INTO Citas(idCita,NombrePaciente,Problema) VALUES(?,?,?)"
            const params:any[] =  [idCita,NombrePaciente,Problema];
            try {
                const [idCita,NombrePaciente,Problema]: any = params;
                const cita: Cita = new Cita(idCita, NombrePaciente, Problema);
                const [result] :any = await query(sql, params);
                
               
                return cita;

            } catch (error) {
                return null;
            } 
    }
}