# ISSUE-02 — Contador Dinâmico de Tarefas Pendentes

## Identificação da rodada

- Issue: #02 — Contador Dinâmico de Tarefas Pendentes
- Branch (ramificação): feature/issue-02-contador
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
Quero visualizar um pequeno painel com as estatísticas consolidadas das minhas tarefas (Total de tarefas, Tarefas pendentes, Tarefas concluídas e o Percentual de conclusão),
Para que eu possa acompanhar o progresso real das minhas atividades diárias de forma visual, clara e intuitiva, substituindo o contador simples de itens restantes.

Critérios de Aceite (BDD — Dado / Quando / Então)
• Cenário 1 — Lista com tarefas pendentes e concluídas (Mistas):
Dado que existem 3 tarefas cadastradas no sistema (sendo 2 pendentes e 1 marcada como concluída),
Quando o usuário visualizar a lista de tarefas,
Então o sistema deve exibir no painel: "Total de tarefas: 3", "Tarefas pendentes: 2", "Tarefas concluídas: 1" e "Percentual de conclusão: 33%".
• Cenário 2 — Uma única tarefa pendente:
Dado que existe apenas 1 tarefa cadastrada e ela está pendente,
Quando o usuário visualizar o contador do painel,
Então o sistema deve exibir: "Total de tarefas: 1", "Tarefas pendentes: 1", "Tarefas concluídas: 0" e "Percentual de conclusão: 0%".
• Cenário 3 — Caso de borda: lista vazia:
Dado que não existem tarefas cadastradas na lista (0 tarefas),
Quando o usuário visualizar o painel,
Então o sistema deve exibir: "Total de tarefas: 0", "Tarefas pendentes: 0", "Tarefas concluídas: 0" e "Percentual de conclusão: 0%" (evitando erros de divisão por zero ou exibição de 'NaN%').

Fora do Escopo
Não altera a estrutura ou estilização do CSS existente, não adiciona bibliotecas ou frameworks externos de gráficos (toda a lógica e renderização do painel devem ser feitas em JavaScript puro manipulando o DOM) e não envolve persistência de dados em banco de dados ou localStorage nesta rodada.

[ARQUIVOS DE CONTEXTO DO PROJETO]
Consulte e edite com base em: #file:src/store.js e #file:src/app.js

[DIRETRIZES TÉCNICAS E DE QUALIDADE]

Escreva o código em JavaScript puro (ES Modules), sem dependências externas.
Não altere as assinaturas nem remova funções existentes em store.js.
EXIGÊNCIA OBRIGATÓRIA DE TESTE UNITÁRIO:
Além da implementação, forneça uma função de teste unitário isolada que execute
a função modificada e comprove que todos os cenários (válidos e casos de borda) passam com sucesso.
```

## Resposta recebida da IA

```text
Vou conferir a store, a integração da interface e os comandos de teste existentes para implementar o painel sem alterar o CSS nem adicionar dependências.

A store usa concluida como estado da tarefa e não há infraestrutura de testes pronta. Vou adicionar uma função pura de consolidação, conectá-la ao painel renderizado pela aplicação e fornecer um teste isolado com o runner nativo do Node.js, sem dependências externas.

A regra agora calcula totais e percentual com proteção para lista vazia; a interface atualiza as quatro métricas a cada renderização. Também acrescentei testes para os três cenários BDD, arredondamento e 100% de conclusão. Vou executar os testes e o quality gate existentes.

Implementei o painel e a regra de consolidação. A função pura calcularEstatisticas contabiliza tarefas pendentes e concluídas e arredonda o percentual; quando a lista está vazia, retorna zero sem divisão por zero. A aplicação atualiza as métricas ao renderizar, e o painel foi incluído em index.html, sem alterar o CSS.

Os testes em store.test.js cobrem os três cenários BDD, 100% de conclusão e arredondamento. Adicionei npm test ao package.json e documentei o comando no README.md.

Validação: a verificação de problemas não apontou erros nos arquivos JavaScript. Não foi possível executar npm test nem npm run check: o ambiente não conseguiu iniciar o PowerShell. A página carregada exibiu corretamente as quatro métricas zeradas para a lista vazia.
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
