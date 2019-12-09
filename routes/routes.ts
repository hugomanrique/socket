import {Router, Request, Response} from 'express';
import { Server } from '../classes/server';
import { Socket } from 'socket.io';
import { usersConnected } from '../sockets/sockets';

export const router = Router();

router.get('/mensajes',(req: Request, res: Response) => {
   res.json({
      ok: true,
      mensaje: 'Todo bien - GET'
   })
});

router.get('/usuarios',(req: Request, res: Response) => {
   const server = Server.instance;
   server.io.clients((err: Error, clientes: string[]) =>{
      if(err){
         return res.json({
            ok: false,
            err
         })
      }

      res.json({
         ok:true,
         clientes
      })
   });
});

//OBTENER USUARIOS Y SUS NOMBRES
router.get('/usuarios/detalle',(req: Request, res: Response) => {

   res.json({
      ok:true,
      clientes:usersConnected.getLista()
   });
});

router.post('/mensajes',(req: Request, res: Response) => {
   const cuerpo =  req.body.cuerpo;
   const de = req.body.de;
   const payload = {
      de,
      cuerpo
   }
   const server = Server.instance;
   server.io.emit('mensaje-nuevo',payload);
   res.json({
      ok: true,
      mensaje: 'Todo listo - POST',
      cuerpo,
      de
   })
});

router.post('/mensajes/:id',(req: Request, res: Response) => {
   const body =  req.body.cuerpo;
   const de = req.body.de;
   const id = req.params.id;

   const payload = {
      de,
      body
   }
   const server = Server.instance;
   server.io.in(id).emit('mensaje-privado',payload);
   res.json({
      ok: true,
      mensaje: 'Todo listo - POST',
      body,
      de,
      id
   })
});

export default router;