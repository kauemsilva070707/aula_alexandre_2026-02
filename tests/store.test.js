import assert from 'node:assert/strict';
import test from 'node:test';
import { calcularEstatisticas } from '../src/store.js';

function executarTesteUnitario(tarefas, esperado) {
  assert.deepEqual(calcularEstatisticas(tarefas), esperado);
}

test('calcula estatísticas para tarefas pendentes e concluídas', () => {
  executarTesteUnitario(
    [{ concluida: false }, { concluida: false }, { concluida: true }],
    { total: 3, pendentes: 2, concluidas: 1, percentualConclusao: 33 },
  );
});

test('calcula estatísticas para uma tarefa pendente', () => {
  executarTesteUnitario(
    [{ concluida: false }],
    { total: 1, pendentes: 1, concluidas: 0, percentualConclusao: 0 },
  );
});

test('calcula estatísticas para uma lista vazia sem divisão por zero', () => {
  executarTesteUnitario(
    [],
    { total: 0, pendentes: 0, concluidas: 0, percentualConclusao: 0 },
  );
});

test('calcula 100% quando todas as tarefas estão concluídas', () => {
  executarTesteUnitario(
    [{ concluida: true }, { concluida: true }],
    { total: 2, pendentes: 0, concluidas: 2, percentualConclusao: 100 },
  );
});

test('arredonda o percentual para o inteiro mais próximo', () => {
  executarTesteUnitario(
    [{ concluida: true }, { concluida: true }, { concluida: false }],
    { total: 3, pendentes: 1, concluidas: 2, percentualConclusao: 67 },
  );
});
