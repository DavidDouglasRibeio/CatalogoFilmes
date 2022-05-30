use CatalogoFilmesDB;

-- Carga Inicial ADM
insert into tb_usuario(nm_usuario, ds_email, ds_senha)
				values('Administrador', 'administrador@adm.com', '1234');
                
insert into tb_usuario(nm_usuario, ds_email, ds_senha)
				values('Administradora', 'administrador@adm.com', '1234');

      
-- CSU01: Realizar login
select id_usuario	ID,
	   nm_usuario	Nome,
	   ds_email		Email
from tb_usuario
where ds_email = 'administrador@adm.com'
and   ds_senha = '1234';


-- CSU02: Cadastrar filme
insert into tb_filme(id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel, img_filme)
			values(1, 'Harry Potter e a Pedra Filosofal', 'Filme top', 8.5, '2015-06-17', true, '/armazenameto/filmes/harry.jpg');
insert into tb_filme(id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel, img_filme)
			values(2, 'Carros', 'Filme foda', 9.2, '2013-06-17', true, '/armazenameto/filmes/carros.jpg');
            
            
-- CSU03: Alterar filme
update tb_filme
set nm_filme = 'Harry Potter e a Camara Secreta',
	ds_sinopse = 'Filme mt loko',
    vl_avaliacao = 9.5,
    dt_lancamento = '2010-09-04',
    img_filme = '/armazenameto/filmes/harrypotter.jpg'
where id_filme = 1;



-- CSU04: Deletar filme
delete from tb_filme
where id_filme = 3;


-- CSU05: Consultar filmes
select id_filme			ID,
	   nm_filme			Nome,
       ds_sinopse		Sinopse,
       vl_avaliacao		Avaliação,
       dt_lancamento	Lançamento,
       bt_disponivel	Disponível
from tb_filme;


-- CSU06: Consultar filmes por nome
select id_filme			ID,
	   nm_filme			Nome,
       ds_sinopse		Sinopse,
       vl_avaliacao		Avaliação,
       dt_lancamento	Lançamento,
       bt_disponivel	Disponível
from tb_filme
where nm_filme   		like '%a%';


-- CSU07: Consultar filmes por ID
select id_filme			ID,
	   nm_filme			Nome,
       ds_sinopse		Sinopse,
       vl_avaliacao		Avaliação,
       dt_lancamento	Lançamento,
       bt_disponivel	Disponível,
       img_filme		Capa
from tb_filme
where id_filme = 3;