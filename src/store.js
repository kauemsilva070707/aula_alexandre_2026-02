const CHAVE = 'todolab:tarefas';

export function calcularEstatisticas(tarefas) {
  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  return {
    total,
    pendentes: total - concluidas,
    concluidas,
    percentualConclusao: total === 0 ? 0 : Math.round((concluidas / total) * 100),
  };
}

function criarTarefa(titulo) {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    titulo,
    concluida: false,
    criadaEm: new Date().toISOString(),
  };
}

function limparTitulo(titulo) {
  return typeof titulo === 'string' ? titulo.trim().replace(/\s+/g, ' ') : '';
}

export class TodoStore {
  constructor(armazenamento = globalThis.localStorage) {
    this.armazenamento = armazenamento;
    this.tarefas = this.carregar();
    const tarefasNormalizadas = this.tarefas.map((tarefa) => ({
      ...tarefa,
      titulo: limparTitulo(tarefa.titulo),
    }));

    if (tarefasNormalizadas.some((tarefa, indice) => tarefa.titulo !== this.tarefas[indice].titulo)) {
      this.tarefas = tarefasNormalizadas;
      this.salvar();
    }
  }

  carregar() {
    if (!this.armazenamento) return [];
    const bruto = this.armazenamento.getItem(CHAVE);
    if (!bruto) return [];
    return JSON.parse(bruto);
  }

  salvar() {
    if (!this.armazenamento) return;
    this.tarefas = this.tarefas.map((tarefa) => ({
      ...tarefa,
      titulo: limparTitulo(tarefa.titulo),
    }));
    this.armazenamento.setItem(CHAVE, JSON.stringify(this.tarefas));
  }

  listar() {
    return [...this.tarefas];
  }

  estatisticas() {
    return calcularEstatisticas(this.tarefas);
  }

  adicionar(titulo) {
    const tituloLimpo = limparTitulo(titulo);
    if (!tituloLimpo) return null;
    const tarefa = criarTarefa(tituloLimpo);
    this.tarefas.push(tarefa);
    this.salvar();
    return tarefa;
  }

  alternar(id) {
    const tarefa = this.tarefas.find((item) => item.id === id);
    if (!tarefa) return;
    tarefa.concluida = !tarefa.concluida;
    this.salvar();
  }

  editar(id, titulo) {
    const tituloLimpo = limparTitulo(titulo);
    if (!tituloLimpo) return;
    const tarefa = this.tarefas.find((item) => item.id === id);
    if (!tarefa) return;
    tarefa.titulo = tituloLimpo;
    this.salvar();
  }

  remover(id) {
    const alvo = this.tarefas.find((tarefa) => tarefa.id === id);
    if (!alvo) return;
    const indice = this.tarefas.findIndex((tarefa) => tarefa.titulo === alvo.titulo);
    this.tarefas.splice(indice, 1);
    this.salvar();
  }
}
