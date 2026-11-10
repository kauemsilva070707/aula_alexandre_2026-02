import assert from 'node:assert/strict';
import test from 'node:test';
import {
  criarContainerToast,
  mostrarToast,
  mostrarToastAdicao,
  mostrarToastConclusao,
  mostrarToastExclusao,
} from '../src/toast.js';

function criarDocumentoFake() {
  const criarElemento = (tagName = 'div') => ({
    tagName: tagName.toUpperCase(),
    id: '',
    className: '',
    textContent: '',
    attributes: {},
    children: [],
    setAttribute(chave, valor) {
      this.attributes[chave] = valor;
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    remove() {
      this.removido = true;
    },
    classList: {
      add() {},
    },
  });

  const body = criarElemento('body');
  return {
    body,
    createElement: (tagName) => criarElemento(tagName),
    querySelector(selector) {
      if (selector === '#toast-container') {
        return body.children.find((child) => child.id === 'toast-container') ?? null;
      }
      return null;
    },
  };
}

function executarTesteToast() {
  const originalDocument = globalThis.document;
  const originalSetTimeout = globalThis.setTimeout;
  const documentFake = criarDocumentoFake();
  const agendamentos = [];

  try {
    globalThis.document = documentFake;
    globalThis.setTimeout = (callback) => {
      agendamentos.push(callback);
      return agendamentos.length;
    };

    const container = criarContainerToast();
    assert.equal(container.id, 'toast-container');
    assert.equal(documentFake.body.children.length, 1);

    const toastAdicao = mostrarToastAdicao();
    assert.equal(toastAdicao.textContent, 'Tarefa adicionada com sucesso!');
    assert.equal(container.children.length, 1);
    assert.equal(container.children[0].textContent, 'Tarefa adicionada com sucesso!');

    const toastConclusao = mostrarToastConclusao();
    assert.equal(toastConclusao.textContent, 'Tarefa concluída!');

    const toastExclusao = mostrarToastExclusao();
    assert.equal(toastExclusao.textContent, 'Tarefa excluída com sucesso!');

    assert.equal(mostrarToast('   '), null);
    assert.equal(mostrarToast(''), null);
    assert.equal(agendamentos.length, 3);
  } finally {
    globalThis.document = originalDocument;
    globalThis.setTimeout = originalSetTimeout;
  }
}

test('toast confirma adição, conclusão e exclusão e ignora mensagens vazias', () => {
  executarTesteToast();
});
