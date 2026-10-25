import { filtrarOrdenarTarefas, temTarefasConcluidas, TodoStore } from './store.js';

const store = new TodoStore();
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const emptyState = document.querySelector('#empty-state');
const totalTasks = document.querySelector('#total-tasks');
const pendingTasks = document.querySelector('#pending-tasks');
const completedTasks = document.querySelector('#completed-tasks');
const completionPercentage = document.querySelector('#completion-percentage');
const priorityInput = document.querySelector('#todo-priority');
const deadlineInput = document.querySelector('#todo-deadline');
const searchInput = document.querySelector('#todo-search');
const sortInput = document.querySelector('#todo-sort');
const filterButtons = document.querySelectorAll('[data-status-filter]');
const clearCompletedButton = document.querySelector('#clear-completed');
const toggleAllCheckbox = document.querySelector('#toggle-all-tasks');
const toggleAllLabel = document.querySelector('#toggle-all-label');
let tarefaEmEdicao = null;
let filtroStatus = 'todas';

function render() {
  const tarefas = store.listar();
  const tarefasVisiveis = filtrarOrdenarTarefas(tarefas, {
    busca: searchInput.value,
    status: filtroStatus,
    ordenacao: sortInput.value,
  });
  const estatisticas = store.estatisticas();
  list.replaceChildren();
  emptyState.hidden = tarefasVisiveis.length > 0;
  emptyState.textContent = tarefas.length === 0
    ? 'Nenhuma tarefa ainda. Comece com um critério claro.'
    : 'Nenhuma tarefa corresponde à busca ou ao filtro.';
  for (const button of filterButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.statusFilter === filtroStatus));
  }
  totalTasks.textContent = estatisticas.total;
  pendingTasks.textContent = estatisticas.pendentes;
  completedTasks.textContent = estatisticas.concluidas;
  completionPercentage.textContent = `${estatisticas.percentualConclusao}%`;
  clearCompletedButton.hidden = !temTarefasConcluidas(tarefas);
  toggleAllCheckbox.disabled = tarefas.length === 0;
  toggleAllCheckbox.checked = tarefas.length > 0 && estatisticas.concluidas === tarefas.length;
  toggleAllCheckbox.indeterminate = estatisticas.concluidas > 0
    && estatisticas.concluidas < tarefas.length;
  const todasConcluidas = tarefas.length > 0 && estatisticas.concluidas === tarefas.length;
  toggleAllLabel.textContent = todasConcluidas ? 'Desmarcar todas' : 'Marcar todas';
  toggleAllCheckbox.setAttribute(
    'aria-label',
    todasConcluidas ? 'Desmarcar todas as tarefas' : 'Marcar todas as tarefas',
  );

  for (const tarefa of tarefasVisiveis) {
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

      const prioridadeEditor = document.createElement('select');
      prioridadeEditor.className = 'todo-editor';
      prioridadeEditor.setAttribute('aria-label', `Prioridade de ${tarefa.titulo}`);
      const prioridades = [
        { valor: 'alta', rotulo: 'Alta' },
        { valor: 'media', rotulo: 'Média' },
        { valor: 'baixa', rotulo: 'Baixa' },
      ];
      for (const prioridade of prioridades) {
        const option = document.createElement('option');
        option.value = prioridade.valor;
        option.textContent = prioridade.rotulo;
        option.selected = prioridade.valor === tarefa.prioridade;
        prioridadeEditor.append(option);
      }

      const prazoEditor = document.createElement('input');
      prazoEditor.type = 'date';
      prazoEditor.value = tarefa.prazo ?? '';
      prazoEditor.required = true;
      prazoEditor.className = 'todo-editor';
      prazoEditor.setAttribute('aria-label', `Prazo de ${tarefa.titulo}`);

      const camposEdicao = document.createElement('div');
      camposEdicao.className = 'todo-edit-fields';
      camposEdicao.append(editor, prioridadeEditor, prazoEditor);

      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const save = document.createElement('button');
      save.type = 'button';
      save.className = 'edit';
      save.textContent = 'Salvar';
      save.addEventListener('click', () => {
        const salvo = store.editarDetalhes(
          tarefa.id,
          editor.value,
          prioridadeEditor.value,
          prazoEditor.value,
        );
        if (!salvo) return;
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

      for (const campo of [editor, prioridadeEditor, prazoEditor]) {
        campo.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') save.click();
          if (event.key === 'Escape') cancel.click();
        });
      }

      actions.append(save, cancel);
      item.append(checkbox, camposEdicao, actions);
      list.append(item);
      editor.focus();
      continue;
    }

    const title = document.createElement('span');
    title.textContent = tarefa.titulo;
    const priority = document.createElement('small');
    const priorityLabels = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };
    const prazoLabel = tarefa.prazo
      ? ` · Prazo: ${formatarPrazo(tarefa.prazo)}`
      : ' · Prazo não definido';
    priority.textContent = ` · Prioridade: ${priorityLabels[tarefa.prioridade]}${prazoLabel}`;
    title.append(priority);

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
      const confirmou = globalThis.confirm(`Deseja excluir a tarefa "${tarefa.titulo}"?`);
      if (!confirmou) return;
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
  const tarefa = store.adicionarComPrioridadeEPrazo(
    input.value,
    priorityInput.value,
    deadlineInput.value,
  );
  if (!tarefa) {
    if (!input.value.trim()) input.focus();
    else deadlineInput.focus();
    return;
  }
  input.value = '';
  deadlineInput.value = '';
  input.focus();
  render();
});

searchInput.addEventListener('input', render);
sortInput.addEventListener('change', render);

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    filtroStatus = button.dataset.statusFilter;
    render();
  });
}

clearCompletedButton.addEventListener('click', () => {
  const quantidade = store.estatisticas().concluidas;
  if (quantidade === 0) return;

  const descricaoTarefas = quantidade === 1 ? 'tarefa concluída' : 'tarefas concluídas';
  const confirmou = globalThis.confirm(
    `Deseja excluir ${quantidade} ${descricaoTarefas}?`,
  );
  if (!confirmou) return;

  store.limparConcluidas();
  render();
});

toggleAllCheckbox.addEventListener('change', () => {
  store.alternarTodas();
  render();
});

function formatarPrazo(prazo) {
  const [ano, mes, dia] = prazo.split('-');
  return `${dia}/${mes}/${ano}`;
}

render();
