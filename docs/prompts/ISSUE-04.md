# ISSUE-04 — Implementar filtros Todas, Ativas e Concluídas

## Identificação da rodada

- Issue: #4 — Implementar filtros Todas, Ativas e Concluídas
- Branch (ramificação): feature/issue-04-filtros
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
Quero que o sistema registre automaticamente a data de criação e me permita atribuir uma prioridade (Alta, Média, Baixa) ao cadastrar uma tarefa, além de poder buscá-las pelo nome e filtrá-las por status,
Para que eu possa organizar e gerenciar minha lista de atividades com total controle e eficiência.
Critérios de Aceite (BDD — Dado / Quando / Então)
• Cenário 1 — Atribuição de Data e Prioridade no CADASTRO:
Dado que o usuário está preenchendo o campo de nova tarefa e selecionou a prioridade "Alta",
Quando ele confirmar a inclusão da tarefa,
Então o sistema deve salvar o item contendo o nome digitado, a prioridade selecionada e a data/hora exata da criação gerada de forma automática.
• Cenário 2 — Campo de busca de tarefas pelo Nome:
Dado que existem várias tarefas salvas com nomes diferentes na lista,
Quando o usuário digitar um termo no campo de pesquisa,
Então o sistema deve filtrar a tela em tempo real, exibindo apenas as tarefas cujo título possua o texto digitado.
• Cenário 3 — Filtro de tarefas por Status (Ativas / Concluídas / Todas):
Dado que a lista possui tarefas em andamento e tarefas finalizadas,
Quando o usuário clicar nos botões de filtro "Ativas" ou "Concluídas",
Então o sistema deve exibir apenas as tarefas correspondentes àquele status (e voltar a exibir todas ao clicar em "Todas").
• Cenário 4 — Ordenação por Prioridade ou Data de Criação:
Dado que as tarefas cadastradas possuem datas e níveis de prioridade diferentes,
Quando o usuário selecionar a opção de ordenação por "Prioridade" ou por "Data",
Então o sistema deve reorganizar a exibição visual da lista na tela respeitando a ordem escolhida (ex: prioridade Alta no topo ou mais recentes primeiro).
• Cenário 5 — Caso de borda: Nenhuma tarefa correspondente na busca ou filtro:
Dado que o usuário aplicou um filtro ou digitou um nome que não existe na lista,
Quando a tela for atualizada,
Então o sistema deve exibir de forma segura a lista vazia, sem quebrar o código do painel ou gerar erros no console.
Fora do Escopo
Não altera o design ou as cores do CSS atual (reutilizar inputs e selects existentes), não permite a edição da data após a tarefa ser criada e não envolve salvamento em banco de dados externo nesta rodada.

[ARQUIVOS DE CONTEXTO DO PROJETO]
Consulte e edite com base em: #file:src/store.js e #file:src/app.js

[DIRETRIZES TÉCNICAS E DE QUALIDADE]
1. Escreva o código em JavaScript puro (ES Modules), sem dependências externas.
2. Não altere as assinaturas nem remova funções existentes em store.js.
3. EXIGÊNCIA OBRIGATÓRIA DE TESTE UNITÁRIO:
Além da implementação, forneça uma função de teste unitário isolada que execute
a função modificada e comprove que todos os cenários (válidos e casos de borda) passam com sucesso.


referente a data, pode incluir para o usuário definir a data máxima para conclusão da tarefa? ao invés da data de criação


o texto está pulando para fora da caixa/limitação, e sobrepondo as opçoes de editar e remover, pode corrigir?


ótimo! agora preciso que na ediçao de tarefas seja possível alterar a prioridade e a data de prazo


ficou muio bom! pode dar uma mexida no layout das estatísticas e filtros? está tudo muito junto e sem estilo... dar uma modernizada, está meio cru
```

## Resposta recebida da IA

```text
Implementei os cenários da Issue sem alterar o CSS nem remover assinaturas existentes da store:

Cadastro: permite selecionar prioridade Alta, Média ou Baixa e registra automaticamente data e hora em criadaEm. A prioridade padrão para tarefas criadas pelo método existente adicionar(titulo) é Média.
Busca: filtra a lista em tempo real pelo título, sem diferenciar maiúsculas e minúsculas.
Status: adiciona filtros Todas, Ativas e Concluídas.
Ordenação: permite ordenar por prioridade — Alta primeiro — ou por data — mais recentes primeiro.
Lista sem resultados: mostra uma mensagem apropriada sem afetar as estatísticas gerais.
Acrescentei testes em store.test.js para cadastro e persistência de prioridade/data, busca, filtros, ordenação e resultados vazios. Atualizei também a descrição de funcionalidades no README.md.

A verificação de problemas não apontou erros nos arquivos examinados. Não consegui executar os testes nem o build: o ambiente não inicia o PowerShell necessário para rodar os comandos.


Sim. Substituí a data automática de criação por um prazo máximo de conclusão:

O formulário agora exige que a pessoa escolha um prazo para cada nova tarefa.
A lista mostra o prazo e a ordenação por data coloca os prazos mais próximos primeiro.
A data de criação deixou de ser registrada. Tarefas antigas sem prazo continuam carregando e são ordenadas por último.
Mantive as assinaturas dos métodos existentes da store e não alterei o CSS.
Atualizei a implementação em store.js, app.js e index.html. Os testes em store.test.js cobrem prazo válido, ausência e data inválida, migração de tarefas antigas e ordenação por prazo.

A verificação de problemas não apontou erros. Não consegui executar os testes pelo terminal porque o ambiente não inicia o PowerShell.


Corrigi o layout em styles.css: o texto e as informações de prioridade/prazo agora podem quebrar dentro da coluna da tarefa, enquanto os botões Editar e Remover mantêm o espaço necessário. Isso evita que textos longos se sobreponham às ações.


Agora, ao clicar em Editar, é possível alterar o título, a prioridade e o prazo. Salvar atualiza os três dados juntos; título vazio ou prazo inválido impede a alteração.

Atualizei a store, a interface e o layout dos campos de edição. Também acrescentei testes para alteração, persistência e rejeição de dados inválidos. A verificação de problemas não encontrou erros, mas não consegui executar npm test: o ambiente não conseguiu iniciar o PowerShell.


Modernizei a área de filtros e estatísticas em index.html e styles.css:

Busca, filtros e ordenação agora ficam organizados em uma barra de controles.
O filtro ativo ganha destaque visual, e os campos seguem a paleta existente.
As quatro métricas aparecem em cartões separados, com cores que destacam pendências e conclusão.
Em telas menores, os controles se reorganizam e os cartões passam para duas colunas.
Conferi a página no navegador: os controles e cartões aparecem corretamente. A verificação dos arquivos não apontou erros.
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
