const DURACAO_PADRAO_TOAST = 2800;

function normalizarMensagem(mensagem) {
  return typeof mensagem === 'string' ? mensagem.trim() : '';
}

export function criarContainerToast() {
  if (typeof document === 'undefined') return null;

  let container = document.querySelector('#toast-container');
  if (container) return container;

  const novoContainer = document.createElement('div');
  novoContainer.id = 'toast-container';
  novoContainer.setAttribute('aria-live', 'polite');
  novoContainer.setAttribute('aria-atomic', 'true');
  document.body?.appendChild(novoContainer);
  return novoContainer;
}

export function mostrarToast(mensagem, { container = null, duracao = DURACAO_PADRAO_TOAST } = {}) {
  const texto = normalizarMensagem(mensagem);
  if (!texto) return null;

  const destino = container ?? criarContainerToast();
  if (!destino || typeof document === 'undefined') return null;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = texto;

  destino.appendChild(toast);

  globalThis.setTimeout(() => {
    toast.classList?.add?.('toast--hidden');
    globalThis.setTimeout(() => {
      toast.remove?.();
    }, 220);
  }, duracao);

  return toast;
}

export function mostrarToastAdicao() {
  return mostrarToast('Tarefa adicionada com sucesso!');
}

export function mostrarToastConclusao() {
  return mostrarToast('Tarefa concluída!');
}

export function mostrarToastExclusao() {
  return mostrarToast('Tarefa excluída com sucesso!');
}
