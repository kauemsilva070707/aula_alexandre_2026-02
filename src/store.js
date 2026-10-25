const CHAVE = 'todolab:tarefas';
const PRIORIDADES = ['alta', 'media', 'baixa'];

export function temTarefasConcluidas(tarefas) {
  return tarefas.some((tarefa) => tarefa.concluida);
}

export function filtrarOrdenarTarefas(
  tarefas,
  { busca = '', status = 'todas', ordenacao = 'data' } = {},
) {
  const termo = limparTitulo(busca).toLocaleLowerCase('pt-BR');
  const prioridadeOrdem = { alta: 0, media: 1, baixa: 2 };

  return tarefas
    .filter((tarefa) => {
      const correspondeBusca = tarefa.titulo.toLocaleLowerCase('pt-BR').includes(termo);
      const correspondeStatus = status === 'ativas'
        ? !tarefa.concluida
        : status === 'concluidas'
          ? tarefa.concluida
          : true;
      return correspondeBusca && correspondeStatus;
    })
    .sort((a, b) => {
      if (ordenacao === 'prioridade') {
        return (prioridadeOrdem[a.prioridade] ?? 1) - (prioridadeOrdem[b.prioridade] ?? 1);
      }
      if (!a.prazo) return b.prazo ? 1 : 0;
      if (!b.prazo) return -1;
      return a.prazo.localeCompare(b.prazo);
    });
}

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

function criarTarefa(titulo, prioridade = 'media', prazo = null) {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    titulo,
    concluida: false,
    prioridade: limparPrioridade(prioridade),
    prazo,
  };
}

function limparTitulo(titulo) {
  return typeof titulo === 'string' ? titulo.trim().replace(/\s+/g, ' ') : '';
}

function limparPrioridade(prioridade) {
  return PRIORIDADES.includes(prioridade) ? prioridade : 'media';
}

function limparPrazo(prazo) {
  if (typeof prazo !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(prazo)) return null;
  const [ano, mes, dia] = prazo.split('-').map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));

  if (
    data.getUTCFullYear() !== ano
    || data.getUTCMonth() !== mes - 1
    || data.getUTCDate() !== dia
  ) {
    return null;
  }

  return prazo;
}

function normalizarTarefa(tarefa) {
  const { criadaEm, ...dados } = tarefa;
  return {
    ...dados,
    titulo: limparTitulo(tarefa.titulo),
    prioridade: limparPrioridade(tarefa.prioridade),
    prazo: limparPrazo(tarefa.prazo),
  };
}

export class TodoStore {
  constructor(armazenamento = globalThis.localStorage) {
    this.armazenamento = armazenamento;
    this.tarefas = this.carregar();
    const tarefasNormalizadas = this.tarefas.map(normalizarTarefa);

    if (tarefasNormalizadas.some((tarefa, indice) => (
      tarefa.titulo !== this.tarefas[indice].titulo
      || tarefa.prioridade !== this.tarefas[indice].prioridade
      || tarefa.prazo !== this.tarefas[indice].prazo
      || Object.hasOwn(this.tarefas[indice], 'criadaEm')
    ))) {
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
    this.tarefas = this.tarefas.map(normalizarTarefa);
    this.armazenamento.setItem(CHAVE, JSON.stringify(this.tarefas));
  }

  listar() {
    return [...this.tarefas];
  }

  estatisticas() {
    return calcularEstatisticas(this.tarefas);
  }

  adicionar(titulo) {
    return this.adicionarComPrioridade(titulo, 'media');
  }

  adicionarComPrioridade(titulo, prioridade) {
    const tituloLimpo = limparTitulo(titulo);
    if (!tituloLimpo) return null;
    const tarefa = criarTarefa(tituloLimpo, prioridade);
    this.tarefas.push(tarefa);
    this.salvar();
    return tarefa;
  }

  adicionarComPrioridadeEPrazo(titulo, prioridade, prazo) {
    const tituloLimpo = limparTitulo(titulo);
    const prazoLimpo = limparPrazo(prazo);
    if (!tituloLimpo || !prazoLimpo) return null;
    const tarefa = criarTarefa(tituloLimpo, prioridade, prazoLimpo);
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

  alternarTodas() {
    if (this.tarefas.length === 0) return;
    const concluirTodas = !this.tarefas.every((tarefa) => tarefa.concluida);
    this.tarefas = this.tarefas.map((tarefa) => ({
      ...tarefa,
      concluida: concluirTodas,
    }));
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

  editarDetalhes(id, titulo, prioridade, prazo) {
    const tituloLimpo = limparTitulo(titulo);
    const prazoLimpo = limparPrazo(prazo);
    if (!tituloLimpo || !PRIORIDADES.includes(prioridade) || !prazoLimpo) return false;

    const tarefa = this.tarefas.find((item) => item.id === id);
    if (!tarefa) return false;

    tarefa.titulo = tituloLimpo;
    tarefa.prioridade = prioridade;
    tarefa.prazo = prazoLimpo;
    this.salvar();
    return true;
  }

  remover(id) {
    const alvo = this.tarefas.find((tarefa) => tarefa.id === id);
    if (!alvo) return;
    const indice = this.tarefas.findIndex((tarefa) => tarefa.titulo === alvo.titulo);
    this.tarefas.splice(indice, 1);
    this.salvar();
  }

  limparConcluidas() {
    const quantidadeRemovida = this.tarefas.length
      - this.tarefas.filter((tarefa) => !tarefa.concluida).length;
    if (quantidadeRemovida === 0) return 0;

    this.tarefas = this.tarefas.filter((tarefa) => !tarefa.concluida);
    this.salvar();
    return quantidadeRemovida;
  }
}
