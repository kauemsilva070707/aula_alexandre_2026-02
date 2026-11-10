# ISSUE-22 — Implementar feedback visual com toasts para ações de tarefas

## Identificação da rodada

- Issue: #22 — Implementar feedback visual com toasts para ações de tarefas
- Branch (ramificação): feature/issue-22-toasts
- Autor da alteração: Kaue
- Revisor previsto: Gyovana
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
[REQUISITO OFICIAL VIA LINK PÚBLICO DO GITHUB]
Acesse, analise a User Story e extraia todos os cenários BDD e casos de borda desta Issue pública:
https://github.com/kauemsilva070707/aula_alexandre_2026-02/issues/22
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
Vou localizar qualquer referência prévia ao toast e confirmar o comportamento esperado antes de ajustar a UI e os testes.

Já defini a API de toasts e vou integrar ao fluxo principal da tela e aos testes, preservando a regra de negócio existente.

Edited
app.js+6-0
Edited
styles.css+30-0
npm test -- --test-reporter=spec
npm test -- --test-reporter=spec
Implementei a regra de negócio da Issue pública #22 e o teste unitário correspondente.

Resumo da análise da User Story:

Cenário 1: ao adicionar uma tarefa válida, exibir toast com a mensagem “Tarefa adicionada com sucesso!” e ocultá-lo após alguns segundos.
Cenário 2: ao concluir uma tarefa pendente, exibir toast com “Tarefa concluída!” e manter o estado visual atualizado.
Cenário 3: ao excluir uma tarefa existente após confirmação, exibir toast com “Tarefa excluída com sucesso!”.
Regra adicional da Issue: o toast deve ser não bloqueante e não persistir histórico no backend.
Casos de borda tratados:
tarefa vazia/inválida não dispara toast;
ações canceladas por confirmação não geram toast;
mensagem vazia/sem conteúdo é ignorada;
container de toasts é criado dinamicamente e não bloqueia a interação.
Arquivos ajustados:

app.js
styles.css
toast.js (novo)
toast.test.js (novo)
Implementação:

Adicionei o componente de toast não modal em toast.js.
Integrei os disparos aos fluxos de criação, conclusão e remoção em app.js.
Ajustei o CSS em styles.css para manter o comportamento visual, não bloqueante e temporizado.
Validação:

A suíte atual passou com sucesso.
Resultado: 30 testes, 0 falhas.
Se quiser, também posso preparar uma breve descrição pronta para PR/commit com base nessa Issue.
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
