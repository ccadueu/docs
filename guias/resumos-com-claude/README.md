# Como fazer bons resumos de documentos com o Claude

Guia em português, simplificado para quem **não sabe programar**.

> **De onde veio este guia:** é uma adaptação livre do _cookbook_ "Summarization with Claude", da Anthropic (https://platform.claude.com/cookbook/capabilities-summarization-guide). O original foi escrito para programadores e usa contratos de sublocação como exemplo. Aqui, as mesmas ideias foram reescritas em linguagem simples e transformadas em **instruções prontas para copiar e colar**. Algumas partes foram atualizadas para os modelos atuais do Claude (veja a seção [O que mudou em relação ao original](#o-que-mudou-em-relação-ao-original)).

## Sumário

1. [A ideia em um minuto](#a-ideia-em-um-minuto)
2. [Dois caminhos: sem programar ou automatizando](#dois-caminhos-sem-programar-ou-automatizando)
3. [Caminho A: usando o Claude no navegador (sem programar)](#caminho-a-usando-o-claude-no-navegador-sem-programar)
   - [Técnica 1: resumo básico](#técnica-1-resumo-básico)
   - [Técnica 2: resumo com exemplos](#técnica-2-resumo-com-exemplos)
   - [Técnica 3: resumo guiado por um roteiro](#técnica-3-resumo-guiado-por-um-roteiro)
   - [Técnica 4: roteiro especializado para um tipo de documento](#técnica-4-roteiro-especializado-para-um-tipo-de-documento)
   - [Técnica 5: documentos muito longos ou vários documentos juntos](#técnica-5-documentos-muito-longos-ou-vários-documentos-juntos)
   - [Técnica 6: achar o documento certo no meio de vários](#técnica-6-achar-o-documento-certo-no-meio-de-vários)
4. [Como saber se o resumo ficou bom](#como-saber-se-o-resumo-ficou-bom)
5. [Como ir melhorando com o tempo](#como-ir-melhorando-com-o-tempo)
6. [Caminho B: automatizando com um pequeno programa](#caminho-b-automatizando-com-um-pequeno-programa)
7. [Resumo das boas práticas](#resumo-das-boas-práticas)
8. [Glossário](#glossário)
9. [O que mudou em relação ao original](#o-que-mudou-em-relação-ao-original)

## A ideia em um minuto

O guia original ensina uma coisa simples: **quanto mais claro você for sobre o que quer no resumo, melhor o resumo fica**. Ele faz isso em degraus:

1. Pedir só "resuma" funciona, mas o resultado varia muito.
2. Mostrar **exemplos** de resumos bons faz o Claude copiar o estilo.
3. Dar um **roteiro** (quais tópicos o resumo precisa ter) deixa tudo organizado e comparável.
4. Para documentos **muito longos**, resumir por partes e depois juntar.
5. Para **muitos documentos**, resumir cada um e usar esses resumos como um "índice" para achar o documento certo.
6. Sempre **conferir** a qualidade e ir ajustando o pedido.

O original usa documentos jurídicos (contratos) como exemplo, porque são longos, cheios de detalhes e de linguagem técnica: exatamente onde um bom resumo mais ajuda.

## Dois caminhos: sem programar ou automatizando

|                    | Caminho A: no navegador                             | Caminho B: com um programa                           |
| ------------------ | --------------------------------------------------- | ---------------------------------------------------- |
| Precisa programar? | Não                                                 | Só copiar, colar e seguir passos                     |
| Onde               | [claude.ai](https://claude.ai) (site ou aplicativo) | No seu computador, usando a "API" do Claude          |
| Custo              | Sua assinatura do Claude (ou o plano gratuito)      | Paga por uso, separado da assinatura                 |
| Bom para           | Resumir alguns documentos por dia                   | Resumir dezenas ou centenas de documentos de uma vez |

**Recomendação:** comece pelo Caminho A. Todas as técnicas do guia original funcionam nele. Só vá para o Caminho B se você precisar repetir a mesma tarefa em muitos arquivos.

## Caminho A: usando o Claude no navegador (sem programar)

**Como usar qualquer técnica abaixo:**

1. Abra o [claude.ai](https://claude.ai) e comece uma conversa nova.
2. Anexe o documento (clique no clipe 📎 ou arraste o PDF para a janela). Também dá para colar o texto direto.
3. Copie a instrução da técnica escolhida, cole na caixa de mensagem, ajuste o que estiver entre colchetes `[ ]` e envie.

> **Dica:** se você vai usar a mesma instrução todo dia, crie um **Projeto** no claude.ai e cole a instrução nas "instruções do projeto". Assim, basta anexar o documento e escrever "resuma".

### Técnica 1: resumo básico

O jeito mais simples. Serve para ter uma ideia geral rápida.

O truque do original aqui é **dar um papel ao Claude** ("você é um analista jurídico...") e pedir **tópicos**, em vez de texto corrido.

```text
Você é um analista jurídico conhecido por resumos precisos e detalhados.

Resuma o documento anexo em tópicos (marcadores), focando nas ideias
principais e nos detalhes importantes.

Comece direto pelo resumo, sem introdução.
```

**Limitação:** cada vez que você pedir, o formato pode sair diferente. Para documentos que você vai comparar entre si, use as próximas técnicas.

### Técnica 2: resumo com exemplos

Em vez de explicar o formato, você **mostra** um ou mais resumos que considera bons. O Claude percebe o padrão e imita, sem você precisar descrever regra por regra. O original recomenda **pelo menos 2 exemplos** (ele usa 3).

Na prática: pegue resumos antigos que você mesmo fez (ou que aprovou) e cole assim:

```text
Resuma o documento anexo em tópicos, focando nas ideias principais e nos
detalhes importantes. Comece direto pelo resumo, sem introdução.

Use os exemplos abaixo como modelo de formato, tamanho e nível de detalhe.

<exemplo1>
<documento>
[cole aqui o texto, ou um trecho, de um documento antigo]
</documento>
<resumo>
[cole aqui o resumo que você considera bom para ele]
</resumo>
</exemplo1>

<exemplo2>
<documento>
[outro documento antigo]
</documento>
<resumo>
[o resumo bom dele]
</resumo>
</exemplo2>
```

> **Por que essas "etiquetas" `<exemplo1>`, `<resumo>`?** São só marcadores para o Claude não confundir onde começa e termina cada parte. Não precisa entender nada de programação: é como colocar o texto dentro de pastas com nome.

### Técnica 3: resumo guiado por um roteiro

Aqui você diz **exatamente quais tópicos** o resumo precisa ter. É a técnica que mais melhora a qualidade, porque o Claude passa a procurar informações específicas em vez de decidir sozinho o que é importante.

Roteiro geral para documentos jurídicos:

```text
Você é um analista jurídico conhecido por resumos precisos e detalhados.

Resuma o documento anexo cobrindo obrigatoriamente estes pontos:

1. Partes envolvidas
2. Assunto principal
3. Principais termos e condições
4. Datas e prazos importantes
5. Cláusulas incomuns ou que merecem atenção

Escreva em tópicos dentro de cada item. Comece direto pelo resumo.
```

### Técnica 4: roteiro especializado para um tipo de documento

É a Técnica 3 levada um passo adiante: o roteiro é feito **sob medida** para um tipo de documento que você recebe sempre. Dois detalhes importantes do original:

- Pedir que cada seção venha **separada e com título fixo**, para todos os resumos ficarem iguais e fáceis de comparar.
- Pedir que, se uma informação não estiver no documento, o Claude escreva **"Não informado"**. Isso evita que ele "invente" algo para preencher o espaço.

**Exemplo 1: contrato de locação ou sublocação** (o tipo usado no original):

```text
Você é um analista jurídico especializado em direito imobiliário.

Resuma o contrato anexo usando exatamente as seções abaixo, cada uma com
o título em negrito e o conteúdo em tópicos:

1. Partes (locador, locatário, sublocatário, fiadores)
2. Imóvel (endereço, descrição, uso permitido)
3. Prazo e valores (início, fim, aluguel, reajuste, garantia/caução)
4. Responsabilidades (contas, manutenção, reparos)
5. Autorizações e notificações (consentimento do proprietário, como
   e em que prazo avisar a outra parte)
6. Cláusulas especiais (móveis, vagas, proibição de sublocar, multas)

Se alguma informação não estiver escrita no documento, escreva
"Não informado". Não deduza nem complete por conta própria.
Comece direto pelo resumo, sem introdução.
```

**Exemplo 2: processo judicial ou petição** (adaptado para o dia a dia de quem trabalha com processos):

```text
Você é um analista jurídico especializado em contencioso.

Resuma a peça/processo anexo usando exatamente as seções abaixo:

1. Identificação (número do processo, vara/juízo, classe)
2. Partes e advogados
3. Fatos alegados (em poucos tópicos)
4. Pedidos (liste todos, incluindo pedidos de urgência)
5. Valor da causa e valores pedidos
6. Prazos, audiências e intimações mencionados
7. Pontos de atenção (prescrição, competência, documentos faltando,
   argumentos fracos ou fortes)

Para cada informação importante, indique a página ou o trecho de onde
ela foi tirada. Se algo não constar, escreva "Não informado".
Comece direto pelo resumo, sem introdução.
```

> **Dica:** pedir "indique a página" facilita muito a conferência depois.

### Técnica 5: documentos muito longos ou vários documentos juntos

O original chama isso de **meta-resumo** ("resumo de resumos"). A ideia:

1. Dividir o material em partes.
2. Resumir cada parte com o mesmo roteiro.
3. Juntar os resumos parciais em um resumo final único.

**Quando usar:** quando o documento é longo demais para o Claude ler de uma vez (ele avisa que o arquivo é grande demais), ou quando você tem vários documentos ligados ao mesmo caso (por exemplo, o contrato, dois aditivos e uma notificação).

> Hoje o Claude aceita documentos bem grandes (centenas de páginas) de uma vez só, então muitas vezes este passo nem é necessário. Use quando bater no limite ou quando quiser um resumo por documento antes do resumo geral.

**Como fazer no navegador:**

1. Na mesma conversa, anexe o primeiro documento (ou a primeira parte) e use a instrução da Técnica 4.
2. Repita para os demais documentos/partes, na mesma conversa.
3. No final, envie:

```text
Agora junte todos os resumos que você fez nesta conversa em um único
resumo final, usando as mesmas seções.

Os documentos são relacionados entre si. Quando um documento posterior
alterar algo de um anterior (por exemplo, um aditivo mudando o valor),
mostre o valor atual e indique de qual documento ele veio.

Se houver contradição entre documentos, aponte a contradição em vez de
escolher um lado. Se algo não constar em nenhum, escreva "Não informado".
```

### Técnica 6: achar o documento certo no meio de vários

O original chama isso de **"documentos indexados por resumo"** (uma forma avançada do que se chama RAG, veja o [Glossário](#glossário)). A ideia é a de um **fichário**:

1. Você faz um resumo curto de cada documento (como a ficha de um arquivo).
2. Quando surge uma pergunta, em vez de reler todos os documentos, o Claude olha só as fichas e diz quais documentos têm mais chance de responder, dando uma **nota de 0 a 10**.
3. Depois, ele abre só o documento mais relevante e copia **os trechos exatos** que respondem à pergunta.

No teste do original, com três contratos, o documento certo recebeu nota 8 e os outros, nota 0. Além disso, o Claude percebeu que a pergunta dizia "LLC" e o documento dizia "Inc." (uma pequena diferença no nome da empresa) e avisou.

**Como fazer no navegador:**

Passo 1, em um Projeto do claude.ai com todos os documentos anexados:

```text
Para cada documento anexado, faça uma ficha curta (no máximo 5 linhas)
com: nome do arquivo, tipo de documento, partes, assunto e datas
principais.
```

Guarde essas fichas (por exemplo, cole nas instruções do Projeto).

Passo 2, quando tiver uma pergunta:

```text
Pergunta: [ex.: qual contrato tem a empresa X como sublocadora?]

1. Dê uma nota de 0 a 10 para cada ficha, conforme a chance de o
   documento responder à pergunta. Mostre a lista em ordem da maior
   para a menor nota.
2. Abra o documento com a maior nota e copie, palavra por palavra, os
   trechos que respondem à pergunta, separando cada trecho com ---.
3. Se a pergunta tiver algum dado que não bate exatamente com o
   documento (nome, data, número), avise.
```

**Boas práticas do original para essa técnica:**

- **Tamanho da ficha:** teste fichas mais curtas e mais longas. Curta demais perde informação; longa demais perde a vantagem.
- **Refinar em rodadas:** com muitos documentos, faça a triagem em duas etapas (primeiro separa os 10 mais prováveis, depois escolhe entre eles).
- **Reaproveitar:** as fichas só precisam ser feitas uma vez. Guarde e reutilize.

## Como saber se o resumo ficou bom

O original admite: **avaliar resumo é difícil**. Dois resumos diferentes podem estar igualmente certos, e o que é "bom" depende de quem vai ler e para quê.

Para programadores, ele usa duas ferramentas (ROUGE, que compara palavras com um resumo de referência, e Promptfoo, que roda testes automáticos). Para quem não programa, o equivalente prático é um **checklist de conferência**. Pegue 3 a 5 documentos que você conhece bem e confira:

- [ ] **Está tudo lá?** Todas as seções do roteiro foram preenchidas (ou marcadas como "Não informado")?
- [ ] **Está certo?** Nomes, datas, valores e números batem com o documento? (Confira pelo menos os números, sempre.)
- [ ] **Nada inventado?** Há alguma informação que não aparece no documento?
- [ ] **"Não informado" é verdade?** Quando ele diz que algo não consta, realmente não consta?
- [ ] **Tamanho certo?** Dá para ler em 1 a 2 minutos? Está curto demais e perdeu algo importante?
- [ ] **Serve para decidir?** Lendo só o resumo, você saberia o que fazer com o documento?

Você também pode pedir ao próprio Claude para conferir, numa conversa nova:

```text
Abaixo está um documento e um resumo dele. Confira o resumo como um
revisor rigoroso: aponte (1) informações erradas, (2) informações
inventadas, (3) informações importantes que faltaram. Cite o trecho do
documento em cada apontamento.

<documento>
[anexe ou cole o documento]
</documento>

<resumo>
[cole o resumo]
</resumo>
```

**Régua realista (conselho do original):** não espere 100% de acerto. Compare com o que **um bom profissional humano** faria no mesmo tempo. E nunca use um resumo como substituto da leitura do documento quando a decisão for importante.

## Como ir melhorando com o tempo

O original termina com um ciclo de melhoria contínua. Em linguagem simples:

1. **Veja onde erra.** Use o checklist acima e anote os erros que se repetem.
2. **Ajuste o pedido.** Se ele sempre esquece um dado, acrescente esse item no roteiro. Se fica longo demais, peça "no máximo X linhas por seção".
3. **Combine técnicas.** O melhor resultado costuma vir de **roteiro (Técnica 4) + exemplos (Técnica 2)** juntos.
4. **Teste como dividir documentos longos.** Por capítulo, por peça processual, por número de páginas: veja o que dá resumos melhores.
5. **Revise o próprio teste.** Às vezes o "erro" é do roteiro: no original, um teste falhava porque pedia uma informação que simplesmente não existia em alguns documentos.

## Caminho B: automatizando com um pequeno programa

Use este caminho só se você precisar resumir **muitos arquivos de uma vez**. Não é preciso saber programar: você vai copiar um arquivo pronto e rodar um comando.

> **Importante:** a "API" (o acesso do Claude para programas) é cobrada **por uso**, separadamente da assinatura do claude.ai. Resumir um contrato custa, em geral, poucos centavos de dólar, mas confira os preços em https://claude.com/pricing antes.

### Passo 1: instalar o Python

O Python é o programa que vai "ler" o arquivo de instruções.

- **Windows:** baixe em https://www.python.org/downloads/ e, na instalação, **marque a caixa "Add python.exe to PATH"**.
- **Mac:** baixe no mesmo site e instale normalmente.

Para conferir, abra o **Terminal** (Mac) ou o **Prompt de Comando** (Windows: tecla Windows, digite `cmd`, Enter) e digite:

```bash
python --version
```

Deve aparecer algo como `Python 3.12.x`. (No Mac, se não funcionar, use `python3` no lugar de `python` em todos os comandos.)

### Passo 2: instalar a biblioteca do Claude

No mesmo Terminal/Prompt, digite:

```bash
python -m pip install anthropic
```

### Passo 3: criar sua chave de acesso (API key)

1. Acesse https://platform.claude.com e entre com sua conta.
2. Cadastre uma forma de pagamento / créditos (em "Billing").
3. Vá em "API Keys" e clique em "Create Key". Copie a chave (começa com `sk-ant-`).

> **Trate a chave como uma senha.** Não envie por e-mail, não coloque em documentos compartilhados.

Agora "guarde" a chave no computador para o programa encontrá-la:

- **Windows** (Prompt de Comando):

  ```bash
  setx ANTHROPIC_API_KEY "cole-sua-chave-aqui"
  ```

  Depois **feche e abra de novo** o Prompt de Comando.

- **Mac** (Terminal):

  ```bash
  echo 'export ANTHROPIC_API_KEY="cole-sua-chave-aqui"' >> ~/.zshrc
  ```

  Depois **feche e abra de novo** o Terminal.

### Passo 4: preparar as pastas

1. Crie uma pasta, por exemplo `resumos`, na sua Área de Trabalho.
2. Dentro dela, crie uma pasta chamada `documentos` e coloque lá os PDFs que você quer resumir.
3. Baixe o arquivo [`resumir.py`](./resumir.py) deste guia e coloque na pasta `resumos` (ao lado da pasta `documentos`, não dentro dela).

Fica assim:

```text
resumos/
├── resumir.py
└── documentos/
    ├── contrato-1.pdf
    ├── contrato-2.pdf
    └── ...
```

### Passo 5: (opcional) ajustar o roteiro

Abra o `resumir.py` com o Bloco de Notas (Windows) ou TextEdit (Mac). Logo no começo há um trecho chamado `ROTEIRO`, com as mesmas seções da Técnica 4. Você pode trocar o texto entre as aspas triplas `"""` pelo roteiro que preferir (por exemplo, o de processo judicial). **Não apague as aspas.**

### Passo 6: rodar

No Terminal/Prompt, entre na pasta e rode o programa:

```bash
cd Desktop/resumos
python resumir.py
```

(Se a Área de Trabalho estiver em português no seu sistema, pode ser `cd "Área de Trabalho/resumos"`. No Windows com OneDrive, pode ser `cd OneDrive\Desktop\resumos`.)

O programa vai resumir cada PDF e salvar o resultado numa pasta nova chamada `resumos-prontos`, um arquivo `.md` (texto simples, abre no Bloco de Notas) para cada documento.

### Se algo der errado

| Mensagem                                         | O que fazer                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `python não é reconhecido` / `command not found` | Reinstale o Python marcando "Add to PATH" (Windows) ou use `python3` (Mac).     |
| `No module named 'anthropic'`                    | Rode de novo o Passo 2.                                                         |
| `AuthenticationError` ou erro sobre a chave      | A chave está errada ou não foi salva. Refaça o Passo 3 e **reabra** o Terminal. |
| Erro de crédito / `billing`                      | Adicione créditos na sua conta em platform.claude.com.                          |
| `Nenhum PDF encontrado`                          | Confira se os PDFs estão dentro da pasta `documentos`.                          |

## Resumo das boas práticas

As seis recomendações finais do guia original:

1. **Seja claro e específico** no pedido, e use restrições como "comece direto, sem introdução".
2. **Mostre pelo menos 2 exemplos** de resumos bons.
3. **Use roteiros sob medida** para cada tipo de documento.
4. **Divida documentos muito longos** e depois junte os resumos.
5. **Avalie e ajuste com frequência.**
6. **Lembre-se dos limites:** resumo feito por IA ajuda, mas não substitui a leitura quando a decisão é importante, e cuidado com documentos sigilosos.

## Glossário

- **Prompt:** a instrução que você escreve para o Claude.
- **Few-shot / multi-shot:** dar alguns exemplos dentro do prompt para o Claude imitar.
- **Resumo guiado:** resumo que segue um roteiro de tópicos definido por você.
- **Meta-resumo:** resumo feito a partir de vários resumos menores.
- **Token:** pedacinho de texto que o modelo lê (mais ou menos ¾ de uma palavra). Os limites e os preços são contados em tokens.
- **Janela de contexto:** quanto texto o Claude consegue "ter na cabeça" de uma vez.
- **RAG:** técnica em que o sistema primeiro **busca** os documentos relevantes e só depois **responde** com base neles.
- **API:** a porta de entrada do Claude para programas (em vez de pessoas, no site).
- **API key (chave da API):** a senha que identifica você (e sua conta de cobrança) quando um programa usa o Claude.
- **ROUGE / Promptfoo:** ferramentas para avaliar resumos automaticamente, usadas no original por programadores.

## O que mudou em relação ao original

Para quem quiser comparar com o texto em inglês:

- **Modelos atualizados.** O original usa modelos de 2024/2025. O programa deste guia usa o `claude-opus-5-5`, modelo atual da Anthropic.
- **Sem "preenchimento da resposta" (prefill).** O original começava a resposta do Claude com a etiqueta `<summary>` e mandava parar em `</summary>`. Os modelos atuais não aceitam mais esse truque; no lugar, a instrução simplesmente pede para "começar direto pelo resumo".
- **PDF enviado direto.** O original convertia o PDF em texto com outra biblioteca (`pypdf`) e cortava o texto se fosse grande. Hoje o Claude lê o PDF diretamente (inclusive tabelas e páginas escaneadas), o que simplifica tudo.
- **Partes para programadores resumidas.** O código de avaliação automática (ROUGE, Promptfoo, gráficos) e a classe Python do "índice de resumos" foram substituídos por um checklist e por instruções equivalentes para usar no navegador.
- **Exemplo brasileiro.** Foi acrescentado um roteiro para processos judiciais e petições.
