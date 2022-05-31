import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import usuarioController from './controller/usuarioController.js'

const server = express();
server.use(cors());
server.use(express.json());
server.use(usuarioController);

server.listen(process.env.PORT,
                () => console.log(`API aberta na porta ${process.env.PORT}`));
