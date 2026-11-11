# ISSUE-03 — Bloqueio de Tarefas Vazias ou com Espaços

## Identificação da rodada

- Issue: #03 — Bloqueio de Tarefas Vazias ou com Espaços
- Branch (ramificação): feature/issue-03-espaco
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

 História de Usuário (Necessidade de Negócio)
Como usuário do TodoLab,
Quero que o sistema valide e limpe os espaços extras do texto tanto ao cadastrar quanto ao editar uma tarefa (impedindo campos vazios, tabulações ou textos como "limpar mesa     "),
Para que a aplicação mantenha a consistência visual e impeça dados inválidos ou invisíveis em qualquer etapa do uso.
Critérios de Aceite (BDD — Dado / Quando / Então)
• Cenário 1 — Bloqueio de texto vazio ou apenas espaços no CADASTRO:
Dado que o campo de texto de uma nova tarefa está em branco ou possui apenas espaços e tabulações,
Quando o usuário tentar adicionar a nova tarefa (pressionando Enter ou clicando em adicionar),
Então o sistema deve ignorar a inclusão de forma silenciosa, não adicionar nenhum item à lista e manter o cursor focado no campo.
• Cenário 2 — Limpeza de espaços extras ao ADICIONAR:
Dado que o usuário digitou uma nova tarefa válida, mas com espaços sobrando no final, como "limpar mesa      ",
Quando ele confirmar o cadastro da tarefa,
Então o sistema deve remover os espaços extras utilizando um método de limpeza (como o .trim()) e salvar na lista apenas o texto limpo: "limpar mesa".
• Cenário 3 — Bloqueio de texto vazio ou apenas espaços na EDIÇÃO:
Dado que o usuário está editando uma tarefa existente e apaga todo o texto ou digita apenas espaços/tabulações,
Quando ele tentar salvar a alteração,
Então o sistema deve recusar a modificação e manter a tarefa com o texto original que ela tinha antes, sem salvar um campo invisível.
• Cenário 4 — Limpeza de espaços extras ao EDITAR:
Dado que o usuário está editando uma tarefa existente e insere espaços inúteis no fim, como "estudar Git      ",
Quando ele confirmar a alteração,
Então o sistema deve remover os espaços do final automaticamente e atualizar a tarefa para o texto limpo: "estudar Git".
Fora do Escopo
Não exibe alertas intrusivos na tela (como a função alert() do navegador), não altera a estilização visual dos inputs no CSS e não envolve mensagens de erro complexas abaixo do campo nesta rodada.

[ARQUIVOS DE CONTEXTO DO PROJETO]
Consulte e edite com base em: #file:src/store.js e #file:src/app.js

[DIRETRIZES TÉCNICAS E DE QUALIDADE]
1. Escreva o código em JavaScript puro (ES Modules), sem dependências externas.
2. Não altere as assinaturas nem remova funções existentes em store.js.
3. EXIGÊNCIA OBRIGATÓRIA DE TESTE UNITÁRIO:
Além da implementação, forneça uma função de teste unitário isolada que execute
a função modificada e comprove que todos os cenários (válidos e casos de borda) passam com sucesso.


preciso que os espaços no meio das tarefas sejam verificados, e excluídos caso sejam desnecessários, como em "limpar      mesa"
```

## Resposta recebida da IA

```text
Implementei a validação no cadastro e na edição:

Em store.js, títulos são limpos com trim(). Valores vazios ou compostos apenas por espaços/tabulações são recusados sem alterar a lista.
Em app.js, o campo de cadastro mantém o foco quando a inclusão é ignorada; na edição inválida, o texto original é preservado e o editor permanece focado.
Em store.test.js, incluí testes para os quatro cenários da Issue: cadastro vazio e com espaços extras, edição vazia e com espaços extras.
Validação: não foram encontrados erros nos arquivos JavaScript pela verificação de problemas. Não consegui executar npm test nem npm run check, pois o ambiente não conseguiu iniciar o PowerShell; portanto, os testes ainda precisam ser executados localmente.


Vou ajustar a normalização para também reduzir sequências de espaços ou tabulações entre palavras a um único espaço, e atualizar os testes de cadastro e edição para cobrir esse caso.

Atualizei store.js: agora o título é aparado nas extremidades e sequências de espaços, tabulações ou outras quebras de espaço no meio viram um único espaço. Por exemplo, "limpar        mesa" passa a "limpar mesa".

Atualizei os testes em store.test.js para conferir essa normalização no cadastro e na edição, inclusive no valor persistido. A verificação de problemas não encontrou erros; não consegui executar os testes neste ambiente.
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
