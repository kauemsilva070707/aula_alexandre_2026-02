import { TodoStore } from './store.js';

const store = new TodoStore();
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const emptyState = document.querySelector('#empty-state');
const totalTasks = document.querySelector('#total-tasks');
const pendingTasks = document.querySelector('#pending-tasks');
const completedTasks = document.querySelector('#completed-tasks');
const completionPercentage = document.querySelector('#completion-percentage');
let tarefaEmEdicao = null;

function render() {
  const tarefas = store.listar();
  const estatisticas = store.estatisticas();
  list.replaceChildren();
  emptyState.hidden = tarefas.length > 0;
  totalTasks.textContent = estatisticas.total;
  pendingTasks.textContent = estatisticas.pendentes;
  completedTasks.textContent = estatisticas.concluidas;
  completionPercentage.textContent = `${estatisticas.percentualConclusao}%`;

  for (const tarefa of tarefas) {
    const item = document.createElement('li');
    item.className = `todo ${tarefa.concluida ? 'todo--done' : ''}`;
    item.dataset.id = tarefa.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida;
    checkbox.setAttribute('aria-label', `Marcar ${tarefa.titulo} como concluída`);
    checkbox.addEventListener('change', () => {
      store.alternar(tarefa.id);
      render();
    });

    if (tarefaEmEdicao === tarefa.id) {
      const editor = document.createElement('input');
      editor.type = 'text';
      editor.value = tarefa.titulo.trim();
      editor.required = true;
      editor.className = 'todo-editor';
      editor.setAttribute('aria-label', `Editar tarefa ${tarefa.titulo}`);

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const save = document.createElement('button');
      save.type = 'button';
      save.className = 'edit';
      save.textContent = 'Salvar';
      save.addEventListener('click', () => {
        const tituloLimpo = editor.value.trim();
        if (!tituloLimpo) return;
        store.editar(tarefa.id, tituloLimpo);
        tarefaEmEdicao = null;
        render();
      });

      const cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.className = 'remove';
      cancel.textContent = 'Cancelar';
      cancel.addEventListener('click', () => {
        tarefaEmEdicao = null;
        render();
      });

      editor.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') save.click();
        if (event.key === 'Escape') cancel.click();
      });

      actions.append(save, cancel);
      item.append(checkbox, editor, actions);
      list.append(item);
      editor.focus();
      continue;
    }

    const title = document.createElement('span');
    title.textContent = tarefa.titulo;

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'edit';
    edit.textContent = 'Editar';
    edit.setAttribute('aria-label', `Editar ${tarefa.titulo}`);
    edit.addEventListener('click', () => {
      tarefaEmEdicao = tarefa.id;
      render();
    });

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove';
    remove.textContent = 'Remover';
    remove.setAttribute('aria-label', `Remover ${tarefa.titulo}`);
    remove.addEventListener('click', () => {
      store.remover(tarefa.id);
      render();
    });

    actions.append(edit, remove);
    item.append(checkbox, title, actions);
    list.append(item);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const tarefa = store.adicionar(input.value);
  if (!tarefa) {
    input.focus();
    return;
  }
  input.value = '';
  input.focus();
  render();
});

render();
