import assert from 'node:assert/strict';
import test from 'node:test';
import { temDesvioDeEstimativa, TodoStore } from '../src/store.js';

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

export function executarTesteUnitarioTempoEstimado() {
  const armazenamentoInicial = criarArmazenamento([]);
  const store = new TodoStore(armazenamentoInicial);

  const tarefa = store.adicionarComEstimativa('Entrega', 'alta', '2026-12-10', 2.5);
  assert.equal(tarefa.tempoEstimado, 2.5);
  assert.equal(tarefa.tempoGasto, 0);
  assert.deepEqual(armazenamentoInicial.lerTarefas()[0], tarefa);

  const storeSemEstimativa = new TodoStore(null);
  assert.equal(
    storeSemEstimativa.adicionarComEstimativa('Sem estimativa', 'media', '2026-12-10').tempoEstimado,
    null,
  );
  assert.equal(
    storeSemEstimativa.adicionarComEstimativa('Sem esforço', 'media', '2026-12-10', 0).tempoEstimado,
    0,
  );

  for (const tempo of [-1, '2', Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(store.adicionarComEstimativa('Inválida', 'media', '2026-12-10', tempo), null);
  }
  assert.equal(store.adicionarComEstimativa('Sem prazo', 'media', '', 1), null);
  assert.equal(store.listar().length, 1);

  const armazenamentoEdicao = criarArmazenamento([]);
  const storeParaEditar = new TodoStore(armazenamentoEdicao);
  const tarefaParaEditar = storeParaEditar.adicionarComEstimativa(
    'Entrega',
    'media',
    '2026-12-10',
    3,
  );

  assert.equal(
    storeParaEditar.editarDetalhesComTempoGasto(
      tarefaParaEditar.id,
      'Entrega final',
      'alta',
      '2026-12-11',
      4.5,
    ),
    true,
  );
  assert.equal(storeParaEditar.listar()[0].tempoGasto, 4.5);
  assert.deepEqual(armazenamentoEdicao.lerTarefas()[0], storeParaEditar.listar()[0]);

  for (const tempo of [-1, '4', Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(
      storeParaEditar.editarDetalhesComTempoGasto(
        tarefaParaEditar.id,
        'Alterada',
        'baixa',
        '2026-12-12',
        tempo,
      ),
      false,
    );
  }
  assert.equal(
    storeParaEditar.editarDetalhesComTempoGasto(
      'inexistente',
      'Alterada',
      'baixa',
      '2026-12-12',
      1,
    ),
    false,
  );
  assert.deepEqual(
    {
      titulo: storeParaEditar.listar()[0].titulo,
      prioridade: storeParaEditar.listar()[0].prioridade,
      prazo: storeParaEditar.listar()[0].prazo,
      tempoGasto: storeParaEditar.listar()[0].tempoGasto,
    },
    {
      titulo: 'Entrega final',
      prioridade: 'alta',
      prazo: '2026-12-11',
      tempoGasto: 4.5,
    },
  );

  assert.equal(temDesvioDeEstimativa({ tempoEstimado: 2, tempoGasto: 2 }), false);
  assert.equal(temDesvioDeEstimativa({ tempoEstimado: 2, tempoGasto: 2.1 }), true);
  assert.equal(temDesvioDeEstimativa({ tempoEstimado: null, tempoGasto: 5 }), false);

  const armazenamentoImportacao = criarArmazenamento([]);
  const storeParaImportar = new TodoStore(armazenamentoImportacao);
  const existente = storeParaImportar.adicionarComEstimativa(
    'Existente',
    'media',
    '2026-12-10',
    2,
  );

  for (const extras of [
    { tempoEstimado: -1 },
    { tempoEstimado: '2' },
    { tempoGasto: -1 },
    { tempoGasto: Number.NaN },
  ]) {
    assert.throws(() => storeParaImportar.importar(JSON.stringify([{
      id: 'importada',
      titulo: 'Importada',
      concluida: false,
      ...extras,
    }])));
    assert.deepEqual(storeParaImportar.listar(), [existente]);
  }

  const armazenamentoLegado = criarArmazenamento([{
    id: 'antiga',
    titulo: 'Tarefa legada',
    concluida: false,
    prioridade: 'media',
    prazo: null,
  }]);

  const tarefaLegada = new TodoStore(armazenamentoLegado).listar()[0];
  assert.equal(tarefaLegada.tempoEstimado, null);
  assert.equal(tarefaLegada.tempoGasto, 0);
  assert.equal(armazenamentoLegado.lerTarefas()[0].tempoGasto, 0);
}

test('executa isoladamente os cenários e casos de borda de tempo estimado e gasto', () => {
  executarTesteUnitarioTempoEstimado();
});
