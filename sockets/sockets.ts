import { Socket } from 'socket.io';
import scks from 'socket.io';

//Usuario desconectado
export const desconectar = (cliente: Socket)=>{
   cliente.on('disconnect', () =>{
      console.log('Cliente desconectado'); 
   });
}
//Escuchar mensajes
export const mensaje = (cliente: Socket, io: scks.Server) =>{
   cliente.on('mensaje',(payload: {de: string, cuerpo:string },callback?) =>{
      console.log('mensaje recibido', payload);
      io.emit('mensaje-nuevo',payload);
   });
}