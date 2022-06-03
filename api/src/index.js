import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import usuarioController from './controller/usuarioController.js'
import filmeController from './controller/filmeController.js'

const server = express();
server.use(cors());
server.use(express.json());


server.use(usuarioController);
server.use(filmeController);


server.use('/storage/capasfilmes', express.static('storage/capasfilmes'))


server.listen(process.env.PORT,
    () => console.log(`API aberta na porta ${process.env.PORT}`));