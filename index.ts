import { Server } from './classes/server';
import { SERVER_PORT } from './global/configuraciones';
import router from './routes/routes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';


const server = Server.instance;
//BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//CORS
server.app.use(cors({origin: true, credentials: true}));
//Morgan
server.app.use(morgan('dev'));

server.app.use('/', router);

server.iniciar(()=>{
   console.log(`servidor corriendo en el puerto: ${SERVER_PORT}`);
})