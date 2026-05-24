try {
    $url = "https://www.staticforms.xyz"
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing
    $html = $response.Content
    
    Write-Output "--- HTML DEL FORMULARIO DE REGISTRO EN STATICFORMS ---"
    
    # Buscar etiquetas form en el HTML
    if ($html -match '(?s)<form.*?</form>') {
        Write-Output $Matches[0]
    } else {
        Write-Output "No se encontro la etiqueta form mediante Regex."
        # Imprimir las primeras 100 lineas por si acaso
        $html.Split("`n") | Select-Object -First 100
    }
} catch {
    Write-Output "ERROR:"
    Write-Output $_.Exception.Message
}
