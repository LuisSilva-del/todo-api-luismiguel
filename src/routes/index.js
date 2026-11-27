const express = require("express");
const tarefaRoutes = require("./tarefaRoutes");

const router = express.Router();

router.use("/tarefas", tarefaRoutes);

module.exports = router;
