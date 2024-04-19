import { NotificationNewCita } from "../../infrastructure/servicesRabbitMQ/NotificationNewCita";
import { Cita } from "../../domain/entities/Cita";

export class NotificationCitaUseCase{
    constructor(readonly serviceNotification:NotificationNewCita){}
    async run(cita:Cita){
        await this.serviceNotification.sendNotification(cita)
    }
}