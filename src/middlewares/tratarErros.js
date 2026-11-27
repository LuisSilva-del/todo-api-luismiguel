// Recebe qualquer erro que aconteceu numa rota e devolve uma resposta.

function tratarErros(err, req, res, next) {
  console.log("ERRO:", err.code, err.message);
  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;
