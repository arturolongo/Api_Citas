import { CreateCitaUseCase } from "../application/MethodsPagos/CreateCitaUseCase";
import { CreateCitaController } from "./controllers/CreateCitaController";
import { NotificationCitaUseCase } from '../application/services/NotificationNewCita'
import { NotificationNewCita } from './servicesRabbitMQ/NotificationNewCita';

import { MysqlCitaRepository } from "./repository/MysqlCitaRepository";
export const mysqlCitaRepository = new MysqlCitaRepository();


export const servicesNotification = new NotificationNewCita();
export const serviceNotificationUseCase = new NotificationCitaUseCase(
    servicesNotification
)


export const createCitaUseCase = new CreateCitaUseCase(
    mysqlCitaRepository,serviceNotificationUseCase
)
export const createCitaController = new CreateCitaController(
    createCitaUseCase
)
