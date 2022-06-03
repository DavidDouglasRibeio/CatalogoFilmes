import { Router } from 'express'
import { alterarFilme, alterarFilmeImagem, consultarFilmesID, consultarFilmesNome, consultarTodosFilmes, inserirFilme, removerFilme } from '../repository/filmeRepository.js'
import multer from 'multer'
const server = Router();
const upload = multer({ dest: 'storage/capaFilmes'});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Inserir Filme //

server.post('/filme', async(req, resp) => {
    try{
        const novoFilme = req.body;

        if(!novoFilme.nome)
            throw new Error('Nome do filme obrigatório')
        if(!novoFilme.sinopse)
            throw new Error('Sinopse do filme obrigatório')
        if(novoFilme.avaliacao == null || novoFilme.avaliacao < 0)
            throw new Error('Avaliação do filme obrigatório')
        if(!novoFilme.lancamento)
            throw new Error('Lançamento do filme obrigatório')
        if(!novoFilme.disponivel)
            throw new Error('Campo Disponível obrigatório')
        if(!novoFilme.usuario)
            throw new Error('Usuário não logado')
        
        const filmeInserido = await inserirFilme(novoFilme);
        resp.send(filmeInserido);
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Alterar imagem do Filme //

 server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try{
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarFilmeImagem(imagem, id);

        if(resposta != 1)
            throw new Error('Imagem não pode ser salva')
        resp.status(200).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
 })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Alterar Filme //

 server.put('/filme/:id', async (req, resp) => {
    try{
        const { id }= req.params;
        const filme = req.body;
   
        if(!novoFilme.nome)
        throw new Error('Nome do filme obrigatório')
       if(!novoFilme.sinopse)
           throw new Error('Sinopse do filme obrigatório')
       if(novoFilme.avaliacao == null || novoFilme.avaliacao < 0)
           throw new Error('Avaliação do filme obrigatório')
       if(!novoFilme.lancamento)
           throw new Error('Lançamento do filme obrigatório')
       if(!novoFilme.disponivel)
           throw new Error('Campo Disponível obrigatório')
       if(!novoFilme.usuario)
           throw new Error('Usuário não logado')
       
       const result = await alterarFilme(id, filme);
   
       if(result != 1)
           throw new Error('Filme não pôde ser alterado')
       else
           resp.status(204).send()
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
 })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Remover Filme //

 server.delete('/filme/:id', async(req, resp) => {
    try{
        const { id } = req.params;
        const resposta = await removerFilme(Number(id));
   
        if(resposta != 1)
           throw new Error('Filme não pôde ser removido')
       
       resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
 })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Consultar todos os filmes //

 server.get('/filme', async(req, resp) => {
    try{
        const resposta = await consultarTodosFilmes();
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
 })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Consultar filmes por nome //

 server.get('/filme/busca', async(req, resp) => {
    try{
        const { nome } = req.query;
        const resposta = await consultarFilmesNome(nome);

        if(!resposta)
            resp.status(404).send([])
        else
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
 })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Consultar filmes por id //

 server.get('/filme/:id', async(req, resp) => {
    try{
        const { id } = req.params;
        const resposta = await consultarFilmesID(Number(id));

        if(!resposta)
            resp.status(404).send([])
        else
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
 })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default server;