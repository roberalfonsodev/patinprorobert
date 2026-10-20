# Patin Pro v4.5 — proyecto listo para PWA y tiendas

```
src/Patin_Pro.html        Código fuente del juego (un solo archivo, legible)
build.mjs                 Genera www/index.html (three.js local + JS transpilado/minificado)
www/                      App web/PWA lista para hospedar (manifest, sw.js, íconos, offline)
resources/                Íconos fuente para @capacitor/assets (icon-only, foreground, background)
capacitor.config.json     Configuración de la app nativa (com.patinpro.game)
scripts/patch-native.mjs  Fija orientación horizontal en Android/iOS
store/                    Ícono Play 512, gráfico de funciones 1024x500, capturas, fichas y política
```

## 1. Probar localmente
```bash
npm install
npm run serve        # http://localhost:8080  (compila y sirve www/)
```
## 2. Publicar como PWA (hosting HTTPS: Netlify, Vercel, GitHub Pages, Firebase…)
Sube el contenido de `www/` (tras `npm run build`). Chrome/Edge/Android ofrecen "Instalar app"; en iPhone/iPad:
Compartir → "Añadir a pantalla de inicio" (el juego muestra un botón de ayuda). Al publicar cambios, sube `VERSION` en `www/sw.js`.

## 3. App nativa (Google Play / App Store) con Capacitor
```bash
npm install
npm run build
npx cap add android      # requiere Android Studio + JDK 21
npx cap add ios          # requiere macOS + Xcode 26 + CocoaPods
npm run assets           # íconos y splash nativos desde resources/
npm run cap:sync         # compila www, sincroniza y fija orientación horizontal
npm run cap:android      # abre Android Studio  → Build > Generate Signed Bundle (AAB)
npm run cap:ios          # abre Xcode           → Product > Archive > Distribute
```
Lee `store/STORE_GUIDE.md` para el paso a paso completo, requisitos vigentes y checklist.
