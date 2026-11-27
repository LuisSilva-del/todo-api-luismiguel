// CONTROLLER: recebe da rota, chama o service e devolve a resposta.

const categoriaService = require("../services/categoriaService");

async function listar(req, res) {
  const categorias = await categoriaService.listarCategorias();
  res.status(200).json(categorias);
}

async function buscarPorId(req, res) {
  const categoria = await categoriaService.buscarCategoriaPorId(req.params.id);
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

async function criar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const novaCategoria = await categoriaService.criarCategoria(req.body);
  res.status(201).json(novaCategoria);
}

async function deletar(req, res) {
  const resultado = await categoriaService.deletarCategoria(req.params.id);
  if (!resultado.encontrada) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  if (resultado.conflito) {
    res.status(409).json({ erro: "A categoria possui tarefas vinculadas" });
    return;
  }
  res.status(204).send();
}

async function atualizar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const categoria = await categoriaService.atualizarCategoria(
    req.params.id,
    req.body,
  );
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

async function atualizarParcial(req, res) {
  const erro = categoriaService.validarCategoria(req.body, false);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const categoria = await categoriaService.atualizarCategoriaParcial(
    req.params.id,
    req.body,
  );
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  deletar,
  atualizar,
  atualizarParcial,
};
