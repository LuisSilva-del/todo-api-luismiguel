// SERVICE: a logica de Categoria e o SQL que vai para o banco.

const { db } = require("../config/db");

async function listarCategorias() {
  const [linhas] = await db.query("SELECT * FROM categorias");
  return linhas;
}

async function buscarCategoriaPorId(id) {
  const [linhas] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);
  return linhas[0];
}

async function criarCategoria(dados) {
  const [resultado] = await db.query(
    "INSERT INTO categorias (nome) VALUES (?)",
    [dados.nome],
  );
  return await buscarCategoriaPorId(resultado.insertId);
}

async function deletarCategoria(id) {
  const [resultado] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

function validarCategoria(dados, completo) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return "Envie os dados da categoria em JSON";
  }
  if (
    completo &&
    (!dados.nome || typeof dados.nome !== "string" || !dados.nome.trim())
  ) {
    return "O nome e obrigatorio";
  }
  if (
    dados.nome !== undefined &&
    (typeof dados.nome !== "string" || !dados.nome.trim())
  ) {
    return "O nome e obrigatorio";
  }
  return null;
}

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  deletarCategoria,
  validarCategoria,
};
