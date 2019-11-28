import express from 'express';
import { SERVER_PORT } from '../global/configuraciones';


export class Server {
   public app:  express.Application;
   public port: number;

   constructor(){
      this.app = express();
      this.port = SERVER_PORT;
   }

   iniciar(fnCallback: any ){
      this.app.listen(this.port, fnCallback);
   }

}