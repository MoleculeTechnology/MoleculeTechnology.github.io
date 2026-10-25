param([int]$Port = 1313)

$ErrorActionPreference = 'Stop'
$repositoryPath = Split-Path -Parent $PSScriptRoot
$hugoVersion = '0.115.4'
$toolDirectory = Join-Path $repositoryPath ".tools\hugo\$hugoVersion"
$hugoExecutable = Join-Path $toolDirectory 'hugo.exe'

if (-not (Test-Path -LiteralPath $hugoExecutable)) {
    New-Item -ItemType Directory -Path $toolDirectory -Force | Out-Null
    $archiveName = "hugo_extended_${hugoVersion}_windows-amd64.zip"
    $archivePath = Join-Path $toolDirectory $archiveName
    $checksumPath = Join-Path $toolDirectory 'checksums.txt'
    $releaseUrl = "https://github.com/gohugoio/hugo/releases/download/v$hugoVersion"
    Invoke-WebRequest -Uri "$releaseUrl/$archiveName" -OutFile $archivePath -TimeoutSec 60
    Invoke-WebRequest -Uri "$releaseUrl/hugo_${hugoVersion}_checksums.txt" -OutFile $checksumPath -TimeoutSec 30
    $checksumLine = Get-Content -LiteralPath $checksumPath | Where-Object { $_.EndsWith("  $archiveName") }
    if (-not $checksumLine) { throw 'The published Hugo checksum was not found.' }
    $expectedChecksum = ($checksumLine -split '\s+')[0]
    $actualChecksum = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash
    if ($actualChecksum -ine $expectedChecksum) { throw 'The Hugo download does not match its published checksum.' }
    Expand-Archive -LiteralPath $archivePath -DestinationPath $toolDirectory -Force
}

Push-Location $repositoryPath
try {
    & $hugoExecutable server --bind 127.0.0.1 --port $Port --disableFastRender --baseURL "http://127.0.0.1:$Port/" --destination (Join-Path $repositoryPath '.preview') --renderToDisk
    if ($LASTEXITCODE -ne 0) { throw "Hugo stopped with exit code $LASTEXITCODE." }
}
finally {
    Pop-Location
}
