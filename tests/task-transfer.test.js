import assert from 'node:assert/strict';
import test from 'node:test';
import { TodoStore } from '../src/store.js';

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

export function executarTesteUnitarioImportacaoExportacao() {
  const armazenamento = criarArmazenamento([
    {
      id: 'existente',
      titulo: 'Tarefa que deve ser preservada em caso de erro',
      concluida: false,
      prioridade: 'alta',
      prazo: '2026-11-20',
    },
  ]);
  const store = new TodoStore(armazenamento);
  const tarefasImportadas = [
    {
      id: 'nova-1',
      titulo: '  Preparar entrega  ',
      concluida: false,
      prioridade: 'alta',
      prazo: '2026-12-01',
    },
    {
      id: 'nova-2',
      titulo: 'Revisar critérios',
      concluida: true,
      prioridade: 'baixa',
      prazo: null,
    },
  ];

  store.importar(JSON.stringify(tarefasImportadas));
  assert.deepEqual(store.listar(), [
    { ...tarefasImportadas[0], titulo: 'Preparar entrega' },
    tarefasImportadas[1],
  ]);
  assert.deepEqual(armazenamento.lerTarefas(), store.listar());
  assert.deepEqual(JSON.parse(store.exportar()), store.listar());
  const estadoImportado = store.listar();
  const estadoPersistido = armazenamento.lerTarefas();

  const conteudosInvalidos = [
    'arquivo não JSON',
    '{"tarefas":[]}',
    '[null]',
    '[{"id":"sem-titulo","concluida":false}]',
    '[{"id":"sem-status","titulo":"Tarefa"}]',
    '[{"id":"prioridade-inválida","titulo":"Tarefa","concluida":false,"prioridade":"urgente"}]',
    '[{"id":"prazo-inválido","titulo":"Tarefa","concluida":false,"prazo":"2026-02-30"}]',
    '[{"id":"duplicado","titulo":"Um","concluida":false},{"id":"duplicado","titulo":"Dois","concluida":true}]',
  ];
  for (const conteudoInvalido of conteudosInvalidos) {
    assert.throws(() => store.importar(conteudoInvalido), Error);
    assert.deepEqual(store.listar(), estadoImportado);
    assert.deepEqual(armazenamento.lerTarefas(), estadoPersistido);
  }
  assert.throws(() => store.importar(null), Error);
  assert.deepEqual(store.listar(), estadoImportado);
  assert.deepEqual(armazenamento.lerTarefas(), estadoPersistido);

  assert.deepEqual(JSON.parse(store.exportar()), store.listar());
  store.importar('[]');
  assert.deepEqual(store.listar(), []);
  assert.deepEqual(armazenamento.lerTarefas(), []);
  assert.deepEqual(JSON.parse(store.exportar()), []);
}

test('importa e exporta tarefas e rejeita dados inválidos sem substituir a fila', () => {
  executarTesteUnitarioImportacaoExportacao();
});
