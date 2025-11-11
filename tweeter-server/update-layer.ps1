# update-layer.ps1
# Copies node_modules into the Lambda layer folder

Write-Host "Updating Lambda layer with latest node_modules..."

# Define paths
$source = "tweeter-server\node_modules"
$destination = "tweeter-server\layer\nodejs\node_modules"

# Ensure the destination folder exists
if (!(Test-Path "tweeter-server\layer\nodejs")) {
    New-Item -ItemType Directory -Path "tweeter-server\layer\nodejs" | Out-Null
    Write-Host "Created tweeter-server\layer\nodejs folder."
}

# Remove the old node_modules inside the layer (if it exists)
if (Test-Path $destination) {
    Remove-Item -Recurse -Force $destination
    Write-Host "Removed old layer node_modules."
}

# Copy the entire node_modules directory into the layer
Copy-Item -Recurse -Force $source "tweeter-server\layer\nodejs\"
Write-Host "Copied tweeter-server\node_modules to tweeter-server\layer\nodejs."

Write-Host "Done! Lambda layer is up to date."
