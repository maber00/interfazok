/**
 * setup.js — Genera los íconos de la PWA (icon-192.png, icon-512.png)
 * usando el módulo "canvas" de Node.
 *
 * Uso:
 *   npm install canvas
 *   node setup.js
 *
 * Si no quieres instalar "canvas", abre el archivo generate-icons.html
 * (se crea también aquí) en un navegador y descarga los PNG manualmente.
 *
 * Contenido 100% ficticio — uso en producción audiovisual.
 */

const fs = require('fs');
const path = require('path');

// Paleta oficial (Manual de Marca 2022)
const AZUL = '#14327D';
const ROJO = '#CD3232';
const AMARILLO = '#EBB932';
const BLANCO = '#FFFFFF';

/**
 * Dibuja el ícono en un contexto 2D dado (canvas API).
 * size = ancho/alto en px.
 */
function drawIcon(ctx, size) {
  // Fondo azul con esquinas (maskable usa todo el cuadro)
  ctx.fillStyle = AZUL;
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.26;

  // Espiral amarilla: arco grueso
  ctx.lineWidth = size * 0.11;
  ctx.lineCap = 'round';
  ctx.strokeStyle = AMARILLO;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI * 0.15, Math.PI * 1.45, false);
  ctx.stroke();

  // Cola amarilla descendente
  ctx.beginPath();
  ctx.moveTo(cx + r * Math.cos(Math.PI * 1.45), cy + r * Math.sin(Math.PI * 1.45));
  ctx.lineTo(cx - r * 0.2, cy + r * 1.35);
  ctx.stroke();

  // Espiral roja: arco entrelazado (más pequeño, desfasado)
  ctx.strokeStyle = ROJO;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.62, Math.PI * 1.1, Math.PI * 2.4, false);
  ctx.stroke();

  // Cola roja
  ctx.beginPath();
  ctx.moveTo(cx + r * 0.62 * Math.cos(Math.PI * 2.4), cy + r * 0.62 * Math.sin(Math.PI * 2.4));
  ctx.lineTo(cx + r * 0.55, cy - r * 0.95);
  ctx.stroke();
}

function generateWithNodeCanvas() {
  let createCanvas;
  try {
    ({ createCanvas } = require('canvas'));
  } catch (e) {
    return false;
  }

  [192, 512].forEach((size) => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    drawIcon(ctx, size);
    const out = path.join(__dirname, `icon-${size}.png`);
    fs.writeFileSync(out, canvas.toBuffer('image/png'));
    console.log(`✓ Generado ${out}`);
  });
  return true;
}

function writeBrowserFallback() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Generar íconos — Banco de Bogotá</title>
<style>body{font-family:system-ui,sans-serif;background:#F5F5F5;text-align:center;padding:30px}
canvas{margin:10px;background:#14327D;border-radius:20px}
a{display:inline-block;margin:8px;padding:10px 18px;background:#14327D;color:#fff;border-radius:8px;text-decoration:none}</style>
</head>
<body>
<h2>Generador de íconos (ficticio)</h2>
<p>Se descargan automáticamente. Si no, clic derecho → Guardar imagen.</p>
<canvas id="c192" width="192" height="192"></canvas>
<canvas id="c512" width="512" height="512"></canvas>
<div>
<a id="d192" download="icon-192.png">Descargar icon-192.png</a>
<a id="d512" download="icon-512.png">Descargar icon-512.png</a>
</div>
<script>
const AZUL='${AZUL}',ROJO='${ROJO}',AMARILLO='${AMARILLO}';
${drawIcon.toString()}
function build(id,linkId,size){
  const cv=document.getElementById(id);const ctx=cv.getContext('2d');
  drawIcon(ctx,size);
  const url=cv.toDataURL('image/png');
  const a=document.getElementById(linkId);a.href=url;
  // auto descarga
  setTimeout(()=>a.click(),300);
}
build('c192','d192',192);
build('c512','d512',512);
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(__dirname, 'generate-icons.html'), html);
  console.log('✓ Generado generate-icons.html (ábrelo en el navegador para descargar los PNG)');
}

console.log('Banco de Bogotá — generador de íconos (contenido ficticio)\n');
if (generateWithNodeCanvas()) {
  console.log('\nListo. Íconos PNG creados.');
} else {
  console.log('Módulo "canvas" no disponible. Creando alternativa para navegador...');
  writeBrowserFallback();
  console.log('\nAbre generate-icons.html en tu navegador para obtener los PNG.');
}
