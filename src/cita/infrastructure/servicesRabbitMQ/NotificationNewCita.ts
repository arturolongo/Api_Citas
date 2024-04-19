import amqplib from 'amqplib'
import { INotificationNewCita } from '../../domain/service/INotificationNewCita'
import { Cita } from '../../domain/entities/Cita'
import { buffer } from 'stream/consumers';


export class NotificationNewCita implements INotificationNewCita{
    private options: any;
    private url: any;
    private exch: any;
    private server: any;
    constructor() {
        this.options = {
          protocol:'amqp',
          username: 'zoe',
          password:'zoe10208',
          port: 5672,
            
        };
        this.url = 'amqp://admin:zoe10208@34.198.106.93';
        this.exch = 'up.practica';
        //Options solo para cloudamqp
       // this.server = process.env.AMQP_SERVER;
      }
      async  sendNotification(cita: Cita): Promise<boolean> {
          try {
          const conn = await amqplib.connect(this.url);
          const ch =await conn.createChannel();
          
          const status = ch.publish(this.exch,"", Buffer.from(JSON.stringify(cita)))
         
          return status;
          } catch (error) {
            return false;
          }

      }
}