import sql from './dbs.cjs';
/*
sql`DROP TABLE IF EXISTS videos`.then(() => {
  console.log("Tabela excluida")
})
*/

sql
`
CREATE TABLE videos (
  id          TEXT PRIMARY KEY,
  title       TEXT,
  description TEXT,
  duration    INTEGER
  );
`.then(() => {
  console.log("Tabela Criada")
})
