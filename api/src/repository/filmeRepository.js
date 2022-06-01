import { con } from './connection.js'

export async function inserirFilme(filme) {
    const comando =
    `
    insert into tb_filme(id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
			values(?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, [filme.usuario, 
                                                 filme.nome, 
                                                 filme.sinopse, 
                                                 filme.avaliacao, 
                                                 filme.lancamento, 
                                                 filme.disponivel]);
    filme.id = resposta.insertId;
    return filme;   
}   

export async function alterarImagem(id, imagem) {
    const comando = 
                `update tb_filme
                set img_filme = ?
                where id_filme = ?`

    const [resposta] = await con.query(comando, [id, imagem]);
    return resposta.affectedRows;
}

export async function listarTodos() {
    const comando = 
                `select id_filme		ID,
                        nm_filme		Nome,
                        vl_avaliacao	Avaliação,
                        dt_lancamento	Lançamento,
                        bt_disponivel	Disponível
                   from tb_filme`

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function listarID(id) {
    const comando = 
                `select id_filme		ID,
                        nm_filme		Nome,
                        vl_avaliacao	Avaliação,
                        dt_lancamento	Lançamento,
                        bt_disponivel	Disponível
                   from tb_filme`

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

export async function listarNome(nome) {
    const comando = 
                `select id_filme		ID,
                        nm_filme		Nome,
                        vl_avaliacao	Avaliação,
                        dt_lancamento	Lançamento,
                        bt_disponivel	Disponível
                   from tb_filme`

    const [linhas] = await con.query(comando, [ `${nome}` ]);
    return linhas;
}