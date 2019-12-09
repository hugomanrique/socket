import { Socket } from 'socket.io';
import scks from 'socket.io';
import { Usuariosprocess } from '../classes/usuarios.procesos';
import { Usuario } from '../classes/usuario';

//Listado de usuarios conectados
export const usersConnected = new Usuariosprocess();

//Funcion para conectar el cliente
export const conectarCliente = (cliente: Socket)=>{
   const user = new Usuario(cliente.id);
   usersConnected.agregar(user);
}

//Usuario desconectado
export const desconectar = (cliente: Socket)=>{
   cliente.on('disconnect', () =>{
      console.log(usersConnected.deleteUser(cliente.id));
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
//Configurar usuario
export const config_user = (cliente: Socket, io: scks.Server) =>{
   cliente.on('configurar-usuario',(payload: {nombre:string},callback?) =>{
      console.log('CONFIGURANDO', payload);
      usersConnected.actualizarNombre(cliente.id,payload.nombre);
      callback({
         ok: true,
         mensaje: `Usuario ${payload.nombre} configurado` 
      });
   });
}