# Prompts avançados para resumos jurídicos

Complemento do [guia de resumos com o Claude](./README.md). Aqui estão prompts prontos para usar as técnicas avançadas no dia a dia de uma procuradoria (ou de qualquer escritório que lide com processos judiciais).

**Como usar:** copie o prompt, troque o que estiver entre colchetes `[ ]` e envie com o documento anexado. Onde a técnica tem mais de uma etapa, há um prompt para cada etapa.

> As etiquetas como `<papel>` e `<tarefa>` só servem para separar as partes do pedido. O Claude entende melhor instruções longas organizadas assim.

## Sumário

1. [Resumo com conferência (extrair e depois verificar)](#1-resumo-com-conferência-extrair-e-depois-verificar)
2. [Resumo de resumos dos autos completos (linha do tempo)](#2-resumo-de-resumos-dos-autos-completos-linha-do-tempo)
3. [Classificar o documento antes de resumir](#3-classificar-o-documento-antes-de-resumir)
4. [Fichário do acervo (reaproveitar peças antigas)](#4-fichário-do-acervo-reaproveitar-peças-antigas)
5. [Triagem da caixa de entrada](#5-triagem-da-caixa-de-entrada)
6. [Medir a qualidade (comparar com um gabarito)](#6-medir-a-qualidade-comparar-com-um-gabarito)

## 1. Resumo com conferência (extrair e depois verificar)

O maior risco de um resumo é o modelo inventar algo. A solução é dividir o trabalho em duas passagens: uma extrai cada informação com página e trecho literal, e outra, independente, confere tudo contra o documento.

**1A. Extração.** Anexe o documento e envie:

```text
<papel>
Você é assessor jurídico de uma Procuradoria Municipal, especializado em
análise de processos judiciais em que o Município é parte.
</papel>

<tarefa>
Extraia do documento anexo as informações listadas em <campos>. Para cada
uma, registre o dado, a página e um trecho literal curto (até 2 linhas)
que o comprove.
</tarefa>

<campos>
1. Número do processo, juízo e classe
2. Partes e advogados
3. Ato processual mais recente e sua data
4. Pedidos ou determinações (liste todos)
5. Valores (da causa, da condenação, de cálculos), exatamente como escritos
6. Prazos, audiências e datas de intimação
7. Fundamentos legais citados
</campos>

<regras>
- Registre apenas o que está escrito. Se um campo não constar, escreva
  "Não informado". Não deduza.
- Não converta, atualize ou some valores: copie como estão.
- Datas no formato dd/mm/aaaa.
</regras>

<formato>
Uma tabela: | Campo | Informação | Pág. | Trecho literal |
Depois, um "Resumo executivo" de até 5 linhas, baseado só na tabela.
</formato>
```

**1B. Conferência.** Abra uma **conversa nova**, para o revisor não "lembrar" do raciocínio de quem extraiu. Anexe o mesmo documento, cole a tabela e envie:

```text
<papel>
Você é revisor jurídico. Sua função é encontrar erros, não confirmar o
trabalho alheio.
</papel>

<tarefa>
Abaixo está uma tabela extraída do documento anexo por outra pessoa.
Confira cada linha contra o documento.
</tarefa>

<tabela>
[cole aqui a tabela da etapa 1A]
</tabela>

<formato>
Para cada linha, uma das marcações:
✅ Confirmado
⚠️ Divergente: informe o dado correto e a página
❌ Não encontrado no documento

Depois, liste em "Omissões relevantes" o que é importante e não foi
extraído (com página).

Termine com o placar: X confirmados, Y divergentes, Z não encontrados.
Não reescreva o resumo.
</formato>
```

## 2. Resumo de resumos dos autos completos (linha do tempo)

Para processos longos: primeiro uma ficha de cada peça, depois a consolidação em linha do tempo e situação atual.

Anexe o PDF único dos autos, de preferência com um sumário que relacione cada documento às suas páginas. Envie:

```text
<papel>
Você é assessor jurídico de uma Procuradoria Municipal e vai preparar a
análise de autos completos para o procurador responsável.
</papel>

<contexto>
O Município de [nome do Município] figura como [réu/autor/executado]. Os
autos anexos têm um sumário que relaciona cada documento às suas páginas.
</contexto>

<etapa1>
Percorra os autos em ordem e faça uma ficha de cada peça relevante:
| Data | Tipo de peça | Quem apresentou/proferiu | Conteúdo essencial (1 a 3 linhas) | Págs. |

Ignore peças sem conteúdo decisório ou argumentativo: procurações,
certidões de juntada, ARs e atos ordinatórios de mero expediente.
</etapa1>

<etapa2>
Com base apenas nas fichas, produza:
1. Linha do tempo: os marcos do processo (ajuizamento, citação, decisões,
   recursos, trânsito em julgado, cumprimento), com data e página.
2. Teses de cada parte: o que já foi alegado pelo autor e pelo Município,
   para evitar repetição ou preclusão.
3. Situação atual: em que fase o processo está e o que está pendente.
4. Inconsistências: datas, valores ou informações que se contradizem
   entre peças (cite as páginas).
5. Próxima providência provável do Município.
</etapa2>

<regras>
Toda afirmação deve ter página. Se algo não estiver nos autos, diga
"Não consta dos autos".
</regras>
```

> Se os autos forem grandes demais para uma conversa, anexe por partes e peça só a `<etapa1>` em cada uma. No final, peça: "Agora execute a etapa 2 com todas as fichas desta conversa."

## 3. Classificar o documento antes de resumir

Em vez de um roteiro único, o Claude primeiro identifica o tipo do documento e depois aplica o roteiro específico daquele tipo.

```text
<papel>
Você é assessor jurídico de uma Procuradoria Municipal.
</papel>

<tarefa>
1. Identifique o tipo do documento anexo entre os tipos de <roteiros>.
   Escreva na primeira linha: "Tipo: [tipo], porque [motivo em 1 linha]".
2. Resuma usando somente o roteiro desse tipo.
3. Se o documento não se encaixar em nenhum tipo, use o roteiro "Outro".
</tarefa>

<roteiros>
<intimacao_despacho>
- Ato que gerou a intimação e data
- Providência exigida do Município (em uma frase, no imperativo)
- Prazo fixado e se é prazo próprio ou legal
- Consequência de não cumprir (se indicada)
</intimacao_despacho>

<decisao_interlocutoria>
- O que foi decidido e a favor de quem
- Fundamentos centrais
- Obrigação imposta ao Município, prazo e multa
- Cabimento de recurso (agravo de instrumento?) e pontos atacáveis
</decisao_interlocutoria>

<sentenca_acordao>
- Dispositivo, copiado literalmente
- Resultado para o Município (procedente/improcedente/parcial)
- Condenação: valores, índices de correção e juros, termo inicial
- Honorários e custas
- Remessa necessária: se há ou não, e por quê
- Recurso cabível e pontos atacáveis
</sentenca_acordao>

<calculo>
- Quem apresentou e valor total
- Período, índices de correção e juros utilizados
- Termo inicial e data-base
- Pontos que precisam de conferência técnica
</calculo>

<peticao_inicial>
- Partes, causa de pedir e pedidos (todos)
- Pedido de urgência: há? qual?
- Valor da causa
- Preliminares possíveis (competência, legitimidade, prescrição)
- Documentos que faltam ou são frágeis
</peticao_inicial>

<outro>
- Natureza do documento, conteúdo essencial e reflexo para o Município
</outro>
</roteiros>

<regras>
Indique a página de cada informação. Se algo não constar, escreva
"Não informado". Não invente.
</regras>
```

> Este prompt funciona bem como instrução fixa de um Projeto do claude.ai. Daí basta anexar o documento e escrever "analise".

## 4. Fichário do acervo (reaproveitar peças antigas)

Cada peça já escrita ganha uma ficha curta. Quando chega um caso novo, o Claude consulta as fichas, indica quais peças servem de base e copia os trechos reaproveitáveis.

**4A. Fazer a ficha.** Rode uma vez para cada peça antiga e guarde as fichas num documento único (por exemplo, nos arquivos de um Projeto):

```text
Faça uma ficha de catalogação da peça anexa, com no máximo 8 linhas,
exatamente neste formato:

ARQUIVO: [nome do arquivo]
TIPO DE PEÇA: [contestação, apelação, impugnação ao cumprimento, ...]
MATÉRIA: [ex.: responsabilidade civil por queda em via pública]
TESES PRINCIPAIS: [até 4, separadas por ponto e vírgula]
DISPOSITIVOS LEGAIS: [os mais relevantes]
JURISPRUDÊNCIA CITADA: [tribunal e número, se houver]
RESULTADO: [se conhecido; senão "Não informado"]
PALAVRAS-CHAVE: [5 a 8 termos]
```

**4B. Buscar no fichário.** Com as fichas e as peças antigas anexadas ao Projeto, anexe o caso novo e envie:

```text
<caso_novo>
[anexe a peça ou descreva o caso em poucas linhas]
</caso_novo>

<tarefa>
1. Compare o caso novo com cada ficha do fichário e dê uma nota de 0 a 10
   de aproveitamento. Mostre só as 5 maiores, em ordem:
   | Nota | Arquivo | Por que serve | O que não serve |
2. Abra a peça de maior nota e copie, palavra por palavra, os trechos que
   podem ser reaproveitados, separados por ---. Indique de que seção da
   peça cada trecho vem.
3. Liste o que precisa ser adaptado: fatos, datas, nomes, fundamentos
   desatualizados.
4. Aponte se algum dado do caso novo não bate exatamente com a peça
   antiga (nome de parte, lei revogada, tese superada).
</tarefa>
```

## 5. Triagem da caixa de entrada

Transforma uma lista de intimações numa tabela ordenada por urgência, pronta para colar numa planilha.

Cole o texto da lista de intimações (ou anexe os PDFs) e envie:

```text
<papel>
Você é assessor da Procuradoria e está fazendo a triagem matinal das
intimações recebidas.
</papel>

<intimacoes>
[cole aqui a lista ou anexe os documentos]
</intimacoes>

<tarefa>
Para cada intimação, preencha uma linha da tabela:
| Processo | Tipo de ato | Providência (1 frase) | Prazo | Data da intimação | Urgência | Observação |
</tarefa>

<criterios_urgencia>
ALTA: prazo de até 5 dias, tutela de urgência, multa diária, bloqueio ou
sequestro de valores, audiência na semana.
MÉDIA: prazo para contestação, recurso ou impugnação.
BAIXA: ciência, mero expediente, manifestação sem consequência imediata.
</criterios_urgencia>

<regras>
- Registre o prazo como consta no ato (ex.: "15 dias").
- Se calcular a data final, marque como "calculado: conferir" e
  considere o prazo em dobro da Fazenda Pública (art. 183 do CPC),
  exceto quando o ato fixar prazo próprio para o ente público.
- Ordene a tabela por urgência e, dentro dela, pelo prazo.
- Depois da tabela, escreva "Atenção hoje": as providências que não
  podem esperar.
- Ao final, repita a tabela em formato CSV (separado por ;) para colar
  numa planilha.
</regras>
```

> Prazos calculados pelo Claude devem sempre ser conferidos no sistema do tribunal antes de qualquer providência.

## 6. Medir a qualidade (comparar com um gabarito)

Para saber se uma mudança no prompt melhorou de verdade, compare os resumos com um gabarito feito por você.

**6A. Montar o gabarito.** Faça isso uma vez, você mesmo, para 10 a 15 processos que conhece bem:

```text
PROCESSO: [número]
DEVE CONTER:
- Prazo: [ex.: 30 dias, intimação em 03/09/2026]
- Valor: [ex.: R$ 48.312,77]
- Providência: [ex.: impugnar cálculo]
- Ponto de atenção: [ex.: prescrição quinquenal parcial]
NÃO PODE CONTER:
- [ex.: afirmar que houve trânsito em julgado]
```

**6B. Avaliar o resumo.** Em uma conversa nova:

```text
<papel>
Você é avaliador rigoroso de resumos jurídicos.
</papel>

<gabarito>
[cole o gabarito do processo]
</gabarito>

<resumo>
[cole o resumo gerado pelo prompt que está sendo testado]
</resumo>

<tarefa>
1. Para cada item de "DEVE CONTER": ✅ presente e correto,
   ⚠️ presente com erro (explique) ou ❌ ausente.
2. Para cada item de "NÃO PODE CONTER": ✅ ausente ou ❌ presente.
3. Liste afirmações do resumo que não estão no gabarito e parecem
   inventadas ou duvidosas.
4. Nota final: (itens corretos ÷ total de itens) × 10, com uma casa
   decimal.
</tarefa>
```

Para comparar duas versões de um prompt, rode as duas nos mesmos processos e compare a média das notas. Mantenha a versão que tirou a maior média.
