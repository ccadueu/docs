# Resume todos os PDFs da pasta "documentos" usando o Claude.
#
# Como usar (detalhes no README.md deste guia):
#   1. Instale:  python -m pip install anthropic
#   2. Guarde sua chave na variável ANTHROPIC_API_KEY
#   3. Coloque os PDFs na pasta "documentos", ao lado deste arquivo
#   4. Rode:     python resumir.py
#
# Os resumos são salvos na pasta "resumos-prontos".

import base64
import os
from pathlib import Path

import anthropic

# ---------------------------------------------------------------------------
# AJUSTE AQUI, SE QUISER
# ---------------------------------------------------------------------------

# Papel que o Claude assume ao resumir.
PAPEL = "Você é um analista jurídico especializado em direito imobiliário, conhecido por resumos precisos e detalhados."

# Roteiro do resumo (Técnica 4 do guia). Troque o texto entre as aspas
# triplas pelo roteiro que preferir, mas não apague as aspas.
ROTEIRO = """Resuma o documento anexo usando exatamente as seções abaixo, cada uma
com o título em negrito e o conteúdo em tópicos:

1. Partes (locador, locatário, sublocatário, fiadores)
2. Imóvel (endereço, descrição, uso permitido)
3. Prazo e valores (início, fim, aluguel, reajuste, garantia/caução)
4. Responsabilidades (contas, manutenção, reparos)
5. Autorizações e notificações (consentimento do proprietário, como e em
   que prazo avisar a outra parte)
6. Cláusulas especiais (móveis, vagas, proibição de sublocar, multas)

Se alguma informação não estiver escrita no documento, escreva
"Não informado". Não deduza nem complete por conta própria.
Comece direto pelo resumo, sem introdução."""

# Modelo do Claude usado para resumir.
MODELO = "claude-opus-5-5"

# ---------------------------------------------------------------------------
# DAQUI PARA BAIXO NÃO PRECISA MEXER
# ---------------------------------------------------------------------------

PASTA = Path(__file__).resolve().parent
PASTA_DOCUMENTOS = PASTA / "documentos"
PASTA_RESUMOS = PASTA / "resumos-prontos"


def resumir_pdf(client: anthropic.Anthropic, caminho_pdf: Path) -> str:
    """Envia um PDF ao Claude e devolve o resumo em texto."""
    pdf_base64 = base64.standard_b64encode(caminho_pdf.read_bytes()).decode("utf-8")

    resposta = client.beta.messages.create(
        model=MODELO,
        max_tokens=16000,
        system=PAPEL,
        # Se o modelo principal recusar o pedido por engano, outro modelo
        # recomendado pela Anthropic tenta de novo automaticamente.
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "document",
                        "source": {
                            "type": "base64",
                            "media_type": "application/pdf",
                            "data": pdf_base64,
                        },
                    },
                    {"type": "text", "text": ROTEIRO},
                ],
            }
        ],
    )

    if resposta.stop_reason == "refusal":
        return "O Claude não resumiu este documento (pedido recusado)."

    texto = "".join(bloco.text for bloco in resposta.content if bloco.type == "text")
    if resposta.stop_reason == "max_tokens":
        texto += "\n\n[Atenção: o resumo foi cortado por ser longo demais.]"
    return texto


def main() -> None:
    pdfs = sorted(PASTA_DOCUMENTOS.glob("*.pdf"))
    if not pdfs:
        print(f"Nenhum PDF encontrado em: {PASTA_DOCUMENTOS}")
        return

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Chave da API não encontrada. Veja o Passo 3 do guia e reabra o Terminal.")
        return

    PASTA_RESUMOS.mkdir(exist_ok=True)
    client = anthropic.Anthropic()  # lê a chave da variável ANTHROPIC_API_KEY

    for numero, pdf in enumerate(pdfs, start=1):
        print(f"[{numero}/{len(pdfs)}] Resumindo {pdf.name}...")
        try:
            resumo = resumir_pdf(client, pdf)
        except anthropic.AuthenticationError:
            print("Chave da API inválida ou não encontrada. Veja o Passo 3 do guia.")
            return
        except anthropic.APIError as erro:
            print(f"  Erro ao resumir {pdf.name}: {erro}")
            continue

        destino = PASTA_RESUMOS / f"{pdf.stem}.md"
        destino.write_text(f"# Resumo: {pdf.name}\n\n{resumo}\n", encoding="utf-8")
        print(f"  Salvo em {destino.name}")

    print(f"\nPronto! Os resumos estão em: {PASTA_RESUMOS}")


if __name__ == "__main__":
    main()
