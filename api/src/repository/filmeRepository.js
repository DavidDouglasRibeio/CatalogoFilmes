import { con } from './connection.js' 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Inserir Filme //

export async function inserirFilme(filme) {
    const comando =
    `
    insert into tb_filme(id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
			values(?, ?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = resposta.insertId

    return filme;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Alterar Filme //

export async function alterarFilme(id, filme) {
    const comando = 
    `
    update tb_filme
    set nm_filme       = ?,
        ds_sinopse     = ?,
        vl_avaliacao   = ?,
        dt_lancamento  = ?,
        bt_disponivel  = ?,
        id_usuario     = ?
    where id_filme     = ?
    `;
    const [resposta] = await con.query(comando, [id, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, filme.usuario]);
    return resposta.affectedRows;
}

export async function alterarFilmeImagem(id, imagem) {
    const comando = 
    `
    update tb_filme
    set img_filme = ?
    where id_filme = ?
    `;
    const [resposta] =  await con.query(comando, [id, imagem])
    return resposta.affectedRows; 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Remover Filme //

export async function removerFilme(id) {
     const comando =
     `
     delete from tb_filme
    where id_filme = ?
     `;

     const [resposta] = con.query(comando, [id]);
     return resposta.affectedRows;
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Consultar todos os filmes //

export async function consultarTodosFilmes() {
     const comando = 
    `
     select id_filme	    id,
            nm_filme		nome,
            vl_avaliacao	avaliação,
            dt_lancamento	lançamento,
            bt_disponivel	disponível
       from tb_filme
    `;

    const [linhas] = await con.query(comando);
    return linhas;
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Consultar filmes por nome //

export async function consultarFilmesNome(nome) {
    const comando = 
   `
    select id_filme	        id,
           nm_filme		    nome,
           vl_avaliacao	    avaliação,
           dt_lancamento	lançamento,
           bt_disponivel	disponível
      from tb_filme
      where nm_filme like ?
   `;

   const [linhas] = await con.query(comando, [`%${nome}%`]);
   return linhas;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Consultar filmes por id //

 export async function consultarFilmesID(id) {
    const comando = 
   `
    select id_filme	        id,
           nm_filme		    nome,
           ds_sinopse       sinopse,
           img_filme        imagem,
           vl_avaliacao	    avaliação,
           dt_lancamento	lançamento,
           bt_disponivel	disponível
      from tb_filme
      where id_filme = ?
   `;

   const [linhas] = await con.query(comando, [id]);
   return linhas[0];
}
