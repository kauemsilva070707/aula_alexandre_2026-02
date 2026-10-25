import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calcularEstatisticas,
  filtrarOrdenarTarefas,
  temTarefasConcluidas,
  TodoStore,
} from '../src/store.js';

function verificarEstatisticas(tarefas, esperado) {
  assert.deepEqual(calcularEstatisticas(tarefas), esperado);
}

function criarStoreParaTeste() {
  return new TodoStore(null);
}

function criarArmazenamento(tarefas) {
  let conteudo = JSON.stringify(tarefas);

  return {
    getItem() {
      return conteudo;
    },
    setItem(chave, valor) {
      conteudo = valor;
    },
    lerTarefas() {
      return JSON.parse(conteudo);
    },
  };
}

test('calcula estatísticas para tarefas pendentes e concluídas', () => {
  verificarEstatisticas(
    [{ concluida: false }, { concluida: false }, { concluida: true }],
    { total: 3, pendentes: 2, concluidas: 1, percentualConclusao: 33 },
  );
});

test('calcula estatísticas para uma tarefa pendente', () => {
  verificarEstatisticas(
    [{ concluida: false }],
    { total: 1, pendentes: 1, concluidas: 0, percentualConclusao: 0 },
  );
});

test('calcula estatísticas para uma lista vazia sem divisão por zero', () => {
  verificarEstatisticas(
    [],
    { total: 0, pendentes: 0, concluidas: 0, percentualConclusao: 0 },
  );
});

test('calcula 100% quando todas as tarefas estão concluídas', () => {
  verificarEstatisticas(
    [{ concluida: true }, { concluida: true }],
    { total: 2, pendentes: 0, concluidas: 2, percentualConclusao: 100 },
  );
});

test('arredonda o percentual para o inteiro mais próximo', () => {
  verificarEstatisticas(
    [{ concluida: true }, { concluida: true }, { concluida: false }],
    { total: 3, pendentes: 1, concluidas: 2, percentualConclusao: 67 },
  );
});

test('ignora cadastro vazio ou composto apenas por espaços e tabulações', () => {
  const store = criarStoreParaTeste();

  assert.equal(store.adicionar(''), null);
  assert.equal(store.adicionar('   \t\t  '), null);
  assert.deepEqual(store.listar(), []);
});

test('remove espaços extras no início, no fim e no meio ao cadastrar uma tarefa', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);

  const tarefa = store.adicionar('  limpar        mesa      ');

  assert.equal(tarefa.titulo, 'limpar mesa');
  assert.equal(store.listar().length, 1);
  assert.equal(armazenamento.lerTarefas()[0].titulo, 'limpar mesa');
});

test('recusa edição vazia ou composta apenas por espaços e preserva o título original', () => {
  const store = criarStoreParaTeste();
  const tarefa = store.adicionar('título original');

  store.editar(tarefa.id, '');
  store.editar(tarefa.id, '  \t\t ');

  assert.equal(store.listar()[0].titulo, 'título original');
});

test('remove espaços extras no início, no fim e no meio ao editar uma tarefa', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);
  const tarefa = store.adicionar('rascunho');

  store.editar(tarefa.id, '  estudar        Git      ');

  assert.equal(store.listar()[0].titulo, 'estudar Git');
  assert.equal(armazenamento.lerTarefas()[0].titulo, 'estudar Git');
});

test('permite editar título, prioridade e prazo e persiste os três valores', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);
  const tarefa = store.adicionarComPrioridadeEPrazo('Rascunho', 'baixa', '2026-12-10');

  assert.equal(
    store.editarDetalhes(tarefa.id, '  Entrega final  ', 'alta', '2026-12-01'),
    true,
  );
  assert.deepEqual(
    {
      titulo: store.listar()[0].titulo,
      prioridade: store.listar()[0].prioridade,
      prazo: store.listar()[0].prazo,
    },
    { titulo: 'Entrega final', prioridade: 'alta', prazo: '2026-12-01' },
  );
  assert.deepEqual(
    {
      titulo: armazenamento.lerTarefas()[0].titulo,
      prioridade: armazenamento.lerTarefas()[0].prioridade,
      prazo: armazenamento.lerTarefas()[0].prazo,
    },
    { titulo: 'Entrega final', prioridade: 'alta', prazo: '2026-12-01' },
  );
});

test('recusa edição com título vazio, prioridade inválida ou prazo inválido', () => {
  const store = criarStoreParaTeste();
  const tarefa = store.adicionarComPrioridadeEPrazo('Original', 'media', '2026-12-10');

  assert.equal(store.editarDetalhes(tarefa.id, ' ', 'alta', '2026-12-01'), false);
  assert.equal(store.editarDetalhes(tarefa.id, 'Alterada', 'urgente', '2026-12-01'), false);
  assert.equal(store.editarDetalhes(tarefa.id, 'Alterada', 'alta', '2026-02-30'), false);
  assert.deepEqual(
    {
      titulo: store.listar()[0].titulo,
      prioridade: store.listar()[0].prioridade,
      prazo: store.listar()[0].prazo,
    },
    { titulo: 'Original', prioridade: 'media', prazo: '2026-12-10' },
  );
});

test('limpa tarefas concluídas e mantém tarefas pendentes', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);
  const pendente1 = store.adicionar('Pendente 1');
  const concluida1 = store.adicionar('Concluída 1');
  const pendente2 = store.adicionar('Pendente 2');
  const concluida2 = store.adicionar('Concluída 2');
  store.alternar(concluida1.id);
  store.alternar(concluida2.id);

  assert.equal(store.limparConcluidas(), 2);
  assert.deepEqual(
    store.listar().map((tarefa) => tarefa.id),
    [pendente1.id, pendente2.id],
  );
  assert.deepEqual(
    armazenamento.lerTarefas().map((tarefa) => tarefa.id),
    [pendente1.id, pendente2.id],
  );
});

test('limpa a lista inteira quando todas as tarefas estão concluídas', () => {
  const store = criarStoreParaTeste();
  const tarefa1 = store.adicionar('Concluída 1');
  const tarefa2 = store.adicionar('Concluída 2');
  store.alternar(tarefa1.id);
  store.alternar(tarefa2.id);

  assert.equal(store.limparConcluidas(), 2);
  assert.deepEqual(store.listar(), []);
});

test('não altera a lista quando não há tarefas concluídas', () => {
  const store = criarStoreParaTeste();
  const tarefa = store.adicionar('Pendente');

  assert.equal(store.limparConcluidas(), 0);
  assert.deepEqual(store.listar(), [tarefa]);
});

test('só indica que o botão deve aparecer quando há tarefas concluídas', () => {
  assert.equal(temTarefasConcluidas([]), false);
  assert.equal(temTarefasConcluidas([{ concluida: false }]), false);
  assert.equal(temTarefasConcluidas([{ concluida: true }]), true);
});

test('marca todas as tarefas como concluídas quando há tarefas pendentes', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);
  const tarefas = [
    store.adicionar('Pendente 1'),
    store.adicionar('Já concluída'),
    store.adicionar('Pendente 2'),
  ];
  store.alternar(tarefas[1].id);

  store.alternarTodas();

  assert.ok(store.listar().every((tarefa) => tarefa.concluida));
  assert.ok(armazenamento.lerTarefas().every((tarefa) => tarefa.concluida));
});

test('desmarca todas as tarefas quando todas já estão concluídas', () => {
  const store = criarStoreParaTeste();
  const tarefas = [store.adicionar('Tarefa 1'), store.adicionar('Tarefa 2')];
  for (const tarefa of tarefas) store.alternar(tarefa.id);

  store.alternarTodas();

  assert.ok(store.listar().every((tarefa) => !tarefa.concluida));
});

test('não altera nem cria tarefas ao alternar uma lista vazia', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);

  store.alternarTodas();

  assert.deepEqual(store.listar(), []);
  assert.deepEqual(armazenamento.lerTarefas(), []);
});

test('remove apenas a tarefa selecionada entre tarefas com nomes duplicados', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);
  const primeira = store.adicionar('Mesmo nome');
  const segunda = store.adicionar('Mesmo nome');
  const terceira = store.adicionar('Outra tarefa');
  store.alternar(segunda.id);

  store.remover(segunda.id);

  assert.deepEqual(
    store.listar().map(({ id, concluida }) => ({ id, concluida })),
    [
      { id: primeira.id, concluida: false },
      { id: terceira.id, concluida: false },
    ],
  );
  assert.deepEqual(
    armazenamento.lerTarefas().map((tarefa) => tarefa.id),
    [primeira.id, terceira.id],
  );
});

test('não altera nem persiste alterações para identificador inexistente', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);
  const tarefa = store.adicionar('Preservada');
  const antes = armazenamento.lerTarefas();

  store.remover('id-inexistente');

  assert.deepEqual(store.listar(), [tarefa]);
  assert.deepEqual(armazenamento.lerTarefas(), antes);
});

test('normaliza e persiste títulos antigos ao carregar tarefas', () => {
  const armazenamento = criarArmazenamento([
    {
      id: '1',
      titulo: '  tarefa antiga  ',
      concluida: false,
      criadaEm: '2026-01-01T00:00:00.000Z',
    },
  ]);

  const store = new TodoStore(armazenamento);

  assert.equal(store.listar()[0].titulo, 'tarefa antiga');
  assert.equal(store.listar()[0].prazo, null);
  assert.equal('criadaEm' in store.listar()[0], false);
  assert.equal(armazenamento.lerTarefas()[0].titulo, 'tarefa antiga');
  assert.equal('criadaEm' in armazenamento.lerTarefas()[0], false);
});

test('cadastra prioridade selecionada e prazo definido pelo usuário', () => {
  const armazenamento = criarArmazenamento([]);
  const store = new TodoStore(armazenamento);

  const tarefa = store.adicionarComPrioridadeEPrazo('Entrega', 'alta', '2026-11-20');

  assert.equal(tarefa.titulo, 'Entrega');
  assert.equal(tarefa.prioridade, 'alta');
  assert.equal(tarefa.prazo, '2026-11-20');
  assert.equal('criadaEm' in tarefa, false);
  assert.equal(armazenamento.lerTarefas()[0].prioridade, 'alta');
  assert.equal(armazenamento.lerTarefas()[0].prazo, '2026-11-20');
});

test('exige prazo válido para cadastrar tarefa com prioridade e prazo', () => {
  const store = criarStoreParaTeste();

  assert.equal(store.adicionarComPrioridadeEPrazo('Sem prazo', 'alta', ''), null);
  assert.equal(store.adicionarComPrioridadeEPrazo('Data impossível', 'alta', '2026-02-30'), null);
  assert.deepEqual(store.listar(), []);
});

test('usa prioridade média para valores de prioridade inválidos ou ausentes', () => {
  const store = criarStoreParaTeste();

  assert.equal(store.adicionar('Sem prioridade').prioridade, 'media');
  assert.equal(store.adicionarComPrioridade('Prioridade inválida', 'urgente').prioridade, 'media');
});

test('busca tarefas pelo título sem diferenciar maiúsculas e minúsculas', () => {
  const tarefas = [
    { titulo: 'Limpar mesa', concluida: false, prioridade: 'media', prazo: '2026-01-01' },
    { titulo: 'Estudar Git', concluida: false, prioridade: 'alta', prazo: '2026-01-02' },
  ];

  assert.deepEqual(
    filtrarOrdenarTarefas(tarefas, { busca: 'LIMPAR' }).map((tarefa) => tarefa.titulo),
    ['Limpar mesa'],
  );
});

test('filtra tarefas ativas, concluídas e todas', () => {
  const tarefas = [
    { titulo: 'Ativa', concluida: false, prioridade: 'media', prazo: '2026-01-01' },
    { titulo: 'Concluída', concluida: true, prioridade: 'media', prazo: '2026-01-02' },
  ];

  assert.deepEqual(
    filtrarOrdenarTarefas(tarefas, { status: 'ativas' }).map((tarefa) => tarefa.titulo),
    ['Ativa'],
  );
  assert.deepEqual(
    filtrarOrdenarTarefas(tarefas, { status: 'concluidas' }).map((tarefa) => tarefa.titulo),
    ['Concluída'],
  );
  assert.equal(filtrarOrdenarTarefas(tarefas, { status: 'todas' }).length, 2);
});

test('ordena tarefas por prioridade e por prazo mais próximo', () => {
  const tarefas = [
    { titulo: 'Baixa distante', concluida: false, prioridade: 'baixa', prazo: '2026-01-03' },
    { titulo: 'Alta próxima', concluida: false, prioridade: 'alta', prazo: '2026-01-01' },
    { titulo: 'Média', concluida: false, prioridade: 'media', prazo: '2026-01-02' },
  ];

  assert.deepEqual(
    filtrarOrdenarTarefas(tarefas, { ordenacao: 'prioridade' }).map((tarefa) => tarefa.titulo),
    ['Alta próxima', 'Média', 'Baixa distante'],
  );
  assert.deepEqual(
    filtrarOrdenarTarefas(tarefas, { ordenacao: 'data' }).map((tarefa) => tarefa.titulo),
    ['Alta próxima', 'Média', 'Baixa distante'],
  );
});

test('ordena tarefas sem prazo no final', () => {
  const tarefas = [
    { titulo: 'Sem prazo', concluida: false, prioridade: 'media', prazo: null },
    { titulo: 'Com prazo', concluida: false, prioridade: 'media', prazo: '2026-01-01' },
  ];

  assert.deepEqual(
    filtrarOrdenarTarefas(tarefas, { ordenacao: 'data' }).map((tarefa) => tarefa.titulo),
    ['Com prazo', 'Sem prazo'],
  );
});

test('retorna lista vazia com segurança quando busca ou filtro não encontra tarefas', () => {
  const tarefas = [
    { titulo: 'Ativa', concluida: false, prioridade: 'media', prazo: '2026-01-01' },
  ];

  assert.deepEqual(filtrarOrdenarTarefas(tarefas, { busca: 'inexistente' }), []);
  assert.deepEqual(filtrarOrdenarTarefas(tarefas, { status: 'concluidas' }), []);
  assert.deepEqual(filtrarOrdenarTarefas([], {}), []);
});
