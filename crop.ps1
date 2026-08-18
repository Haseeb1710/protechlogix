Add-Type -AssemblyName System.Drawing

function Crop-Image([string]$src, [string]$dst) {
    $bmp = [System.Drawing.Bitmap]::FromFile($src)
    $minX = $bmp.Width
    $maxX = 0
    $minY = $bmp.Height
    $maxY = 0

    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $p = $bmp.GetPixel($x, $y)
            # Find non-background pixels (background is around RGB 22,22,22)
            if (($p.R -gt 35 -or $p.G -gt 35 -or $p.B -gt 35) -and $p.A -gt 20) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    $pad = 10
    $minX = [Math]::Max(0, $minX - $pad)
    $minY = [Math]::Max(0, $minY - $pad)
    $maxX = [Math]::Min($bmp.Width - 1, $maxX + $pad)
    $maxY = [Math]::Min($bmp.Height - 1, $maxY + $pad)
    $w = $maxX - $minX + 1
    $h = $maxY - $minY + 1

    $rect = New-Object System.Drawing.Rectangle($minX, $minY, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $bmp.Dispose()
    $cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Cropped $src -> $dst ($w x $h)"
}

Crop-Image "C:\Users\DELL\Documents\nexus-services\logo-dark.png" "C:\Users\DELL\Documents\nexus-services\logo-dark-cropped.png"
