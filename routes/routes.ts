import {Router, Request, Response} from 'express';

export const router = Router();

router.get('/mensajes',(req: Request, res: Response) => {
   res.json({
      ok: true,
      mensaje: 'Todo bien - GET'
   })
});

router.post('/mensajes',(req: Request, res: Response) => {
   const body =  req.body.cuerpo;
   const de = req.body.de;
   res.json({
      ok: true,
      mensaje: 'Todo listo - POST',
      body,
      de
   })
});

router.post('/mensajes/:id',(req: Request, res: Response) => {
   const body =  req.body.cuerpo;
   const de = req.body.de;
   const id = req.params.id;
   res.json({
      ok: true,
      mensaje: 'Todo listo - POST',
      body,
      de,
      id
   })
});

export default router;