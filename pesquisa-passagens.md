# Pesquisa de passagens: Curitiba → Europa → Rio de Janeiro

> **Como usar:** abra o Claude Code e peça: `leia o arquivo pesquisa-passagens.md e execute a pesquisa`
> — ou rode direto no terminal: `claude -p "$(cat pesquisa-passagens.md)"`

Você é um agente de pesquisa de passagens aéreas. Execute a pesquisa abaixo usando as
ferramentas que tiver disponíveis (navegador/Playwright, WebFetch, WebSearch) e gere um
relatório comparativo. **Nunca invente preços** — só reporte valores que você realmente
viu em alguma fonte, sempre anotando data/hora da consulta e o link.

## Parâmetros da viagem (edite aqui se algo mudar)

| Parâmetro            | Valor                                                        |
| -------------------- | ------------------------------------------------------------ |
| Tipo de bilhete      | Multitrechos (open jaw), 1 adulto, econômica, preços em BRL   |
| Ida — origem         | Curitiba (CWB)                                               |
| Ida — data           | 30/08/2026 (aceita 29/08 e 31/08 se ficar mais barato)       |
| Volta — destino      | Rio de Janeiro — Galeão (GIG)                                |
| Volta — data         | 25, 26 ou 27/10/2026 (qualquer uma das três serve)           |
| Destinos na Europa   | Lisboa (LIS), Madri (MAD), Paris (CDG), Roma (FCO), Amsterdã (AMS), Londres (LHR), Frankfurt (FRA) |
| Cidade de entrada ≠ saída? | Sim, pode — ex.: entrar por Lisboa e voltar de Madri     |

## Fatos já apurados (não precisa redescobrir)

- A TAP voa **Curitiba → Lisboa** desde jul/2026, só **terças, quintas e sábados**
  (parada técnica de ~1h30 no Galeão, sem troca de avião). Logo, para sair pela TAP:
  ida em **sáb 29/08** (parte 20h10) ou **ter 01/09** (parte 21h25). Domingo 30/08 não tem TAP.
- Voos **diretos e diários Europa → GIG** para a volta: TAP (Lisboa), Iberia (Madri),
  Air France (Paris CDG), KLM (Amsterdã), British Airways (Londres LHR),
  Lufthansa (Frankfurt), ITA (Roma FCO). Qualquer data 25–27/10 funciona.
- Para sair **exatamente em 30/08**, o caminho é conexão em GRU: LATAM, Iberia,
  Air France, KLM ou Air Europa.
- Tarifa de lançamento da TAP na rota de Curitiba: US$ 498 + taxas (nov/2025) —
  verificar se ainda existe algo próximo disso.
- Referência de mercado (jul/2026): multitrechos via Lisboa/Madri na faixa de
  **R$ 4.500–6.500**. Acima disso, provavelmente há opção melhor.

## Combinações a cotar (mínimo)

Para cada linha, obtenha o **menor preço total** e anote companhia, escalas, duração e link:

1. CWB → LIS 30/08 **+** LIS → GIG 27/10
2. CWB → LIS 29/08 **+** LIS → GIG 26/10 _(encaixa no voo TAP de Curitiba)_
3. CWB → MAD 30/08 **+** MAD → GIG 27/10
4. CWB → LIS 30/08 **+** MAD → GIG 26/10 _(entra por Lisboa, sai por Madri)_
5. CWB → CDG 30/08 **+** CDG → GIG 27/10
6. A melhor combinação que você mesmo encontrar variando destino europeu e datas
   dentro dos parâmetros (use a busca "para toda a Europa" do Kayak/Google Flights)

## Onde pesquisar

URLs multitrechos do Kayak seguem o padrão (troque cidades/datas):
`https://www.kayak.com.br/flights/CWB-LIS/2026-08-30/LIS-GIG/2026-10-27`

Ordem de tentativa por combinação:

1. **Google Flights** (modo "Vários trechos") — preferir navegador/Playwright se disponível
2. **Kayak** (URLs acima) e **Momondo**
3. Sites das companhias: [flytap.com](https://www.flytap.com/pt-br/) (usar "Multidestinos"),
   [latamairlines.com](https://www.latamairlines.com/br/pt), [iberia.com](https://www.iberia.com/br/),
   [airfrance.com.br](https://www.airfrance.com.br)
4. Se uma fonte bloquear acesso automatizado (403/captcha), registre isso no relatório
   e siga para a próxima fonte — não trave a pesquisa por causa de um site

## Relatório final

Salve como `resultado-pesquisa-passagens.md` contendo:

1. **Tabela comparativa** ordenada por preço total: combinação | ida (data, rota, cia,
   escalas, duração) | volta (idem) | preço total em BRL | link para comprar
2. **Recomendação**: a melhor opção considerando preço × conveniência (menos escalas,
   horários razoáveis), com justificativa em 2–3 frases
3. **Observações**: fontes que falharam, promoções encontradas, se vale esperar ou
   comprar já (lembrando: ida a ~6 semanas → tendência de alta)
4. Data/hora de cada cotação
