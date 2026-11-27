# API de Tarefas

**Aluno(a):** Luis Miguel Pereira da Silva

API de gerenciamento de tarefas desenvolvida com Node.js, Express e MySQL, seguindo o padrão MVC.

## Como executar

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para um arquivo chamado `.env` e configure os dados do seu MySQL.
3. Abra `src/database/todo.sql` no MySQL Workbench e execute o script completo.
4. Inicie a API com `npm run dev`.
5. Em outro terminal, execute os testes com `npm run conferir`.

A API usa a porta 3000 por padrão. O arquivo `.env` não deve ser enviado ao GitHub.

## Endpoints

### Tarefas

| Método | Rota | O que faz | Sucesso | Erros |
|---|---|---|:---:|---|
| GET | `/tarefas` | Lista todas as tarefas | 200 | — |
| GET | `/tarefas/:id` | Busca uma tarefa pelo ID | 200 | 400 id inválido · 404 não existe |
| POST | `/tarefas` | Cadastra uma tarefa | 201 | 400 dados inválidos ou categoria inexistente |
| PUT | `/tarefas/:id` | Substitui os dados de uma tarefa | 200 | 400 dados inválidos · 404 não existe |
| PATCH | `/tarefas/:id` | Altera somente os campos enviados | 200 | 400 dados inválidos · 404 não existe |
| DELETE | `/tarefas/:id` | Exclui uma tarefa | 204 | 404 não existe |

Campos obrigatórios para criar ou substituir uma tarefa: `titulo`, `prioridade` e `status`.

Valores aceitos para prioridade: `baixa`, `media` e `alta`.

Valores aceitos para status: `a_fazer`, `fazendo` e `feita`.

O campo opcional `categoria_id` relaciona a tarefa a uma categoria existente. As respostas das tarefas também apresentam o campo `categoria`, com o nome obtido pelo relacionamento entre as tabelas.

### Categorias

| Método | Rota | O que faz | Sucesso | Erros |
|---|---|---|:---:|---|
| GET | `/categorias` | Lista as categorias | 200 | — |
| GET | `/categorias/:id` | Busca uma categoria pelo ID | 200 | 400 id inválido · 404 não existe |
| POST | `/categorias` | Cadastra uma categoria | 201 | 400 sem nome |
| DELETE | `/categorias/:id` | Exclui uma categoria sem tarefas vinculadas | 204 | 404 não existe · 409 possui tarefas |
| PUT | `/categorias/:id` | Altera o nome da categoria | 200 | 400 sem nome · 404 não existe |
| PATCH | `/categorias/:id` | Altera parcialmente a categoria | 200 | 400 nome inválido · 404 não existe |

O campo obrigatório para cadastrar uma categoria é `nome`. Uma categoria que possui tarefas vinculadas não pode ser excluída e responde com status 409.

### Filtros opcionais

- `GET /tarefas?status=fazendo`: retorna somente tarefas com esse status.
- `GET /tarefas?prioridade=alta`: retorna somente tarefas com essa prioridade.

### Formato dos erros

As respostas de erro usam um objeto com a propriedade `erro`. Exemplo:

```json
{
  "erro": "O titulo e obrigatorio"
}
```

Um corpo com JSON mal escrito responde com status 400.

## Diagrama de classes

![Diagrama de classes da API](docs/diagrama-classes.png)

O diagrama apresenta as classes Tarefa e Categoria. Uma categoria pode estar relacionada a várias tarefas, e uma tarefa pode ter uma categoria.

## Acompanhamento do projeto

**Quadro utilizado:** GitHub Projects.

### Sprint 1 — Tarefas

O print inicial do quadro está em `docs/sprint1-inicio.png`. Depois de atualizar o quadro com o andamento real das histórias, salve a captura final em `docs/sprint1-fim.png`.

**Placar:** execute `npm run conferir` com o banco recriado e registre aqui os resultados reais do Sprint 1 e dos bônus da primeira sprint.

### Sprint 2 — Categorias e relacionamento

Salve as capturas do quadro no início e no fim da sprint como `docs/sprint2-inicio.png` e `docs/sprint2-fim.png`.

**Placar:** execute `npm run conferir` com o banco recriado e registre aqui os resultados reais do Sprint 2 e dos bônus.

### Reflexão final

- **O que aprendi:** Aprendi a organizar uma API no padrão MVC, separando rotas, controllers e services. Também pratiquei operações CRUD, consultas SQL, validações e o relacionamento entre tabelas com JOIN.
- **O que foi mais difícil:** A parte mais trabalhosa foi manter as atualizações corretas, principalmente no PATCH, e tratar os casos em que uma categoria não pode ser excluída porque possui tarefas relacionadas.
- **O que eu faria diferente:** Eu organizaria os testes e o quadro desde o início, avançando uma história por vez e conferindo cada alteração antes de seguir para a próxima.

## Estrutura principal

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── categoriaController.js
│   └── tarefaController.js
├── database/
│   └── todo.sql
├── middlewares/
│   ├── logger.js
│   ├── rotaNaoEncontrada.js
│   ├── tratarErros.js
│   └── validarId.js
├── routes/
│   ├── categoriaRoutes.js
│   ├── index.js
│   └── tarefaRoutes.js
├── services/
│   ├── categoriaService.js
│   └── tarefaService.js
└── index.js
```
