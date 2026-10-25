# ISSUE-01 — Edição de tarefas

## Identificação da rodada

- Issue: #01 — Edição de tarefas
- Branch (ramificação): feature/issue-01-edicao-tarefas
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
oi pode ajudar com esse projeto?

História de Usuário (Necessidade de Negócio)
Como usuário do TodoLab, gostaria que houvesse a opção de editar tarefas já incluídas na lista, para não ter que apagar e incluir outra caso escreva algo errado.

Critérios de Aceite (BDD — Dado / Quando / Então)
Cenário 1:
Dado que insiro uma nova tarefa na lista,
Quando desejo alterar o descritivo da tarefa,
Então deve existir um botão para edição da mesma.
Fora do Escopo
Não deve excluir todo o descritivo da tarefa quando clico em editar tarefa.
```

## Resposta recebida da IA

```text
A edição e a persistência estão implementadas. O ambiente não conseguiu iniciar o PowerShell para os comandos de validação, então vou verificar o quality gate e o armazenamento por uma execução alternativa.
Implementei a edição de tarefas: o botão Editar abre o campo com o descritivo atual preenchido; Salvar persiste a alteração e Cancelar mantém o texto original. Também é possível salvar com Enter ou cancelar com Escape.

As mudanças estão em app.js, store.js, styles.css e README.md. Você pode validar pelo GitHub Pages.
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
