# Publicar y usar la PWA (GitHub Pages)

La app es una **PWA**: un solo HTML autocontenido (`dist/index.html`) + `manifest.webmanifest` + `sw.js` (service worker) + iconos. Se instala desde Chrome y funciona **sin conexión**. El progreso vive en el `localStorage` del dispositivo (no se sincroniza entre teléfono y laptop: usa «Exportar copia» / «Importar copia» en Ajustes).

## 1. Publicar (una vez)
1. Haz **merge del pull request** de la rama `etapa3-ui` a `main` (Pages publica desde `main`).
2. En GitHub: **Settings → Pages**:
   - **Opción A (la más simple):** *Deploy from a branch* → rama `main`, carpeta **`/ (root)`**. La raíz tiene un `index.html` que redirige a `dist/`; la app queda en `https://jarceojeda.github.io/deutschraum-gym/dist/`.
   - **Opción B (URL limpia):** *Source: GitHub Actions* y luego **Actions → «Publicar PWA» → Run workflow**. La app queda en `https://jarceojeda.github.io/deutschraum-gym/`.
3. Espera 1–2 minutos y abre la URL. (`.nojekyll` evita que Jekyll procese los `.md`, que llevan `{{…}}`.)

## 2. Instalar en el Pixel
1. Abre la URL en **Chrome**.
2. Menú **⋮ → Instalar app** (o, en la app, **Ajustes → Instalar app** si aparece el botón).
3. Abre «Deutsch Gym» desde la pantalla de inicio. Prueba el modo avión: debe abrir y guardar progreso.
4. En **Ajustes → Instalar y sin conexión** debe decir «Sin conexión: lista ✓». Si dice «Almacenamiento protegido ✓», el navegador no debería borrar tu progreso.

## 3. Actualizar
Cada cambio en el repo regenera `dist/` con `npm run build:ui` (o la publicación vuelve a armarla). El service worker tiene una caché por versión (hash del HTML): al abrir con red descarga la nueva y avisa «Hay una versión nueva: se usará al reabrir la app». **El progreso no se toca** al actualizar.

## 4. Comprobar en local
```bash
npm run build:ui                                   # arma dist/
NODE_PATH=$(npm root -g) node tools/check-pwa.js   # Chromium real: service worker, caché, instalable, recarga SIN RED y progreso (con y sin subruta)
```
No se puede probar la instalación sin https: en local solo `localhost` cuenta como seguro.

## 5. Si algo falla
- **No aparece «Instalar»:** hace falta https (Pages lo da), haber abierto la página una vez con red y Chrome reciente. Mientras tanto vale el menú ⋮.
- **Quedó una versión vieja:** cierra todas las pestañas/ventanas de la app y reábrela; o borra los datos del sitio **después de exportar una copia**.
- **Perdí el progreso:** importa la copia (Ajustes → Importar copia). Sin copia no se puede recuperar.
