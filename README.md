# Caja Digital · sitio estático (sin backend)

HTML + CSS + JavaScript puro. No necesita Python, base de datos ni VPS: funciona en cualquier hosting compartido de Hostinger.

## Estructura
```
index.html          página completa
css/styles.css      estilos
js/config.js        TODO el contenido editable (contacto, precios, clientes, demos)
js/main.js          pestañas, paquetes y enlaces de WhatsApp (no necesitas tocarlo)
favicon.svg         ícono del cubo
robots.txt  sitemap.xml  .htaccess
```

## Antes de publicar (reemplaza los datos de ejemplo)
1. `js/config.js`: `whatsapp` (52 + 10 dígitos, sin + ni espacios), `whatsappVisible`, `correo`, `ubicacion`, `horario`, precios y paquetes.
2. `index.html`: dos lugares con el número de ejemplo `520000000000` (enlace dentro de `<noscript>` y del bloque de contacto) y el correo en el JSON-LD del `<head>`.
3. Dominio: cambia `https://www.cajadigital.mx/` por el real en `index.html` (canonical, og:url, JSON-LD), `sitemap.xml` y `robots.txt`.
4. Cuando tengas clientes reales: pon su logo en `img/clientes/` y escribe la ruta en `logo`; pon `mostrarMarcadorLogo: false`. Si quedan menos de 3 clientes, la sección se oculta sola.
5. Capturas reales: súbelas a `img/capturas/` y escribe la ruta en `imagen` de cada demo (usa .webp, ~1200 px de ancho).

## Subir a Hostinger
1. hPanel → Sitios web → tu dominio → **Administrador de archivos**.
2. Entra a `public_html` y borra el `default.php`/`index.php` de bienvenida si existe.
3. Sube el contenido de esta carpeta (no la carpeta en sí) y activa "mostrar archivos ocultos" para ver `.htaccess`. También puedes subir el .zip y extraerlo ahí.
4. hPanel → Seguridad → **SSL**: activa el certificado gratuito (antes de que el `.htaccess` fuerce HTTPS).
5. Abre tu dominio y prueba: pestañas, botones de WhatsApp y vista en celular.

Para actualizar precios solo vuelve a subir `js/config.js`.
