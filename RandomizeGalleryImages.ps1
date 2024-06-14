Push-Location .\public\gallery
Get-ChildItem -File | ForEach-Object { `
    $guid = [Guid]::NewGuid().ToString("N"); 
    $_ | Rename-Item -NewName "img_gallery_$guid$($_.Extension)" 
}
Pop-Location
node prebuild.js