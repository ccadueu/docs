#!/usr/bin/env bash
#
# apenas-monitor-nativo.sh (macOS)
#
# Desliga todos os monitores externos e mantem ligado apenas o monitor
# nativo (tela embutida do MacBook / iMac), sem usar o BetterDisplay.
#
# Depende do displayplacer:
#   brew install jakehilborn/jakehilborn/displayplacer
#
# Uso:
#   ./apenas-monitor-nativo.sh            # desliga os externos
#   ./apenas-monitor-nativo.sh --reverter # religa todos os monitores
#   ./apenas-monitor-nativo.sh --listar   # so mostra o que foi detectado

set -euo pipefail

REVERTER=0
LISTAR=0

for arg in "$@"; do
  case "$arg" in
    --reverter|-r) REVERTER=1 ;;
    --listar|-l)   LISTAR=1 ;;
    --ajuda|-h)    sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Opcao desconhecida: $arg (use --ajuda)" >&2; exit 2 ;;
  esac
done

if ! command -v displayplacer >/dev/null 2>&1; then
  cat >&2 <<'MSG'
displayplacer nao encontrado.

Instale com:
  brew install jakehilborn/jakehilborn/displayplacer

Sem ele, o macOS nao oferece nenhum comando nativo para desligar um monitor
externo individualmente -- as alternativas manuais estao no README.md.
MSG
  exit 1
fi

LISTA="$(displayplacer list)"

# O displayplacer imprime um bloco por monitor, separado por linha em branco.
# Interessam duas linhas de cada bloco:
#   Persistent screen id: <id>
#   Type: MacBook built in screen   <- monitor nativo
NATIVOS=()
EXTERNOS=()

id=""
tipo=""
flush_bloco() {
  [ -n "$id" ] || return 0
  if printf '%s' "$tipo" | grep -qi 'built in'; then
    NATIVOS+=("$id|$tipo")
  else
    EXTERNOS+=("$id|$tipo")
  fi
  id=""
  tipo=""
}

while IFS= read -r linha; do
  case "$linha" in
    "Persistent screen id: "*) id="${linha#Persistent screen id: }" ;;
    "Type: "*)                 tipo="${linha#Type: }" ;;
    "")                        flush_bloco ;;
  esac
done <<< "$LISTA"
flush_bloco

if [ "${#NATIVOS[@]}" -eq 0 ]; then
  echo "Nenhum monitor nativo (built in) detectado." >&2
  echo "Abortando para nao deixar a maquina sem nenhuma tela ligada." >&2
  exit 1
fi

echo "Monitor nativo:"
for m in "${NATIVOS[@]}"; do echo "  - ${m%%|*}  (${m#*|})"; done

if [ "${#EXTERNOS[@]}" -eq 0 ]; then
  echo "Nenhum monitor externo conectado -- nada a fazer."
  exit 0
fi

echo "Monitores externos:"
for m in "${EXTERNOS[@]}"; do echo "  - ${m%%|*}  (${m#*|})"; done

[ "$LISTAR" -eq 1 ] && exit 0

ESTADO="enabled:false"
ACAO="Desligando"
if [ "$REVERTER" -eq 1 ]; then
  ESTADO="enabled:true"
  ACAO="Religando"
fi

falhas=0
for m in "${EXTERNOS[@]}"; do
  ext_id="${m%%|*}"
  echo "$ACAO ${ext_id}..."
  if ! displayplacer "id:${ext_id} ${ESTADO}"; then
    echo "  Falhou em ${ext_id}." >&2
    falhas=$((falhas + 1))
  fi
done

if [ "$falhas" -gt 0 ]; then
  cat >&2 <<'MSG'

Pelo menos um monitor nao aceitou ser desligado por software. Isso e comum:
em varios Macs (sobretudo Apple Silicon) o "enabled:false" so funciona em
parte dos monitores. Veja as alternativas manuais no README.md.
MSG
  exit 1
fi

if [ "$REVERTER" -eq 1 ]; then
  echo "Pronto: todos os monitores foram religados."
else
  echo "Pronto: apenas o monitor nativo continua ligado."
fi
