$url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip"
$dest = "C:\Users\sahil\node.zip"
$extractPath = "C:\Users\sahil\node-bin"

Write-Host "Downloading Node.js..."
Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing

Write-Host "Extracting Node.js..."
Expand-Archive -Path $dest -DestinationPath $extractPath -Force
Remove-Item $dest -Force

Write-Host "Node.js ready!"
