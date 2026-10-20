// Genera www/ a partir de src/Patin_Pro.html:
//  - usa three.js LOCAL (www/vendor/three.min.js) en vez del CDN → funciona offline y dentro de la app nativa
//  - transpila y minifica el JS (compatible con Chrome/WebView 61+, Safari/iOS 11+) y minifica el CSS
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { transformSync } from 'esbuild';
let html = readFileSync('src/Patin_Pro.html', 'utf8');
html = html.replace(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/[^"]+"[^>]*><\/script>/, '<script src="vendor/three.min.js"></script>');
if (!html.includes('vendor/three.min.js')) throw new Error('No se encontró la etiqueta de three.js en el HTML de origen');
const target = ['chrome61', 'safari11', 'firefox60'];
html = html.replace(/<script>([\s\S]*?)<\/script>/g, (m, js) => '<script>' + transformSync(js, { minify: true, target, legalComments: 'none' }).code + '</script>');
html = html.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => '<style>' + transformSync(css, { loader: 'css', minify: true, legalComments: 'none' }).code + '</style>');
mkdirSync('www', { recursive: true });
writeFileSync('www/index.html', html);
console.log('www/index.html generado (' + (html.length / 1024).toFixed(0) + ' KB)');
