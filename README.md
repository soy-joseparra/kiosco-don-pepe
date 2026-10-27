# Kiosco Don Pepe — demo de tienda online

Catálogo ficticio y adaptable a celulares y computadoras, hecho con HTML, CSS y JavaScript sin frameworks, bases de datos ni servicios pagos.

## Qué incluye
- Catálogo de productos y precios de ejemplo en pesos argentinos.
- Búsqueda, filtros por categoría y ordenamiento.
- Carrito funcional con cantidades, subtotales y total.
- Botón para preparar un pedido por WhatsApp.
- Diseño adaptable para pantallas chicas y grandes.

## Probar en tu computadora
1. Descargá y descomprimí `kiosco-don-pepe.zip`.
2. Abrí la carpeta `kiosco-don-pepe`.
3. Hacé doble clic en `index.html`. Se abrirá en el navegador.

No necesitás instalar programas.

## Publicar gratis con GitHub Pages
1. Ingresá a https://github.com e iniciá sesión o creá una cuenta.
2. Creá un repositorio nuevo llamado `kiosco-don-pepe`.
3. Elegí **Public** y creá el repositorio.
4. Dentro del repositorio, elegí **Add file → Upload files**.
5. Subí los tres archivos de esta carpeta: `index.html`, `script.js` y `README.md` (también podés subir `.nojekyll`).
6. Confirmá con **Commit changes**.
7. En el repositorio, entrá a **Settings → Pages**.
8. En **Build and deployment**, seleccioná **Deploy from a branch**.
9. Elegí la rama `main` y la carpeta `/ (root)`. Guardá.
10. Esperá unos minutos y volvé a **Settings → Pages**. GitHub mostrará la dirección publicada, normalmente `https://TU-USUARIO.github.io/kiosco-don-pepe/`.

La dirección exacta depende de tu usuario de GitHub; no está publicada todavía.

## Configurar WhatsApp real
Por seguridad, esta demo no envía pedidos a un número real. Para configurarlo:
1. Abrí `script.js`.
2. Buscá la línea `const DEMO_WHATSAPP = "5492640000000";`.
3. Reemplazá el número de ejemplo por el número real del comercio en formato internacional, solo dígitos (sin `+`, espacios ni guiones). Verificá que el dueño del número autorice su uso.
4. Guardá y subí el archivo actualizado al repositorio.

Hasta hacer ese cambio, el botón informa que es una demostración y no abre el pedido.

## Personalizar productos y precios
En `script.js`, editá el arreglo `products`. Cada producto tiene:
- `id`: identificador único.
- `name`: nombre que se muestra.
- `category`: categoría del filtro.
- `price`: precio en pesos argentinos, como número sin puntos ni comas.
- `emoji`: ilustración de muestra.
- `tint`: color de fondo en formato hexadecimal.
- `tag` (opcional): etiqueta promocional.

## Importante
- Productos, marcas y precios son ficticios y sirven solo para presentar la idea.
- El carrito se guarda solo en la memoria de la página; si se recarga, se vacía.
- No hay panel de administración, inventario, pagos, cuentas de clientes ni base de datos.
- GitHub Pages publica archivos estáticos. Para un negocio real, verificá precios, disponibilidad, condiciones de entrega y privacidad antes de lanzarlo.
