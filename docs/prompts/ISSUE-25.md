# ISSUE-25 — Adicionar funcionalidade de Exportação e Importação de Dados da Fila de Tarefas


Copie este arquivo para `ISSUE-NN.md`, substituindo `NN` pelo número real da Issue. Registre o que foi efetivamente enviado e recebido; não preencha com exemplos fictícios.

## Identificação da rodada

- Issue: #25 —
- Branch (ramificação): feat/export-import-tasks
- Autor da alteração: LuidgiSilva
- Revisor previsto:
- Data: 16/11/26

## Contexto aprovado

- Link ou referência da Issue:
- Critérios de aceite revisados pelo professor:
- Arquivos que podem ser alterados:
- Arquivos que não devem ser alterados:

## Prompt inicial enviado à IA

Você é a fábrica de software terceirizada da squad de qualidade do TodoLab.
Sua tarefa é implementar a regra de negócio da Issue pública e fornecer o teste unitário correspondente.
[REQUISITO OFICIAL VIA LINK PÚBLICO DO GITHUB]
Acesse, analise a User Story e extraia todos os cenários BDD e casos de borda desta Issue pública:
https://github.com/kauemsilva070707/aula_alexandre_2026-02/issues/25
[ARQUIVOS DE CONTEXTO DO PROJETO]
Consulte e edite com base em: #file:src/store.js e #file:src/app.js
[DIRETRIZES TÉCNICAS E DE QUALIDADE]

Escreva o código em JavaScript puro (ES Modules), sem dependências externas.
Não altere as assinaturas nem remova funções existentes e

## Resposta recebida da IA

Exportação: baixa todas as tarefas em JSON; se a fila estiver vazia, mostra um aviso.
Importação: carrega e renderiza tarefas de arquivos JSON válidos.
Rejeições: formato, JSON ou registros inválidos geram erro claro e preservam a fila; IDs duplicados também são rejeitados.
A lógica está em store.js e a integração com a interface em app.js. O teste isolado em task-transfer.test.js cobre exportação, importação, lista vazia e rejeições sem sobrescrita.

Verificação: 31 testes passaram; lint e build aprovados. Preservei as alterações preexistentes em index.html e styles.css.

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

Lint aprovado: 6 arquivos JavaScript verificados.

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
