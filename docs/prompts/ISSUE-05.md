# ISSUE-05 — Implementar ação para limpar tarefas concluídas

## Identificação da rodada

- Issue: #05 — Implementar ação para limpar tarefas concluídas
- Branch (ramificação): feature/issue-05-limpa-concluidas
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
Você é a fábrica de software terceirizada da squad de qualidade do TodoLab.
Sua tarefa é implementar a regra de negócio da Issue pública e fornecer o teste unitário correspondente.

Analise a User Story e extraia todos os cenários BDD e casos de borda desta Issue:

História de Usuário (Necessidade de Negócio)
Como usuário do TodoLab,
Quero poder remover todas as tarefas concluídas da lista de uma única vez através de um botão específico (que deve ficar oculto se não houver tarefas concluídas),
Para que eu possa limpar meu painel de atividades finalizadas com facilidade e manter o foco apenas nos itens pendentes.
Critérios de Aceite (BDD — Dado / Quando / Então)
• Cenário 1 — Existem tarefas concluídas:
Dado que existem tarefas concluídas e tarefas pendentes na lista,
Quando o usuário clicar no botão de limpar tarefas concluídas,
Então o sistema deve remover todas as tarefas concluídas da lista, mantendo as tarefas pendentes intactas.
• Cenário 2 — Todas as tarefas estão concluídas:
Dado que todas as tarefas cadastradas estão concluídas,
Quando o usuário clicar no botão de limpar tarefas concluídas,
Então o sistema deve remover todas as tarefas da lista, deixando-a totalmente vazia.
• Cenário 3 — Caso de borda: nenhuma tarefa concluída:
Dado que não existem tarefas concluídas na lista,
Quando o usuário visualizar a área de ações,
Então o botão de limpar tarefas concluídas não deve ser exibido na interface.
Fora do Escopo
Não altera a estilização visual das caixas ou botões existentes no arquivo CSS, não permite a recuperação (desfazer) das tarefas removidas por este botão e não envolve o salvamento persistente dessa remoção em banco de dados externo nesta rodada.

[ARQUIVOS DE CONTEXTO DO PROJETO]
Consulte e edite com base em: #file:src/store.js e #file:src/app.js

[DIRETRIZES TÉCNICAS E DE QUALIDADE]
1. Escreva o código em JavaScript puro (ES Modules), sem dependências externas.
2. Não altere as assinaturas nem remova funções existentes em store.js.
3. EXIGÊNCIA OBRIGATÓRIA DE TESTE UNITÁRIO:
Além da implementação, forneça uma função de teste unitário isolada que execute
a função modificada e comprove que todos os cenários (válidos e casos de borda) passam com sucesso.
```

## Resposta recebida da IA

```text
Implementei o botão Limpar tarefas concluídas. Ele aparece apenas quando há pelo menos uma tarefa concluída; ao clicar, remove todas as concluídas e mantém as pendentes. Se todas estiverem concluídas, a lista fica vazia.

Incluí testes para lista mista, todas concluídas, nenhuma concluída e a condição de exibição do botão. Não alterei o CSS. A verificação de problemas não apontou erros, mas não consegui executar os testes: o executor não reconheceu os testes nativos do Node.js e retornou “No tests found”. Também corrigi o README para refletir a nova funcionalidade.
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
