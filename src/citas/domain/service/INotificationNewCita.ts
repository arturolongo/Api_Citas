import { Cita } from "../entities/Cita";

export interface INotificationNewCita {
    sendNotification(cita:Cita):Promise<boolean>;
}