# Apenas o monitor nativo

Scripts para **desligar os monitores externos e manter ligado somente o monitor
nativo** (a tela interna do notebook), sem depender do BetterDisplay nem de
qualquer outro app de terceiros pago.

| Arquivo                     | Sistema | Precisa instalar algo?                             |
| --------------------------- | ------- | -------------------------------------------------- |
| `apenas-monitor-nativo.ps1` | Windows | Não — usa o `DisplaySwitch.exe` do próprio Windows |
| `apenas-monitor-nativo.sh`  | macOS   | Sim — `displayplacer` (Homebrew)                   |

---

## Windows

O Windows já resolve isso nativamente. O jeito mais rápido, sem script nenhum:

> **Win + P** → **Somente tela do computador**

O script faz exatamente a mesma coisa, mas de forma automatizável (atalho,
tarefa agendada, ícone na barra):

```powershell
# desliga os externos, mantém só a tela interna
.\apenas-monitor-nativo.ps1

# volta a usar todos os monitores
.\apenas-monitor-nativo.ps1 -Modo Estender
```

Modos aceitos: `Nativo` (padrão), `Externo`, `Estender`, `Espelhar`, `Primario`.

Se o PowerShell bloquear a execução do arquivo:

```powershell
powershell -ExecutionPolicy Bypass -File .\apenas-monitor-nativo.ps1
```

Equivalente em uma linha só, sem script:

```powershell
DisplaySwitch.exe /internal
```

---

## macOS

O macOS **não tem** comando nem botão nativo para desligar um monitor externo
individualmente — por isso a existência de apps como o BetterDisplay. A
alternativa gratuita e de linha de comando é o `displayplacer`:

```bash
brew install jakehilborn/jakehilborn/displayplacer
```

Depois:

```bash
chmod +x apenas-monitor-nativo.sh

./apenas-monitor-nativo.sh --listar    # mostra o que foi detectado, sem mexer em nada
./apenas-monitor-nativo.sh             # desliga todos os externos
./apenas-monitor-nativo.sh --reverter  # religa todos
```

O script identifica o monitor nativo pela linha `Type: ... built in screen` do
`displayplacer list` e aplica `enabled:false` em todos os demais. Se nenhum
monitor nativo for encontrado, ele aborta — para não deixar a máquina sem
nenhuma tela ligada.

### Se o `enabled:false` não funcionar

Em vários Macs (principalmente Apple Silicon) o `displayplacer` não consegue
desabilitar certos monitores; ele avisa e o script sai com erro. Nesses casos as
saídas sem app pago são:

1. **Desconectar o cabo / desligar o hub** — é o único método 100% confiável.
2. **Botão de energia do próprio monitor** — o macOS ainda enxerga o monitor,
   mas ele para de exibir e de consumir.
3. **Espelhar tudo na tela interna** (`Cmd + F1`, ou Ajustes do Sistema →
   Telas → Espelhar). Não desliga o externo, mas elimina a área de trabalho
   estendida — resolve quando o incômodo é a janela “fugir” para o outro monitor.
4. **Sistema fechado (clamshell) invertido**: se a intenção é o oposto — usar só
   o externo — basta fechar a tampa com o Mac na energia.

---

## Linux (bônus)

Em sessões X11, sem script:

```bash
xrandr                                   # lista as saídas (eDP-1 costuma ser a nativa)
xrandr --output eDP-1 --auto --primary
xrandr --output HDMI-1 --off             # repita para cada saída externa
```

Em Wayland isso varia por ambiente: GNOME/KDE têm o mesmo controle em
_Configurações → Telas_, desativando cada monitor externo.

---

## Observações

- Os scripts foram escritos e revisados aqui, mas **não puderam ser executados
  em macOS/Windows reais** — este ambiente é um container Linux. A lógica de
  parsing do `displayplacer` foi testada com uma saída simulada de três
  monitores; o `DisplaySwitch.exe /internal` é o comando padrão do próprio
  Windows.
- Nenhum dos dois scripts instala, desinstala ou altera o BetterDisplay: eles
  simplesmente não dependem dele.
