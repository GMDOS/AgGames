CREATE TABLE IF NOT EXISTS placar (
    id SERIAL PRIMARY KEY,
    nome VARCHAR (256) NOT NULL,
    pontuacao int not null
);

INSERT INTO placar (nome, pontuacao) VALUES ('teste', 12);

select * from placar;