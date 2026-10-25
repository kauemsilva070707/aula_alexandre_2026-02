# ISSUE-07 — Marcar todas as tarefas como concluídas

## Identificação da rodada

- Issue: #07 — Marcar todas as tarefas como concluídas
- Branch (ramificação): feature/issue-07-marca-concluidas
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
Quero poder marcar ou desmarcar todas as tarefas como concluídas de uma única vez através de um comando global,
Para que eu consiga gerenciar o status de grandes volumes de tarefas rapidamente sem precisar clicar em cada uma individualmente.

Critérios de Aceite (BDD — Dado / Quando / Então)
• Cenário 1 — Existem tarefas pendentes:
Dado que existem tarefas pendentes na lista,
Quando o usuário acionar a opção de marcar todas,
Então todas as tarefas cadastradas devem ser modificadas para o status de concluídas.
• Cenário 2 — Todas as tarefas já estão concluídas:
Dado que todas as tarefas estão marcadas como concluídas,
Quando o usuário acionar a alternância global,
Então todas as tarefas devem ser desmarcadas e voltar simultaneamente ao estado pendente.
• Cenário 3 — Caso de borda: lista vazia:
Dado que não existem tarefas cadastradas no sistema,
Quando o usuário visualizar a opção de alternância global e tentar acioná-la,
Então o sistema deve ignorar o comando de forma segura e nenhuma tarefa fantasma deve ser alterada ou criada.

Fora do Escopo
Não altera o design ou os ícones do arquivo CSS atual (utilizar o elemento de checkbox global ou botão que já estiver disponível no layout), não envia alertas na tela e não envolve filtros de exibição nesta rodada.

[ARQUIVOS DE CONTEXTO DO PROJETO]
Consulte e edite com base em: #file:src/store.js e #file:src/app.js

[DIRETRIZES TÉCNICAS E DE QUALIDADE]

Escreva o código em JavaScript puro (ES Modules), sem dependências externas.
Não altere as assinaturas nem remova funções existentes em store.js.
EXIGÊNCIA OBRIGATÓRIA DE TESTE UNITÁRIO:
Além da implementação, forneça uma função de teste unitário isolada que execute
a função modificada e comprove que todos os cenários (válidos e casos de borda) passam com sucesso.


pode deixar o checkbox acima da lista de tarefas? está meio distante


agora pode aplicar o estilo dos checkbox da lista nele? mesmo tamanho e cor...


agora quando estiver todas como concluídas, pode mudar o texto para desmarcar todas?
```

## Resposta recebida da IA

```text
Implementei a alternância global em store.js e conectei o checkbox Marcar todas na interface. Com tarefas pendentes ou em estado misto, ele conclui todas; quando todas já estão concluídas, desmarca todas. Com a lista vazia, fica desativado, e a store não cria nem modifica tarefas.

Adicionei testes para os três cenários em store.test.js e atualizei a descrição no README.md. A verificação de problemas não encontrou erros. O executor disponível não reconheceu os testes do Node.js e retornou “No tests found”; portanto, não consegui confirmar a execução deles.


Movi o checkbox Marcar todas para ficar imediatamente acima da lista de tarefas, em index.html. A verificação do arquivo não apontou erros.


Apliquei ao checkbox global as mesmas dimensões (19 × 19 px) e a cor de destaque (--acid) dos checkboxes da lista em styles.css. A verificação não apontou erros.


Atualizei o texto e o rótulo acessível do checkbox: quando todas as tarefas estão concluídas, aparece Desmarcar todas; caso contrário, Marcar todas. A alteração está em app.js e index.html. A verificação não apontou erros.
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
