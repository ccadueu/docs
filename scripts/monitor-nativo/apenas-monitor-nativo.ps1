<#
.SYNOPSIS
    Deixa ligado apenas o monitor nativo (tela interna) do notebook, no Windows.

.DESCRIPTION
    Usa o DisplaySwitch.exe, que ja vem com o Windows -- nao precisa instalar
    nada nem usar BetterDisplay. O modo /internal desliga todos os monitores
    externos e mantem apenas o painel interno.

    Em desktops (sem tela interna) o /internal nao tem efeito util; nesse caso
    use -Modo Primario, que faz o Windows projetar so no monitor principal.

.PARAMETER Modo
    Nativo   (padrao) -> apenas a tela interna do notebook  (DisplaySwitch /internal)
    Externo             -> apenas os monitores externos      (DisplaySwitch /external)
    Estender            -> volta a usar todos os monitores    (DisplaySwitch /extend)
    Espelhar            -> duplica a imagem em todos          (DisplaySwitch /clone)
    Primario            -> alias de Nativo, para desktops

.EXAMPLE
    .\apenas-monitor-nativo.ps1
    .\apenas-monitor-nativo.ps1 -Modo Estender
#>

[CmdletBinding()]
param(
    [ValidateSet('Nativo', 'Externo', 'Estender', 'Espelhar', 'Primario')]
    [string]$Modo = 'Nativo'
)

$ErrorActionPreference = 'Stop'

$argumento = switch ($Modo) {
    'Nativo'   { '/internal' }
    'Primario' { '/internal' }
    'Externo'  { '/external' }
    'Estender' { '/extend' }
    'Espelhar' { '/clone' }
}

$displaySwitch = Join-Path $env:WINDIR 'System32\DisplaySwitch.exe'
if (-not (Test-Path $displaySwitch)) {
    Write-Error "DisplaySwitch.exe nao encontrado em $displaySwitch. Use Win+P e escolha 'Somente tela do computador'."
    exit 1
}

Write-Host "Aplicando modo '$Modo' ($argumento)..."
Start-Process -FilePath $displaySwitch -ArgumentList $argumento -Wait
Write-Host 'Pronto.'
if ($Modo -in @('Nativo', 'Primario')) {
    Write-Host 'Apenas o monitor nativo continua ligado. Para reverter: .\apenas-monitor-nativo.ps1 -Modo Estender'
}
