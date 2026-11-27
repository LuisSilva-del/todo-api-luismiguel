// SERVICE: a logica de Tarefa e o SQL que vai para o banco.

const { db } = require("../config/db");

// Os unicos valores aceitos:
const PRIORIDADES = ["baixa", "media", "alta"];
const STATUS = ["a_fazer", "fazendo", "feita"];

function validarTarefa(dados, completo) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return "Envie os dados da tarefa em JSON";
  }

  if (completo && !dados.titulo) return "O titulo e obrigatorio";
  if (completo && !dados.prioridade) return "A prioridade e obrigatoria";
  if (completo && !dados.status) return "O status e obrigatorio";

  if (
    dados.titulo !== undefined &&
    (typeof dados.titulo !== "string" || !dados.titulo.trim())
  ) {
    return "O titulo e obrigatorio";
  }

  if (
    dados.prioridade !== undefined &&
    !PRIORIDADES.includes(dados.prioridade)
  ) {
    return "A prioridade deve ser baixa, media ou alta";
  }

  if (dados.status !== undefined && !STATUS.includes(dados.status)) {
    return "O status deve ser a_fazer, fazendo ou feita";
  }

  if (
    dados.categoria_id !== undefined &&
    dados.categoria_id !== null &&
    (!Number.isInteger(dados.categoria_id) || dados.categoria_id < 1)
  ) {
    return "A categoria informada e invalida";
  }

  return null;
}

async function categoriaExiste(id) {
  const [linhas] = await db.query("SELECT id FROM categorias WHERE id = ?", [id]);
  return linhas.length > 0;
}

async function listarTarefas(filtros = {}) {
  const [linhas] = await db.query(
    "SELECT t.*, c.nome AS categoria FROM tarefas t LEFT JOIN categorias c ON t.categoria_id = c.id",
  );
  let resultado = linhas;
  return resultado;
}

async function buscarTarefaPorId(id) {
  const [linhas] = await db.query(
    "SELECT t.*, c.nome AS categoria FROM tarefas t LEFT JOIN categorias c ON t.categoria_id = c.id WHERE t.id = ?",
    [id],
  );
  return linhas[0];
}

async function criarTarefa(dados) {
  const [resultado] = await db.query(
    "INSERT INTO tarefas (titulo, prioridade, status, categoria_id) VALUES (?, ?, ?, ?)",
    [dados.titulo, dados.prioridade, dados.status, dados.categoria_id ?? null],
  );
  return await buscarTarefaPorId(resultado.insertId);
}

async function atualizarTarefa(id, dados) {
  const tarefa = await buscarTarefaPorId(id);
  if (!tarefa) return null;

  await db.query(
    "UPDATE tarefas SET titulo = ?, prioridade = ?, status = ?, categoria_id = ? WHERE id = ?",
    [dados.titulo, dados.prioridade, dados.status, dados.categoria_id ?? null, id],
  );
  return await buscarTarefaPorId(id);
}

async function atualizarParcialTarefa(id, dados) {
  const tarefa = await buscarTarefaPorId(id);
  if (!tarefa) return null;
  if (dados.titulo !== undefined) tarefa.titulo = dados.titulo;
  if (dados.prioridade !== undefined) tarefa.prioridade = dados.prioridade;
  if (dados.status !== undefined) tarefa.status = dados.status;
  if (dados.categoria_id !== undefined) tarefa.categoria_id = dados.categoria_id;
  return await atualizarTarefa(id, tarefa);
}

async function deletarTarefa(id) {
  const [resultado] = await db.query("DELETE FROM tarefas WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

module.exports = {
  listarTarefas,
  buscarTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  atualizarParcialTarefa,
  deletarTarefa,
  validarTarefa,
  categoriaExiste,
};
