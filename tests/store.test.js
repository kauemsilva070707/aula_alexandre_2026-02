import assert from 'node:assert/strict';
import test from 'node:test';
import { calcularEstatisticas, TodoStore } from '../src/store.js';

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

test('normaliza e persiste títulos antigos ao carregar tarefas', () => {
  const armazenamento = criarArmazenamento([
    { id: '1', titulo: '  tarefa antiga  ', concluida: false },
  ]);

  const store = new TodoStore(armazenamento);

  assert.equal(store.listar()[0].titulo, 'tarefa antiga');
  assert.equal(armazenamento.lerTarefas()[0].titulo, 'tarefa antiga');
});
