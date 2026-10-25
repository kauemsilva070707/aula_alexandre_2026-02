# ISSUE-13 — Janela de confirmação de exclusão

## Identificação da rodada

- Issue: #13 — Janela de confirmação de exclusão
- Branch (ramificação): feature/issue-13-janela-exclusao
- Autor da alteração:
- Revisor previsto:
- Data:

## Contexto aprovado

- Link ou referência da Issue:
- Critérios de aceite revisados pelo professor:
- Arquivos que podem ser alterados:
- Arquivos que não devem ser alterados:

## Prompt inicial enviado à IA

```text
História de Usuário (Necessidade de Negócio)
Como usuário do TodoLab,
Quero receber uma confirmação visual antes de excluir uma tarefa para evitar exclusões acidentais, e garantir que o sistema delete exatamente a tarefa selecionada, mesmo que existam múltiplos itens com nomes idênticos na lista.

Critérios de Aceite (BDD — Dado / Quando / Então)
• Cenário 1 — Confirmar exclusão:
Dado que existe uma tarefa cadastrada,
Quando o usuário clicar no botão de excluir e confirmar explicitamente a ação na janela de confirmação,
Então o sistema deve remover permanentemente a tarefa da lista visual e também do localStorage.
• Cenário 2 — Cancelar ou fechar a janela de exclusão:
Dado que a janela de confirmação de exclusão está aberta na tela,
Quando o usuário clicar em cancelar ou fechar a janela sem confirmar,
Então a operação deve ser abortada e a tarefa deve permanecer intacta na lista.
• Cenário 3 — Caso de borda: Exclusão de tarefas com nomes duplicados (Bug Fix):
Dado que existem duas ou mais tarefas cadastradas com o mesmo nome (com status diferentes ou iguais),
Quando o usuário clicar para excluir uma delas especificamente e confirmar,
Então o sistema deve utilizar um identificador único exclusivo (como um id numérico ou gerado por crypto.randomUUID()) para remover apenas a tarefa exata que foi selecionada, impedindo que o sistema delete por engano o primeiro item de mesmo nome que estiver no topo da lista.

Fora do Escopo
Não envolve a criação de modais customizados estilizados no CSS nesta rodada (pode utilizar a janela nativa segura do navegador através do método confirm()), e não altera a lógica das funções de ordenação de tarefas.


preciso da janela de confirmaçao de exclusao para a funcao de limpar concluídas também, mas aí pode ser para o número de tarefas ao invés do nome
```

## Resposta recebida da IA

```text
Implementei a confirmação nativa do navegador antes da exclusão. Se a pessoa cancelar ou fechar a janela sem confirmar, a tarefa permanece na lista e no localStorage.

Corrigi também store.js: a remoção agora localiza a tarefa pelo ID e exclui somente a selecionada, mesmo quando há títulos duplicados. Os testes em store.test.js cobrem IDs duplicados e inexistentes.

A verificação de problemas não apontou erros. Não consegui executar os testes: o executor retornou “No tests found”.


Adicionei a confirmação antes de limpar as tarefas concluídas. A janela informa a quantidade — por exemplo, “Deseja excluir 3 tarefas concluídas?” — e cancelar não altera a lista. Também tratei o singular para uma única tarefa. A verificação de app.js não apontou erros.
```

## Verificação humana antes do Pull Request

- [ ] O diff foi lido pela equipe.
- [ ] Os critérios de aceite foram comparados com a alteração.
- [ ] `npm run check` foi executado e o resultado real foi registrado.
- [ ] A verificação manual no navegador foi realizada.
- [ ] Pendências, limitações ou dúvidas foram registradas abaixo.

Resultado real do `npm run check`:

```text
> todolab-template@0.1.0 check
> npm run lint && npm run build


> todolab-template@0.1.0 lint
> node scripts/lint.mjs

Lint aprovado: 5 arquivos JavaScript verificados.

> todolab-template@0.1.0 build
> node scripts/build.mjs

Build aprovado: artefato gerado em dist/.
```

Verificação manual realizada:

- Passos:
- Resultado observado:
- Pendências ou riscos:

## Pull Request e revisão

- URL ou número do Pull Request:
- Autor do Pull Request:
- Revisor (integrante diferente do autor):
- O PR contém `Closes #NN`? [ ] sim [ ] não
- Commit ou hash da versão revisada:
- Resultado do CI: [ ] verde [ ] vermelho [ ] ainda em execução
- Comentário substantivo do revisor (referencie um critério de aceite):
- Há mudanças solicitadas abertas? [ ] sim [ ] não
- A aprovação é da versão atual, depois das últimas correções? [ ] sim [ ] não [ ] não houve correção
- Aceite manual registrado, com cenários e resultado observado:
- Decisão: [ ] merge autorizado [ ] mudanças solicitadas [ ] pendente

O merge só é autorizado com CI verde, nenhuma mudança solicitada aberta, aceite manual registrado e aprovação da versão atual. Enquanto qualquer condição faltar, a decisão permanece pendente.

## Aprendizado da rodada

- Ambiguidade encontrada:
- Decisão tomada:
- Próxima melhoria de processo:
