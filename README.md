# Banco de Bogotá — Banca Móvil (PWA de ficción)

> ⚠️ **AVISO:** Esta aplicación es **100 % ficticia** y fue creada **solo para uso en
> producción audiovisual**. No tiene ninguna relación con Banco de Bogotá S.A.
> Todos los datos (usuario, cuentas, saldos, movimientos) son **simulados**.

PWA instalable que imita la interfaz de una app de banca móvil. Una sola página
(SPA) con 5 pantallas: Login, Home/Dashboard, Movimientos, Transferencias y Perfil.

---

## 1. Generar los íconos

Los íconos `icon-192.png` e `icon-512.png` se crean con un script:

```bash
# Opción A — con Node y el módulo "canvas"
npm install canvas
node setup.js

# Opción B — sin instalar nada
node setup.js          # crea "generate-icons.html"
# luego abre generate-icons.html en el navegador: descarga los 2 PNG
# y guárdalos en esta misma carpeta
```

## 2. Levantar un servidor local

Una PWA necesita servirse por HTTP (no abrir el archivo con `file://`).

```bash
# Con Node
npx serve .

# o con Python
python -m http.server 8080
```

Abre en el computador: `http://localhost:8080` (o el puerto que indique `serve`).

## 3. Abrir desde el celular

1. Conecta el celular a la **misma red Wi-Fi** que el computador.
2. Averigua la IP local del computador:
   - macOS: `ipconfig getifaddr en0`
   - Windows: `ipconfig` (busca "Dirección IPv4")
   - Linux: `hostname -I`
3. En el navegador del celular entra a: `http://TU_IP_LOCAL:8080`
   (ejemplo: `http://192.168.1.20:8080`).

## 4. Instalar como PWA

- **iOS (Safari):** botón Compartir → **Añadir a pantalla de inicio**.
- **Android (Chrome):** menú ⋮ → **Instalar aplicación** / "Añadir a inicio".

Una vez instalada, se abre a pantalla completa, sin barra del navegador, como una
app nativa — ideal para grabar en cámara.

---

## Datos de acceso (demo)

El formulario de login viene **prellenado**; solo pulsa **Ingresar**.

| Campo | Valor |
|-------|-------|
| Documento | C.C. 1.023.456.789 |
| Clave | 123456 |

En la pantalla de transferencia, el **token de 6 dígitos** acepta cualquier número.

---

## 5. Desplegar en Vercel (privado, sin indexar)

La app ya está preparada para subirse a Vercel **oculta a los buscadores**:

- `robots.txt` → `Disallow: /` (bloquea todos los buscadores)
- meta `noindex, nofollow` en `index.html`
- `vercel.json` con header `X-Robots-Tag: noindex` (capa más robusta)

Con esto **no se indexa ni se propaga**: solo entra quien tenga el link directo.

### Pasos (no requiere git)

```bash
npx vercel login      # iniciar sesión
npx vercel --prod     # desplegar
```

Cuando el CLI pregunte:

| Pregunta | Respuesta |
|----------|-----------|
| Set up and deploy? | `Y` |
| Project name | ⚠️ nombre **neutro/aleatorio** (NO "banco-de-bogota"), ej. `prod-bm-2025`. Ese nombre va en la URL. |
| Directory | `./` |
| Build settings | Enter (es estático, sin build) |

### Máxima privacidad (recomendado)

En el panel de Vercel: **Settings → Deployment Protection → Password Protection**.
Los actores entran con link + contraseña. (Función de plan Pro; en el plan gratis
la privacidad real es: URL aleatoria + el `noindex` ya configurado.)

### Advertencias

1. La cuenta de Vercel queda ligada a tu email, pero **no es visible para quien vea
   la URL**. Para separarlo de tu identidad, crea la cuenta con un correo aparte.
2. Un clon de un banco real en una URL pública, aunque sea ficción, **puede ser
   marcado como phishing** y bajado. Por eso: nombre de proyecto neutro, compartir
   el link solo con el elenco y usar protección por contraseña.

---

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | App completa (HTML + CSS + JS en un archivo) |
| `manifest.json` | Configuración PWA (instalable) |
| `sw.js` | Service worker (offline / caché) |
| `setup.js` | Generador de íconos PNG |
| `icon-192.png`, `icon-512.png` | Íconos de la app |
| `vercel.json` | Config de despliegue + bloqueo de indexación |
| `robots.txt` | Bloquea buscadores |

---

*Solo para uso en producción audiovisual — contenido ficticio.*
