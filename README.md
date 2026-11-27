# API de Tarefas

**Aluno(a):** Luis Miguel Pereira da Silva

API de gerenciamento de tarefas desenvolvida com Node.js, Express e MySQL, seguindo o padrão MVC.

## Como executar

1. Instale as dependências: `npm install`.
2. Copie `.env.example` para `.env` e configure a senha do seu MySQL.
3. Abra `src/database/todo.sql` no MySQL Workbench e execute o script completo.
4. Inicie a API: `npm run dev`.
5. Em outro terminal, execute os testes: `npm run conferir`.

A API usa a porta 3000 por padrão. O arquivo `.env` não deve ser enviado ao GitHub.

## Endpoints — Sprint 1

| Método | Rota | O que faz | Sucesso | Erros |
|---|---|---|:---:|---|
| GET | `/tarefas` | Lista todas as tarefas | 200 | — |
| GET | `/tarefas/:id` | Busca uma tarefa pelo ID | 200 | 400 id inválido · 404 não existe |
| POST | `/tarefas` | Cadastra uma tarefa | 201 | 400 dados inválidos |
| PUT | `/tarefas/:id` | Substitui os dados da tarefa | 200 | 400 dados inválidos · 404 não existe |
| PATCH | `/tarefas/:id` | Altera somente os campos enviados | 200 | 400 dados inválidos · 404 não existe |
| DELETE | `/tarefas/:id` | Exclui uma tarefa | 204 | 404 não existe |

### Campos da tarefa

- `titulo`: texto obrigatório.
- `prioridade`: `baixa`, `media` ou `alta`.
- `status`: `a_fazer`, `fazendo` ou `feita`.

### Bônus B1 — Filtros

- `GET /tarefas?status=fazendo`: retorna somente tarefas com esse status.
- `GET /tarefas?prioridade=alta`: retorna somente tarefas com essa prioridade.

## Diagrama de classes

![Diagrama de classes](docs/diagrama-classes.png)

## Acompanhamento do Sprint 1

**Quadro usado:** GitHub Projects.

O quadro deve conter os cartões H01 a H06 nas colunas Todo, In Progress e Done, conforme o andamento real.

Salve as capturas do quadro em:

- Início: `docs/sprint1-inicio.png`
- Fim: `docs/sprint1-fim.png`

**Placar do Sprint 1:** 14 de 14 testes aprovados.

**Placar do bônus:** 2 de 5 testes aprovados (B1 — filtros por status e prioridade). Os outros testes de bônus pertencem a etapas posteriores e não fazem parte do Sprint 1.

## Estrutura principal

```text
src/
├── config/
│   └── db.js
├── controllers/
│   └── tarefaController.js
├── database/
│   └── todo.sql
├── middlewares/
│   ├── logger.js
│   ├── rotaNaoEncontrada.js
│   ├── tratarErros.js
│   └── validarId.js
├── routes/
│   ├── index.js
│   └── tarefaRoutes.js
├── services/
│   └── tarefaService.js
└── index.js
```
