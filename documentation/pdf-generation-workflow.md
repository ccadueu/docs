# Fluxo de Geração de PDF — Links do site da Coreplan

Este documento descreve, passo a passo, como transformar uma lista de links
do site da **Coreplan** em um único arquivo PDF. O fluxo segue o pipeline:

```text
Copiar links  →  Atalho  →  SSH  →  Playwright  →  Merge  →  PDF pronto
```

A renderização é feita por um **script local** com o [Playwright](https://playwright.dev/),
que abre cada página, gera um PDF por página e, ao final, junta tudo em um
documento só. O acesso via SSH é opcional: serve apenas para rodar o mesmo
script em uma máquina remota, caso você prefira não executá-lo no seu
computador.

> **Resumo:** este é um documento de referência. Os blocos de código abaixo
> são exemplos prontos para copiar, mas o objetivo aqui é descrever o
> processo, não manter um pacote executável dentro deste repositório.

---

## Visão geral das etapas

| # | Etapa          | O que acontece                                                        |
| - | -------------- | -------------------------------------------------------------------- |
| 1 | Copiar links   | Você coleta as URLs das páginas da Coreplan em um arquivo de texto.  |
| 2 | Atalho         | Um alias/atalho dispara o script sem você digitar o comando inteiro. |
| 3 | SSH (opcional) | Caso queira rodar em outra máquina, você conecta via SSH.            |
| 4 | Playwright     | O script abre cada link e gera um PDF por página.                    |
| 5 | Merge          | Os PDFs individuais são unidos em um único arquivo.                  |
| 6 | PDF pronto     | O arquivo final fica disponível para download/uso.                   |

---

## 1. Copiar links

Reúna as URLs das páginas da Coreplan que você quer no PDF. Coloque uma URL
por linha em um arquivo de texto simples, por exemplo `links.txt`:

```text
https://www.coreplan.com.br/pagina-1
https://www.coreplan.com.br/pagina-2
https://www.coreplan.com.br/pagina-3
```

Dicas:

- Uma URL por linha, sem vírgulas.
- A **ordem das linhas** define a ordem das páginas no PDF final.
- Linhas em branco e linhas começando com `#` podem ser ignoradas pelo
  script (comentários).

---

## 2. Atalho

Para não digitar o comando inteiro toda vez, crie um atalho (alias) no seu
shell. No `~/.bashrc` ou `~/.zshrc`:

```bash
alias coreplan-pdf='node ~/coreplan-pdf/gerar-pdf.js ~/coreplan-pdf/links.txt'
```

Depois recarregue o shell (`source ~/.bashrc`) e basta rodar:

```bash
coreplan-pdf
```

> No macOS você também pode mapear isso para um atalho de teclado usando o
> app **Atalhos (Shortcuts)** ou o Automator, chamando o mesmo comando.

---

## 3. SSH (opcional)

Se preferir rodar a geração em uma máquina remota (por exemplo, um servidor
com mais recursos ou já preparado com o Playwright), conecte via SSH e
execute o mesmo atalho lá:

```bash
ssh usuario@servidor.exemplo.com
# já na máquina remota:
coreplan-pdf
```

Para trazer o PDF de volta para a sua máquina depois de gerado:

```bash
scp usuario@servidor.exemplo.com:~/coreplan-pdf/coreplan.pdf ./
```

> Se você vai rodar tudo localmente, **pule esta etapa**.

---

## 4. Playwright (renderização)

O Playwright abre cada link em um navegador headless e exporta a página como
PDF. Instalação única, na pasta do projeto:

```bash
npm init -y
npm install playwright pdf-merger-js
npx playwright install chromium
```

Exemplo de script (`gerar-pdf.js`) que lê o `links.txt`, gera um PDF por
página e já faz o merge no final:

```js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const PDFMerger = require('pdf-merger-js');

async function main() {
  const arquivoLinks = process.argv[2] || 'links.txt';

  // 1. Copiar links: lê e limpa a lista (ignora vazias e comentários)
  const links = fs
    .readFileSync(arquivoLinks, 'utf-8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  if (links.length === 0) {
    throw new Error(`Nenhum link encontrado em ${arquivoLinks}`);
  }

  const pastaTmp = path.join(__dirname, 'tmp-pdfs');
  fs.mkdirSync(pastaTmp, { recursive: true });

  // 2. Playwright: gera um PDF por página
  const browser = await chromium.launch();
  const merger = new PDFMerger();
  const arquivosGerados = [];

  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    const destino = path.join(pastaTmp, `pagina-${i + 1}.pdf`);
    console.log(`(${i + 1}/${links.length}) Renderizando ${url}`);

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.pdf({ path: destino, format: 'A4', printBackground: true });
    await page.close();

    arquivosGerados.push(destino);
  }

  await browser.close();

  // 3. Merge: junta tudo em um único PDF
  for (const arquivo of arquivosGerados) {
    await merger.add(arquivo);
  }

  const saida = path.join(__dirname, 'coreplan.pdf');
  await merger.save(saida);

  // Limpeza dos PDFs temporários
  fs.rmSync(pastaTmp, { recursive: true, force: true });

  console.log(`PDF pronto: ${saida}`);
}

main().catch((err) => {
  console.error('Falha ao gerar PDF:', err);
  process.exit(1);
});
```

Pontos importantes:

- `waitUntil: 'networkidle'` espera a página parar de carregar antes de
  exportar — útil para páginas que montam conteúdo via JavaScript.
- `printBackground: true` mantém cores de fundo e imagens.
- `format: 'A4'` define o tamanho da página; troque por `Letter` se preferir.

---

## 5. Merge

No script acima, o merge já acontece automaticamente com a biblioteca
[`pdf-merger-js`](https://www.npmjs.com/package/pdf-merger-js): cada PDF de
página é adicionado na ordem da lista e salvo como um arquivo único.

Se preferir fazer o merge manualmente (por exemplo, com PDFs gerados em
momentos diferentes), você pode usar a ferramenta de linha de comando
`pdfunite` (do pacote `poppler-utils`):

```bash
pdfunite tmp-pdfs/pagina-1.pdf tmp-pdfs/pagina-2.pdf coreplan.pdf
```

---

## 6. PDF pronto

Ao final, o arquivo `coreplan.pdf` estará na pasta do projeto, com todas as
páginas da Coreplan na ordem definida no `links.txt`.

```text
coreplan-pdf/
├── gerar-pdf.js
├── links.txt
└── coreplan.pdf   ← resultado final
```

Se você gerou o PDF em uma máquina remota, lembre-se de trazê-lo de volta
com `scp` (ver a etapa **SSH**).

---

## Solução de problemas

| Sintoma                                   | Causa provável / solução                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| Página em branco no PDF                   | Conteúdo carrega via JS; aumente a espera ou use `page.waitForSelector(...)`.             |
| `Executable doesn't exist`                | Rode `npx playwright install chromium`.                                                   |
| Cores/imagens de fundo sumindo            | Garanta `printBackground: true` no `page.pdf(...)`.                                       |
| Páginas fora de ordem                     | A ordem segue o `links.txt`; reordene as linhas.                                          |
| Tempo limite (`Timeout`) ao abrir página  | Aumente o timeout: `page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })`.        |
