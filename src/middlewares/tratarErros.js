// Recebe erros das rotas e devolve o status adequado.

function tratarErros(err, req, res, next) {
  console.log("ERRO:", err.code, err.message);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ erro: "JSON invalido" });
    return;
  }

  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    res.status(400).json({ erro: "A categoria informada nao existe" });
    return;
  }

  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    res.status(409).json({ erro: "A categoria possui tarefas vinculadas" });
    return;
  }

  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;
