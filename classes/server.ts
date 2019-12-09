import express from 'express';
import { SERVER_PORT } from '../global/configuraciones';
import lib_socket from 'socket.io';
import http from 'http';
import * as scks from '../sockets/sockets';

export class Server {
   private static _instance: Server;
   public app:  express.Application;
   public port: number;
   public io: lib_socket.Server;
   private httpServer: http.Server;

   private constructor(){
      this.app = express();
      this.port = SERVER_PORT;
      this.httpServer = new http.Server(this.app);
      this.io = lib_socket(this.httpServer);
      this.escucharSocket();
   }

   public static get instance(){
      return this._instance || (this._instance = new this());
   }

   private escucharSocket(){
      this.io.on('connection', cliente =>{
         //CONECTAR A CLIENTE
         scks.conectarCliente(cliente);
         //CONFIGURAR USUARIO
         scks.config_user(cliente,this.io);
         //MENSAJES
         scks.mensaje(cliente,this.io);
         //EJECUCION DE CLIENTE DESCONECTADO
         scks.desconectar(cliente);
      });
   }

   iniciar(fnCallback: any ){
      this.httpServer.listen(this.port, fnCallback);
   }

}