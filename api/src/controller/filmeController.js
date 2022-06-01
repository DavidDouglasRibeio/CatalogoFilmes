import { alterarImagem, inserirFilme, listarTodos } from "../repository/filmeRepository.js";
import { Router } from 'express';
import multer from 'multer'
const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' });

server.post('/filme', async(req, resp) => {
    try {
        const novoFilme = req.body;

        if(!novoFilme.usuario) throw new Error('Usuário não logado')
        if(!novoFilme.nome) throw new Error('Nome do filme é obrigatório')

        if(!novoFilme.sinopse) throw new Error('Sinopse do filme é obrigatório')

        if(novoFilme.avaliacao < 0 || novoFilme.avaliacao == undefined) throw new Error('Avaliação do filme é obrigatório')
        if(!novoFilme.lancamento) throw new Error('Lançamento do filme é obrigatório')
        if(!novoFilme.lancamento) throw new Error('Campo Disponível é obrigatório')



        const filme = await inserirFilme(novoFilme);
        resp.send(filme)
    }
    catch(err) {
        resp.status(401).send({erro: err.message})
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.put('/filme/:id/capa', upload.single('capa'), async(req, resp) => {
    try{
        const { id } = req.params;
        const { imagem } = req.file.path;
        const resposta = await alterarImagem(id, imagem);

        if(!resposta != 1)
            throw new Error('Não foi possível alterar a imagem')

        resp.status(204).send();
    }   
    catch(err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.get('/filme', async(req, resp) => {
    try {
        const resposta = await listarTodos();
        resp.send(resposta)
    }
    catch(err) {
        resp.status(401).send({erro: err.message})
    }
})

server.get('/filme/busca', async(req, resp) => {
    try {
        const {nome} = req.query;
        const resposta = await listarTodos(nome);

        if(!resposta)
            resp.status(404).send([])
        else
            resp.send(resposta)
    }
    catch(err) {
        resp.status(401).send({erro: err.message})
    }
})

server.get('/filme/:id', async(req, resp) => {
    try {
        const { id } = req.query;
        const resposta = await listarTodos(Number(id));

        if(!resposta)
            resp.status(404).send([])
        else
            resp.send(resposta)
    }
    catch(err) {
        resp.status(401).send({erro: err.message})
    }
})




export default server;

